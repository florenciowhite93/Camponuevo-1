"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCarrito } from "@/context/CarritoContext";
import { ShoppingCart, ChevronDown, ExternalLink, Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Producto } from "@/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const WHATSAPP_NUMBER = "1144096789";

const especieIcons: Record<string, string> = {
  bovino: "fa-cow",
  ovino: "fa-sheep",
  porcino: "fa-pig",
  equino: "fa-horse",
  felino: "fa-cat",
  canino: "fa-dog",
};

const especieLabels: Record<string, string> = {
  bovino: "Bovino",
  ovino: "Ovino",
  porcino: "Porcino",
  equino: "Equino",
  felino: "Felino",
  canino: "Canino",
};

export default function ProductPage() {
  const params = useParams();
  const { addItem } = useCarrito();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [productosRelacionados, setProductosRelacionados] = useState<Producto[]>([]);
  const [cantidad, setCantidad] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [etiquetas, setEtiquetas] = useState<{id: string, nombre: string, color: string}[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchProducto(params.id as string);
    }
  }, [params.id]);

  const fetchProducto = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`)
        .eq("id", id)
        .single();

      if (data) {
        const productoData = {
          ...data,
          laboratorio_nombre: data.laboratorio?.nombre,
        };
        setProducto(productoData);

        // Fetch etiquetas
        if (data.etiquetas_ids && data.etiquetas_ids.length > 0) {
          const { data: etiquetasData } = await supabase
            .from("etiquetas")
            .select("*")
            .in("id", data.etiquetas_ids);
          if (etiquetasData) setEtiquetas(etiquetasData);
        }
        
        // Fetch relacionados (mismo laboratorio o mismas especies)
        const { data: relacionados } = await supabase
          .from("productos")
          .select(`*, laboratorio:laboratorios(nombre)`)
          .eq("visible", true)
          .neq("id", id)
          .limit(4);
        
        if (relacionados) {
          setProductosRelacionados(relacionados.map((p: any) => ({
            ...p,
            laboratorio_nombre: p.laboratorio?.nombre,
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching producto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (producto) {
      addItem(producto, cantidad);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const getWhatsAppLink = () => {
    if (!producto) return "#";
    const message = encodeURIComponent(
      `Hola! Me interesa el producto: ${producto.titulo} (${producto.volumen || ""}) - ${formatPrice(producto.precio)}`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <i className="fas fa-circle-notch fa-spin text-5xl text-[#2d5a27]"></i>
            <p className="mt-4 text-gray-500">Cargando producto...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!producto) {
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

  return (
    <>
      <Header />

      <main className="flex-1 pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-8 flex items-center">
            <Link href="/" className="hover:text-[#2d5a27] transition">Inicio</Link>
            <i className="fas fa-chevron-right text-xs mx-2 text-gray-400"></i>
            <Link href="/catalogo" className="hover:text-[#2d5a27] transition">Catálogo</Link>
            <i className="fas fa-chevron-right text-xs mx-2 text-gray-400"></i>
            <span className="text-gray-700 font-medium truncate max-w-xs">{producto.titulo}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative bg-white flex items-center justify-center min-h-[400px] lg:min-h-[500px] border-b lg:border-b-0 lg:border-r border-gray-200">
                {producto.imagen ? (
                  <Image
                    src={producto.imagen}
                    alt={producto.titulo}
                    width={600}
                    height={500}
                    className="max-w-[120%] w-[120%] h-auto object-contain"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-image text-6xl text-gray-300"></i>
                  </div>
                )}

                {producto.especies && producto.especies.length > 0 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {producto.especies.map((esp) => (
                      <div
                        key={esp}
                        className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center"
                        title={especieLabels[esp]}
                      >
                        <i className={cn("fas", especieIcons[esp], "text-xl text-[#2d5a27]")}></i>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                {producto.laboratorio_nombre && (
                  <span className="inline-block px-3 py-1 bg-[#f1f8e9] text-[#4caf50] text-sm font-medium rounded-full mb-4 w-fit">
                    {producto.laboratorio_nombre}
                  </span>
                )}

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {producto.titulo}
                </h1>

                {/* Etiquetas junto al título */}
                {etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {etiquetas.map((etq) => (
                      <span
                        key={etq.id}
                        className="px-3 py-1 rounded-md text-sm font-semibold text-white"
                        style={{ backgroundColor: etq.color }}
                      >
                        {etq.nombre}
                      </span>
                    ))}
                  </div>
                )}

                {producto.volumen && (
                  <p className="text-lg text-gray-500 mb-4">{producto.volumen}</p>
                )}

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {producto.precio > 0 ? formatPrice(producto.precio) : "Consultar"}
                  </span>
                  {producto.precio > 0 && <span className="text-lg text-gray-400">+ IVA</span>}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-gray-600">Cantidad:</span>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1 border border-gray-200">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold">{cantidad}</span>
                    <button
                      onClick={() => setCantidad(cantidad + 1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 py-4 px-8 rounded-xl font-bold transition flex items-center justify-center shadow-md",
                      addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-[#2d5a27] hover:bg-[#1b5e20] text-white"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={20} className="mr-2" />
                        ¡Agregado!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} className="mr-2" />
                        Agregar al Pedido
                      </>
                    )}
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 px-8 rounded-xl font-bold transition flex items-center justify-center shadow-md bg-green-500 hover:bg-green-600 text-white"
                  >
                    <i className="fab fa-whatsapp text-xl mr-2"></i>
                    Consultar
                  </a>
                  {producto.link_externo && (
                    <a
                      href={producto.link_externo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center flex-shrink-0"
                      title="Más información del laboratorio"
                    >
                      <ExternalLink size={20} className="text-gray-600" />
                    </a>
                  )}
                </div>

                {producto.descripcion && (
                  <div className="mb-8">
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                        <i className="fas fa-align-left mr-2 text-[#2d5a27]"></i>
                        Descripción
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {producto.descripcion}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                      <i className="fas fa-list-alt mr-2 text-[#2d5a27]"></i>
                      Especificaciones Técnicas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {producto.volumen && (
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#f1f8e9] rounded-lg flex items-center justify-center flex-shrink-0">
                              <i className="fas fa-ruler text-[#2d5a27]"></i>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 uppercase tracking-wide">Volumen / Peso</div>
                              <div className="font-semibold text-gray-800">{producto.volumen}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {producto.especies && producto.especies.length > 0 && (
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#f1f8e9] rounded-lg flex items-center justify-center flex-shrink-0">
                              <i className="fas fa-paw text-[#2d5a27]"></i>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 uppercase tracking-wide">Especies</div>
                              <div className="font-semibold text-gray-800 capitalize">
                                {producto.especies.map((e) => especieLabels[e] || e).join(", ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(producto.dosis || producto.drogas) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition border-b border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">Información Adicional</h3>
                <ChevronDown
                  size={20}
                  className={cn(
                    "text-gray-400 transition-transform duration-300",
                    isDetailsOpen && "rotate-180"
                  )}
                />
              </button>

              {isDetailsOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {producto.dosis && (
                    <div className="md:border-r md:border-gray-200 md:pr-6">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-syringe mr-2 text-[#2d5a27]"></i>
                        Dosis y Administración
                      </h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {producto.dosis}
                      </p>
                    </div>
                  )}
                  {producto.drogas && (
                    <div className="md:pl-2">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-flask mr-2 text-[#2d5a27]"></i>
                        Principios Activos
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        {producto.drogas.split(";").map((drug, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <i className="fas fa-circle text-xs text-[#4caf50] mt-2"></i>
                            <span>{drug.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {productosRelacionados.length > 0 && (
            <section className="mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b">
                Productos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productosRelacionados.map((prod) => (
                  <ProductCard key={prod.id} producto={prod} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
