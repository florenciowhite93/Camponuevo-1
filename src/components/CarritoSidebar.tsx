"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export function CarritoSidebar() {
  const { items, isOpen, closeCart, removeItem, updateCantidad, totalPrecio, totalIva, totalConIva, clearCart } = useCarrito();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#2d5a27]" size={24} />
            <h2 className="text-xl font-bold">Carrito de Compras</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length > 0 ? (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.producto.id} className="p-4 flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    {item.producto.imagen ? (
                      <Image
                        src={item.producto.imagen}
                        alt={item.producto.titulo}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-image text-gray-300 text-xl"></i>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {item.producto.titulo}
                    </h3>
                    {item.producto.laboratorio_nombre && (
                      <p className="text-xs text-[#4caf50] mb-2">
                        {item.producto.laboratorio_nombre}
                      </p>
                    )}
                    <p className="font-bold text-[#2d5a27]">
                      {item.producto.precio > 0
                        ? formatPrice(item.producto.precio)
                        : "Consultar"}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.producto.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                      <button
                        onClick={() =>
                          updateCantidad(item.producto.id, item.cantidad - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-medium text-sm">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          updateCantidad(item.producto.id, item.cantidad + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                Agregá productos para comenzar tu compra
              </p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Ver Catálogo
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            {/* Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({items.length} productos)</span>
                <span className="font-semibold">{formatPrice(totalPrecio)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IVA (21%)</span>
                <span className="font-semibold">{formatPrice(totalIva)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-[#4caf50] font-medium">A calcular</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-[#2d5a27]">
                  {formatPrice(totalConIva)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white py-4 rounded-xl font-bold text-center transition"
              >
                Finalizar Compra
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-gray-500 hover:text-red-500 py-2 text-sm font-medium transition"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
