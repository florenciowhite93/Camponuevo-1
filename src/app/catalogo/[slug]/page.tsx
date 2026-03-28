import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import { createSlug } from "@/lib/utils";
import { ProductContent } from "@/components/ProductContent";
import type { Producto } from "@/types";

const supabase = createClient();

interface Etiqueta {
  id: string;
  nombre: string;
  color: string;
}

interface Subcategoria {
  id: string;
  nombre: string;
  categoria_id: string;
}

function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

async function getProductoBySlug(slug: string) {
  if (isUUID(slug)) {
    const { data } = await supabase
      .from("productos")
      .select(`*, laboratorio:laboratorios(nombre)`)
      .eq("id", slug)
      .eq("visible", true)
      .single();

    if (data) {
      return { producto: data, isLegacyId: true };
    }
    return null;
  }

  const { data: productos } = await supabase
    .from("productos")
    .select(`*, laboratorio:laboratorios(nombre)`)
    .eq("visible", true)
    .limit(500);

  if (!productos) return null;

  for (const producto of productos) {
    const productoSlug = createSlug(producto.titulo);
    if (productoSlug === slug || `${productoSlug}-a` === slug || `${productoSlug}-b` === slug) {
      return { producto, isLegacyId: false };
    }
  }
  return null;
}

async function getEtiquetas(producto: Producto): Promise<Etiqueta[]> {
  if (!producto.etiquetas_ids || producto.etiquetas_ids.length === 0) return [];

  const { data } = await supabase
    .from("etiquetas")
    .select("*")
    .in("id", producto.etiquetas_ids);

  return data || [];
}

async function getSubcategorias(producto: Producto): Promise<Subcategoria[]> {
  if (!producto.subcategorias_ids || producto.subcategorias_ids.length === 0) return [];

  const { data } = await supabase
    .from("subcategorias")
    .select("*")
    .in("id", producto.subcategorias_ids);

  return data || [];
}

async function getProductosRelacionados(producto: Producto) {
  const { data } = await supabase
    .from("productos")
    .select(`*, laboratorio:laboratorios(nombre)`)
    .eq("visible", true)
    .neq("id", producto.id)
    .limit(4);

  if (!data) return [];

  return data.map((p: any) => ({
    ...p,
    laboratorio_nombre: p.laboratorio?.nombre,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductoBySlug(slug);

  if (!result) {
    return {
      title: "Producto no encontrado | Camponuevo",
    };
  }

  const producto = result.producto;

  return {
    title: `${producto.titulo} | Camponuevo`,
    description: producto.descripcion?.slice(0, 160) || `Producto ${producto.titulo}`,
    openGraph: {
      title: producto.titulo,
      description: producto.descripcion?.slice(0, 160) || "",
      images: producto.imagen ? [{ url: producto.imagen }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: producto.titulo,
      description: producto.descripcion?.slice(0, 160) || "",
      images: producto.imagen ? [producto.imagen] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProductoBySlug(slug);

  if (!result) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <i className="fas fa-box-open text-5xl text-gray-300 mb-4"></i>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h1>
            <Link href="/catalogo" className="text-[#2d5a27] hover:underline">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { producto, isLegacyId } = result;

  if (isLegacyId) {
    const newSlug = `${createSlug(producto.titulo)}`;
    redirect(`/catalogo/${newSlug}`);
  }

  const etiquetas = await getEtiquetas(producto);
  const subcategorias = await getSubcategorias(producto);
  const productosRelacionados = await getProductosRelacionados(producto);

  const productoData: Producto = {
    ...producto,
    laboratorio_nombre: producto.laboratorio?.nombre,
  };

  return (
    <ProductContent
      producto={productoData}
      etiquetas={etiquetas}
      subcategorias={subcategorias}
      productosRelacionados={productosRelacionados}
    />
  );
}
