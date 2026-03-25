import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("secciones_landing")
    .select("*")
    .order("orden", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { tipo, titulo } = body;

  const defaultConfigs: Record<string, any> = {
    hero: {
      titulo: "Productos Naturales para tu Bienestar",
      subtitulo: "Encuentra todo lo que necesitas para el cuidado de tus animales",
      cta_texto: "Ver Catálogo",
      cta_url: "/catalogo",
      imagen_fondo: "",
    },
    categorias: {
      titulo: titulo || "Nuestras Categorías",
      descripcion: "Explora nuestra selección de productos",
      categorias: [],
    },
    productos: {
      titulo: titulo || "Productos Destacados",
      descripcion: "Los más elegidos por nuestros clientes",
      subcategorias_ids: [],
      max_productos: 8,
    },
    testimonios: {
      titulo: titulo || "Lo que dicen nuestros clientes",
      testimonios: [],
    },
    newsletter: {
      titulo: titulo || "Suscríbete a nuestro newsletter",
      descripcion: "Recibe ofertas exclusivas y novedades",
    },
  };

  const { data: maxOrden } = await supabase
    .from("secciones_landing")
    .select("orden")
    .order("orden", { ascending: false })
    .limit(1)
    .single();

  const newOrden = (maxOrden?.orden || 0) + 1;

  const { data, error } = await supabase
    .from("secciones_landing")
    .insert({
      tipo,
      titulo: titulo || tipo,
      activa: true,
      orden: newOrden,
      config: defaultConfigs[tipo] || {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
