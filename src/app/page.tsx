"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import type { Producto, Categoria } from "@/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function HomePage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [categoriasTitulo, setCategoriasTitulo] = useState("Nuestras Categorías");
  const [productosTitulo, setProductosTitulo] = useState("Catálogo Productos Destacados");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [seccionesRes, categoriasRes] = await Promise.all([
        supabase.from("secciones_landing").select("*").in("tipo", ["categorias", "productos"]),
        supabase.from("categorias").select("*").order("orden"),
      ]);

      if (categoriasRes.data) {
        setCategorias(categoriasRes.data);
      }

      if (seccionesRes.data) {
        seccionesRes.data.forEach((seccion) => {
          const cfg = seccion.config as any;
          if (seccion.tipo === "categorias") {
            if (cfg?.titulo) setCategoriasTitulo(cfg.titulo);
            if (cfg?.categorias_ids && cfg.categorias_ids.length > 0) {
              const catsSeleccionadas = categoriasRes.data?.filter((c) =>
                cfg.categorias_ids.includes(c.id)
              );
              if (catsSeleccionadas) setCategorias(catsSeleccionadas);
            }
          }
          if (seccion.tipo === "productos") {
            if (cfg?.titulo) setProductosTitulo(cfg.titulo);
            if (cfg?.subcategorias_ids && cfg.subcategorias_ids.length > 0) {
              fetchProductosPorSubcategoria(cfg.subcategorias_ids);
            } else {
              fetchProductosTodos();
            }
          }
        });
      } else {
        fetchProductosTodos();
      }
    } catch (error) {
      console.error("Error loading data:", error);
      fetchProductosTodos();
    } finally {
      setLoading(false);
    }
  };

  const fetchProductosTodos = async () => {
    try {
      const { data } = await supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`)
        .eq("visible", true)
        .limit(8);
      if (data) {
        setProductosDestacados(data.map((p: any) => ({ ...p, laboratorio_nombre: p.laboratorio?.nombre })));
      }
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const fetchProductosPorSubcategoria = async (subcategoriaIds: string[]) => {
    try {
      const { data } = await supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`)
        .eq("visible", true)
        .contains("subcategorias_ids", subcategoriaIds)
        .limit(8);

      if (data) {
        setProductosDestacados(
          data.map((p: any) => ({ ...p, laboratorio_nombre: p.laboratorio?.nombre }))
        );
      }
    } catch (error) {
      console.error("Error fetching productos:", error);
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
              <motion.span 
                className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold mb-6 tracking-wider uppercase"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Lo mejor para tu campo
              </motion.span>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                Productos <span className="text-gradient">Naturales</span>
                <br />para tu Bienestar
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100 font-light drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Descubre nuestra selección de productos ecológicos y orgánicos, cuidadosamente seleccionados para garantizar la máxima calidad agrícola y veterinaria.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  href="/catalogo"
                  className="inline-flex items-center bg-gradient-to-r from-[#4caf50] to-[#8bc34a] hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Ver Catálogo
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold tracking-widest text-[#4caf50] uppercase mb-2 block">Explora</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{categoriasTitulo}</h2>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categorias.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-8 text-center min-w-[280px] max-w-[320px] hover:shadow-xl hover:border-[#4caf50] transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform overflow-hidden">
                    {cat.icono_svg ? (
                      <img
                        src={cat.icono_svg}
                        alt={cat.nombre}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <i className="fas fa-leaf text-[#2d5a27] text-4xl group-hover:rotate-12 transition-transform"></i>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{cat.nombre}</h3>
                  <p className="text-gray-500 text-sm">Ver productos</p>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-end mb-14 border-b border-gray-200 pb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <span className="text-sm font-bold tracking-widest text-[#4caf50] uppercase mb-2 block">Catálogo</span>
                <h2 className="text-4xl font-extrabold text-gray-900">{productosTitulo}</h2>
              </div>
              <Link
                href="/catalogo"
                className="mt-4 md:mt-0 px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-2 font-bold text-[#2d5a27] hover:text-[#4caf50]"
              >
                Ver Todos
                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition"></i>
              </Link>
            </motion.div>

            {loading ? (
              <motion.div 
                className="flex justify-center items-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-circle-notch fa-spin text-4xl text-[#2d5a27]"></i>
              </motion.div>
            ) : productosDestacados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {productosDestacados.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <ProductCard producto={producto} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16 text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <i className="fas fa-box-open text-5xl mb-4 text-gray-300"></i>
                <p>No hay productos disponibles</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
