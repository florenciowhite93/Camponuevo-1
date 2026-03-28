"use client";

import { useState, useEffect } from "react";
import { cn, createSlug } from "@/lib/utils";
import type { Producto, Especie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface ProductCardProps {
  producto: Producto;
  className?: string;
  showAddToCart?: boolean;
}

const especieIconos: Record<Especie, string> = {
  bovino: "/svg/Bovino.svg",
  ovino: "/svg/Ovino.svg",
  equino: "/svg/Equino.svg",
  porcino: "/svg/Porcino.svg",
  canino: "/svg/Canino.svg",
  felino: "/svg/Felino.svg",
};

interface Etiqueta {
  id: string;
  nombre: string;
  color: string;
}

export function ProductCard({ producto, className, showAddToCart = true }: ProductCardProps) {
  const { addItem } = useCarrito();
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);

  const productoSlug = `${createSlug(producto.titulo)}`;

  useEffect(() => {
    if (producto.etiquetas_ids && producto.etiquetas_ids.length > 0) {
      supabase
        .from("etiquetas")
        .select("*")
        .in("id", producto.etiquetas_ids)
        .then(({ data }) => {
          if (data) setEtiquetas(data);
        });
    }
  }, [producto.etiquetas_ids]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(producto);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden transition-all duration-300 group flex flex-col h-full",
        "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/catalogo/${productoSlug}`} className="block relative h-56 overflow-hidden bg-white border-b border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300">
        {/* Etiquetas en borde superior izquierdo */}
        {etiquetas.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-20 max-w-[70%]">
            {etiquetas.slice(0, 3).map((etq) => (
              <span
                key={etq.id}
                className="px-2 py-1 rounded-md text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: etq.color }}
              >
                {etq.nombre}
              </span>
            ))}
          </div>
        )}

        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={producto.titulo}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fas fa-image text-4xl text-gray-300"></i>
          </div>
        )}
        
        {/* Species icons at bottom left */}
        {producto.especies && producto.especies.length > 0 && (
          <div className="absolute bottom-2 right-2 flex flex-wrap gap-1 z-10">
            {producto.especies.slice(0, 3).map((esp) => (
              <div
                key={esp}
                className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center"
                title={esp}
              >
                <Image 
                  src={especieIconos[esp]} 
                  alt={esp} 
                  width={20} 
                  height={20}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        {producto.laboratorio_nombre && (
          <span className="inline-block px-2 py-0.5 bg-[#0a92cf]/10 border border-[#0a92cf] text-[#0a92cf] text-xs font-medium rounded-full mb-2 w-fit">
            {producto.laboratorio_nombre}
          </span>
        )}
        
        <Link href={`/catalogo/${productoSlug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 hover:text-[#2d5a27] transition">
            {producto.titulo}
          </h3>
        </Link>

        {producto.descripcion && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {producto.descripcion}
          </p>
        )}
        
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            {producto.volumen && (
              <span className="text-xs text-gray-400 block mb-0.5">{producto.volumen}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-gray-900">
                {producto.precio > 0 ? formatPrice(producto.precio) : <span className="text-sm font-semibold text-amber-600">Consultar</span>}
              </span>
              {producto.precio > 0 && <span className="text-xs text-gray-400">+ IVA</span>}
            </div>
          </div>
          {showAddToCart ? (
            <button
              onClick={handleAddToCart}
              className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white w-10 h-10 rounded-xl flex items-center justify-center transition shadow-sm flex-shrink-0"
              title="Añadir al carrito"
            >
              <i className="fas fa-cart-plus text-sm"></i>
            </button>
          ) : (
            <Link 
              href={`/catalogo/${productoSlug}`}
              className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-5 py-2 rounded-full transition text-sm font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Ver más
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}