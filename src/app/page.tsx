"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import type { Producto, Categoria } from "@/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Banner {
  titulo: string;
  subtitulo: string;
  imagen_url: string;
  texto_boton: string;
  enlace_boton: string;
}

export default function HomePage() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productosMes, setProductosMes] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bannerRes, categoriasRes, productosMesRes] = await Promise.all([
        supabase.from("banner_home").select("*").eq("activa", true).order("orden").limit(1).single(),
        supabase.from("categorias").select("*").eq("visible_home", true).order("orden"),
        supabase.from("productos_mes").select("*, productos(*)").order("orden"),
      ]);

      if (bannerRes.data) setBanner(bannerRes.data);
      if (categoriasRes.data) setCategorias(categoriasRes.data);
      if (productosMesRes.data) {
        const productos = productosMesRes.data
          .map((p: any) => p.productos)
          .filter(Boolean) as Producto[];
        setProductosMes(productos);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header cartCount={0} />

      <main className="flex-1 pt-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5a27]"></div>
          </div>
        ) : (
          <>
            {/* Banner */}
            {banner && (
              <section className="relative h-[70vh] min-h-[500px]">
                <img
                  src={banner.imagen_url}
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                      {banner.titulo}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                      {banner.subtitulo}
                    </p>
                    <Link
                      href={banner.enlace_boton}
                      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105"
                    >
                      {banner.texto_boton}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Categorías */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <span className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2 block">
                    Explorá
                  </span>
                  <h2 className="text-4xl font-extrabold text-gray-900">
                    Nuestras Categorías
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  {categorias.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogo?categoria=${cat.id}`}
                      className="group bg-white border-2 border-gray-100 rounded-2xl p-8 text-center min-w-[260px] max-w-[300px] hover:border-green-500 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        {cat.icono_svg ? (
                          <div
                            className="w-10 h-10 text-green-700"
                            dangerouslySetInnerHTML={{ __html: cat.icono_svg }}
                          />
                        ) : (
                          <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                        {cat.nombre}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">Explorar</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Productos del Mes */}
            {productosMes.length > 0 && (
              <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <span className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2 block">
                      Destacados
                    </span>
                    <h2 className="text-4xl font-extrabold text-gray-900">
                      Productos del Mes
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productosMes.map((producto) => (
                      <ProductCard key={producto.id} producto={producto} />
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <Link
                      href="/catalogo"
                      className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green-600 text-green-700 font-bold rounded-full hover:bg-green-600 hover:text-white transition"
                    >
                      Ver Todo el Catálogo
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
