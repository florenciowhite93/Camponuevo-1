"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShoppingCart, ChevronDown, ExternalLink, Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Producto } from "@/types";

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

interface Etiqueta {
  id: string;
  nombre: string;
  color: string;
}

interface ProductContentProps {
  producto: Producto;
  etiquetas: Etiqueta[];
  productosRelacionados: Producto[];
}

export function ProductContent({ producto, etiquetas, productosRelacionados }: ProductContentProps) {
  const { addItem } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(producto, cantidad);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hola! Me interesa el producto: ${producto.titulo} (${producto.volumen || ""}) - ${formatPrice(producto.precio)}`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <>
      <Header />

      <main className="flex-1 pt-20 bg-gray-50">
        <style jsx>{`
          .img-panel {
            background: #ffffff;
            position: relative;
            overflow: hidden;
          }
          .img-panel::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
            background-size: 24px 24px;
            opacity: 0.3;
            pointer-events: none;
          }
          .spec-pill {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            flex: 1;
            padding: 16px 20px;
            border-radius: 16px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
            min-width: 160px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            transition: all 0.2s ease;
          }
          .spec-pill:hover {
            box-shadow: 0 4px 16px rgba(45, 90, 39, 0.12);
            border-color: #c8d9cc;
            transform: translateY(-2px);
          }
        `}</style>

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
              <div className="lg:w-1/2 img-panel flex items-center justify-center relative min-h-[400px] lg:min-h-[500px] border-b lg:border-b-0 lg:border-r border-gray-200">
                {producto.imagen ? (
                  <Image
                    src={producto.imagen}
                    alt={producto.titulo}
                    width={600}
                    height={500}
                    className="relative z-10 max-w-[120%] w-[120%] h-auto object-contain"
                    style={{ marginLeft: "-10%", transformOrigin: "center center" }}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <i className="fas fa-image text-6xl text-gray-300"></i>
                  </div>
                )}

                {producto.especies && producto.especies.length > 0 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-[#f1f8e9] text-[#2d5a27] text-sm font-medium rounded-full">
                      {producto.laboratorio_nombre}
                    </span>
                  </div>
                )}

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {producto.titulo}
                </h1>

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

                <div className="text-3xl font-bold text-gray-900 mb-4">
                  {producto.precio > 0 ? formatPrice(producto.precio) : "Consultar"}
                  {producto.precio > 0 && <span className="text-lg text-gray-400 ml-1">+ IVA</span>}
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
                      "flex-1 py-4 px-8 rounded-xl font-bold transition flex items-center justify-center shadow-md shadow-green-900/20",
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
                    className="flex-1 py-4 px-8 rounded-xl font-bold transition flex items-center justify-center shadow-md shadow-green-900/20 bg-green-500 hover:bg-green-600 text-white"
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
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                      <i className="fas fa-list-alt mr-2 text-[#2d5a27]"></i>
                      Especificaciones Técnicas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {producto.volumen && (
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 spec-pill">
                          <div className="w-10 h-10 bg-[#2d5a27] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-ruler text-[#2d5a27]"></i>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Volumen / Peso / Cantidad</div>
                            <div className="font-semibold text-gray-800">{producto.volumen}</div>
                          </div>
                        </div>
                      )}
                      {producto.especies && producto.especies.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 spec-pill">
                          <div className="w-10 h-10 bg-[#2d5a27] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-paw text-[#2d5a27]"></i>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Especies</div>
                            <div className="font-semibold text-gray-800 capitalize">
                              {producto.especies.map((e) => especieLabels[e] || e).join(", ")}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
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
