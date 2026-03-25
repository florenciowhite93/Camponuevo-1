"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1b5e20] text-white pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
                <svg viewBox="0 0 82.99 82.99" className="w-full h-full">
                  <defs>
                    <style>
                      {`.cls-footer-1 { fill: #ffffff; } .cls-footer-2 { fill: #ffffff; }`}
                    </style>
                  </defs>
                  <g>
                    <path className="cls-footer-1" d="M82.99,41.49c0,3.01-.32,5.95-.93,8.77-8.39-13.6-23.44-22.69-40.56-22.69S9.32,36.66.93,50.27c-.61-2.83-.93-5.76-.93-8.78C0,18.58,18.58,0,41.5,0s41.49,18.58,41.49,41.49Z"/>
                    <path className="cls-footer-2" d="M80.49,55.64c-5.77,15.96-21.05,27.35-38.99,27.35S8.28,71.59,2.49,55.65c7.18-14.27,21.97-24.08,39.01-24.08s31.81,9.81,38.99,24.07Z"/>
                  </g>
                </svg>
              </div>
              <span className="text-2xl font-bold uppercase">Camponuevo</span>
            </div>
            <p className="text-gray-300 mb-6">
              Tu tienda agropecuaria de confianza para productos naturales, veterinarios y agrícolas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Menú Principal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-300 hover:text-white transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/nosotros#contacto" 
                  onClick={(e) => {
                    if (window.location.pathname === '/nosotros') {
                      e.preventDefault();
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-300 hover:text-white transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/catalogo?categoria=antiparasitarios" className="text-gray-300 hover:text-white transition">
                  Antiparasitarios
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=antibioticos" className="text-gray-300 hover:text-white transition">
                  Antibióticos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=vitaminas" className="text-gray-300 hover:text-white transition">
                  Vitaminas y Minerales
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=antiinflamatorios" className="text-gray-300 hover:text-white transition">
                  Antiinflamatorios
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=curabicheras" className="text-gray-300 hover:text-white transition">
                  Curabicheras
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span className="text-gray-300">Paraguay 754, Capital Federal</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone"></i>
                <span className="text-gray-300">4311-0768</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fab fa-whatsapp"></i>
                <span className="text-gray-300">11 4409-6789</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Camponuevo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
