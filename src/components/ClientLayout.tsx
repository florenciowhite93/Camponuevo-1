"use client";

import { CarritoProvider } from "@/context/CarritoContext";
import { CarritoSidebar } from "@/components/CarritoSidebar";
import Link from "next/link";

const WHATSAPP_NUMBER = "1144096789";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CarritoProvider>
      {children}
      <CarritoSidebar />
      
      {/* WhatsApp Flotante */}
      <Link
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </Link>
    </CarritoProvider>
  );
}
