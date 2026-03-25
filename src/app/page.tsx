"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import type { Producto, Categoria } from "@/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const categorias: Categoria[] = [
  { id: "1", nombre: "Veterinaria", icono_svg: "", orden: 1 },
  { id: "2", nombre: "Bovinos", icono_svg: "", orden: 2 },
  { id: "3", nombre: "Ovinos", icono_svg: "", orden: 3 },
  { id: "4", nombre: "Equinos", icono_svg: "", orden: 4 },
];

export default function HomePage() {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductosDestacados();
  }, []);

  const fetchProductosDestacados = async () => {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`)
        .eq("visible", true)
        .limit(8);

      if (data) {
        const productos = data.map((p: any) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setProductosDestacados(productos);
      }
    } catch (error) {
      console.error("Error fetching productos destacados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header cartCount={0} />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section
          className="relative py-32 text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15, 30, 15, 0.85), rgba(45, 90, 39, 0.75)), url('https://images.unsplash.com/photo-1603350514202-7091b5b1c2d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold mb-6 tracking-wider uppercase">
                Lo mejor para tu campo
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                Productos <span className="text-gradient">Naturales</span>
                <br />para tu Bienestar
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100 font-light drop-shadow-md">
                Descubre nuestra selección de productos ecológicos y orgánicos, cuidadosamente seleccionados para garantizar la máxima calidad agrícola y veterinaria.
              </p>

              <Link
                href="/catalogo"
                className="inline-flex items-center bg-gradient-to-r from-[#4caf50] to-[#8bc34a] hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Ver Catálogo
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-widest text-[#4caf50] uppercase mb-2 block">Explora</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nuestras Categorías</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {categorias.map((cat, index) => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-8 text-center min-w-[280px] max-w-[320px] hover:shadow-xl hover:border-[#4caf50] transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <i className="fas fa-leaf text-[#2d5a27] text-4xl group-hover:rotate-12 transition-transform"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{cat.nombre}</h3>
                  <p className="text-gray-500 text-sm">Ver productos</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 border-b border-gray-200 pb-6">
              <div>
                <span className="text-sm font-bold tracking-widest text-[#4caf50] uppercase mb-2 block">Catálogo</span>
                <h2 className="text-4xl font-extrabold text-gray-900">Productos Destacados</h2>
              </div>
              <Link
                href="/catalogo"
                className="mt-4 md:mt-0 px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-2 font-bold text-[#2d5a27] hover:text-[#4caf50]"
              >
                Ver Todos
                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition"></i>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <i className="fas fa-circle-notch fa-spin text-4xl text-[#2d5a27]"></i>
              </div>
            ) : productosDestacados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {productosDestacados.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <i className="fas fa-box-open text-5xl mb-4 text-gray-300"></i>
                <p>No hay productos disponibles</p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-widest text-[#4caf50] uppercase mb-2 block">Testimoniales</span>
              <h2 className="text-4xl font-extrabold text-gray-900">Lo que dicen en el campo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Esteban González",
                  role: "Productor Ganadero",
                  text: "Los productos de veterinaria son de excelente calidad. Mis animales han mejorado mucho su salud general.",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
                },
                {
                  name: "María Rodriguez",
                  role: "Administradora de Estancia",
                  text: "La atención al cliente es increíble. Me explicaron al detalle la dosis exacta que necesitaba.",
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
                },
                {
                  name: "Martín Pinal",
                  role: "Caballos y Pasturas",
                  text: "Compro todas mis semillas y suplementos equinos en su plataforma. Siempre envían rápido.",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 p-10 rounded-3xl relative hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <i className="fas fa-quote-right absolute top-8 right-8 text-6xl text-gray-100 opacity-50"></i>
                  <div className="relative z-10">
                    <div className="flex text-yellow-400 mb-6 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#2d5a27]"
                      />
                      <div className="ml-4">
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <span className="text-sm text-gray-500">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#2d5a27] via-[#1b5e20] to-[#2d5a27]">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <i className="fas fa-envelope-open-text text-5xl text-[#8bc34a] mb-6"></i>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Únete al Boletín del Campo</h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
              Recibe ofertas exclusivas, información sobre productos veterinarios y las últimas novedades.
            </p>

            <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 relative shadow-2xl p-2 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-full border border-white/20">
              <div className="flex-grow flex items-center relative">
                <i className="fas fa-envelope absolute left-6 text-gray-400"></i>
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full pl-14 pr-6 py-4 rounded-xl md:rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8bc34a] bg-white/95 font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#4caf50] to-[#8bc34a] hover:from-green-500 hover:to-green-400 text-white font-bold px-10 py-4 rounded-xl md:rounded-full transition shadow-lg whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
