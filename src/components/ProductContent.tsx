"use client";

import React, { useState } from "react";
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

function ReglaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 243 193" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.7743 99.156L57.2993 141.635M100.186 60.2358L124.711 102.714M167.589 21.3208L192.114 63.7993M133.892 40.7759L149.517 67.8392M66.4803 79.6958L82.1053 106.759M5.00098 115.191L195.856 5.00092L237.676 77.4353L46.821 187.625L5.00098 115.191Z" stroke="#2d5a27" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EspecieIcon() {
  return (
    <Image src="/svg/especie.svg" alt="Especies" width={20} height={20} className="object-contain" />
  );
}

const especieIcons: Record<string, string> = {
  bovino: "/svg/Bovino.svg",
  ovino: "/svg/Ovino.svg",
  porcino: "/svg/Porcino.svg",
  equino: "/svg/Equino.svg",
  felino: "/svg/Felino.svg",
  canino: "/svg/Canino.svg",
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

interface Subcategoria {
  id: string;
  nombre: string;
  categoria_id: string;
}

interface ProductContentProps {
  producto: Producto;
  etiquetas: Etiqueta[];
  subcategorias: Subcategoria[];
  productosRelacionados: Producto[];
}

export function ProductContent({ producto, etiquetas, subcategorias, productosRelacionados }: ProductContentProps) {
  const { addItem } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 });
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
              <div 
                className="lg:w-1/2 img-panel relative min-h-[400px] lg:min-h-[500px] border-b lg:border-b-0 lg:border-r border-gray-200 group overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {producto.imagen ? (
                  <Image
                    src={producto.imagen}
                    alt={producto.titulo}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                    style={{
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <i className="fas fa-image text-6xl text-gray-300"></i>
                  </div>
                )}

                {producto.especies && producto.especies.length > 0 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                    {producto.especies.slice(0, 3).map((esp) => (
                      <div
                        key={esp}
                        className="w-12 h-12 bg-white p-3 rounded-full shadow-md flex items-center justify-center"
                        title={especieLabels[esp]}
                      >
                        <Image 
                          src={especieIcons[esp]} 
                          alt={especieLabels[esp]} 
                          width={24} 
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                {producto.laboratorio_nombre && (
                  <span className="inline-block px-3 py-1 bg-[#0a92cf]/10 border border-[#0a92cf] text-[#0a92cf] text-sm font-medium rounded-full mb-3 w-fit">
                    {producto.laboratorio_nombre}
                  </span>
                )}

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  {producto.titulo}
                </h1>

                {etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
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

                {subcategorias.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {subcategorias.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        {sub.nombre}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-6">
                  {producto.precio > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">{formatPrice(producto.precio)}</span>
                      <span className="text-lg text-gray-400">+ IVA</span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-amber-600">Consultar</span>
                  )}
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
                          <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                            <ReglaIcon />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Volumen / Peso / Cantidad</div>
                            <div className="font-semibold text-gray-800">{producto.volumen}</div>
                          </div>
                        </div>
                      )}
                      {producto.especies && producto.especies.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 spec-pill">
                          <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                            <EspecieIcon />
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

          {(producto.indicaciones || producto.dosis || producto.drogas) && (
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

              {isDetailsOpen && (() => {
                const fields: { key: string; content: React.ReactNode }[] = [];
                if (producto.indicaciones) fields.push({ key: 'ind', content: (
                  <div key="ind">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                      <i className="fas fa-clipboard-list mr-2 text-[#2d5a27]"></i>
                      Indicaciones
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{producto.indicaciones}</p>
                  </div>
                )});
                if (producto.drogas) fields.push({ key: 'dro', content: (
                  <div key="dro">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                      <i className="fas fa-flask mr-2 text-[#2d5a27]"></i>
                      Composición
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
                )});
                if (producto.dosis) fields.push({ key: 'dos', content: (
                  <div key="dos">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                      <i className="fas fa-syringe mr-2 text-[#2d5a27]"></i>
                      Dosis y Administración
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{producto.dosis}</p>
                  </div>
                )});
                const cols = fields.length === 2 ? 'md:grid-cols-2' : fields.length === 3 ? 'md:grid-cols-3' : 'grid-cols-1';
                return (
                  <div className="p-6 grid grid-cols-1 gap-6">
                    <div className={cn("grid grid-cols-1 gap-6", cols)}>
                      {fields.map((f, idx) => (
                        <div key={f.key} className={cn(
                          idx > 0 && "md:border-l md:border-gray-200 md:pl-6",
                          idx === 1 && fields.length === 3 && "lg:border-l lg:border-gray-200 lg:pl-6"
                        )}>
                          {f.content}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
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
