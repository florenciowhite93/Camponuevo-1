"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function NosotrosPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    alert("¡Gracias por contactarnos! Tu mensaje fue enviado con éxito. En breve nos comunicaremos contigo.");
  };

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
      {/* Hero About */}
      <section className="relative py-12 overflow-hidden bg-[#2d5a27]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1595825852509-38257008cfce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Campo" 
            fill
            className="object-cover opacity-20 grayscale blur-sm"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Nuestra Raíz en el Campo</h1>
          <p className="text-green-100 text-lg max-w-3xl">En Camponuevo no solo vendemos productos, fomentamos el crecimiento y la sanidad del sector agropecuario mediante soluciones integrales y expertas.</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-24 pt-20">
        
        {/* Fila 1: Nosotros + Imagen de Ganadería unidos */}
        <div id="nosotros" className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contenido Nosotros */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl text-[#2d5a27] shadow-inner flex-shrink-0">
                  <i className="fas fa-leaf"></i>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 ml-6">Sobre Nosotros</h2>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fundada con el firme propósito de ser el puente entre los mejores laboratorios veterinarios y el productor del campo, <strong>Camponuevo</strong> se ha posicionado como un líder confiable en la provisión de insumos agropecuarios a nivel nacional.
              </p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sabemos que el bienestar animal y la eficiencia agrícola son los pilares fundamentales de toda explotación exitosa. Por eso, nuestro catálogo es curado minuciosamente por expertos en veterinaria y agronomía para garantizar la potencia y seguridad de cada insumo.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-auto">
                <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50 text-center">
                  <h3 className="text-4xl font-black text-[#2d5a27] mb-1">+35</h3>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Años</p>
                </div>
                <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50 text-center">
                  <h3 className="text-4xl font-black text-[#4caf50] mb-1">+5k</h3>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Clientes</p>
                </div>
              </div>
            </div>

            {/* Imagen de Ganadería */}
            <div className="relative overflow-hidden min-h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Ganadería" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Compromiso con la Calidad</h3>
                  <p className="text-sm opacity-90">Productos seleccionados para el bienestar de tu campo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fila 2: Mapa + Formulario de Contacto unidos */}
        <div id="contacto" className="scroll-mt-30 bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contenido Ubicación */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 shadow-inner flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 ml-6">Ubicación</h2>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visítanos en nuestras oficinas ubicadas en el corazón de la ciudad. Estamos disponibles para atender todas tus consultas y necesidades.
              </p>
              
              {/* Dirección destacada y Mapa unidos */}
              <div className="flex-grow flex flex-col">
                <div className="bg-[#2d5a27] text-white rounded-t-2xl p-6 flex items-center gap-4 border-b-0">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-pin text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Dirección</h3>
                    <p className="text-green-100">Paraguay 754, Capital Federal</p>
                  </div>
                </div>

                <div className="rounded-b-2xl overflow-hidden flex-grow bg-gray-100 min-h-[200px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.876501617093!2d-58.38643968477675!3d-34.60373898041392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac8b7ce5f87%3A0xde772901d5f46c7a!2sParaguay%20754%2C%20C1015%20CABA!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full min-h-[250px]"
                  />
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl text-[#2d5a27] shadow-inner flex-shrink-0">
                  <i className="fas fa-envelope-open-text"></i>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 ml-6">Contáctanos</h2>
              </div>
              
              <p className="text-gray-500 mb-8">¿Tenes dudas sobre un producto o necesitas asesoramiento?</p>
              <p className="text-gray-500 mb-8">Envíanos un mensaje.</p>
              
              {submitted ? (
                <div className="bg-[#f1f8e9] border border-[#4caf50] rounded-2xl p-8 text-center">
                  <i className="fas fa-check-circle text-5xl text-[#4caf50] mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600">Nos pondremos en contacto contigo a la brevedad.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#2d5a27] font-medium hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Juan Pérez" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="juan@ejemplo.com" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                      placeholder="Consulta sobre productos" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                    <textarea 
                      rows={4} 
                      required 
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Escribe tu consulta aquí..." 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2d5a27] to-[#1b5e20] hover:from-[#1b5e20] hover:to-black text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><i className="fas fa-spinner fa-spin mr-2"></i> Enviando...</>
                    ) : (
                      <><i className="fas fa-paper-plane mr-2"></i> Enviar Mensaje</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#2d5a27] flex items-center justify-center text-xl mr-4"><i className="fas fa-map-marker-alt"></i></div>
            <div>
              <h4 className="font-bold text-gray-800">Ubicación</h4>
              <p className="text-sm text-gray-500">Paraguay 754, Capital Federal</p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#4caf50] flex items-center justify-center text-xl mr-4"><i className="fas fa-phone-alt"></i></div>
            <div>
              <h4 className="font-bold text-gray-800">Teléfono</h4>
              <p className="text-sm text-gray-500">4311-0768</p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#8bc34a] flex items-center justify-center text-xl mr-4"><i className="fas fa-clock"></i></div>
            <div>
              <h4 className="font-bold text-gray-800">Horario</h4>
              <p className="text-sm text-gray-500">Lun - Vie, 09:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1b5e20] text-white pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fas fa-seedling text-[#2d5a27] text-xl"></i>
                </div>
                <span className="ml-2 text-2xl font-bold">Camponuevo</span>
              </div>
              <p className="text-gray-400 mb-6 font-light">Tu tienda agropecuaria de confianza para productos naturales, veterinarios y agrícolas.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Menú Principal</h3>
              <ul className="space-y-3 font-light text-gray-300">
                <li><Link href="/" className="hover:text-[#8bc34a] transition flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Inicio</Link></li>
                <li><Link href="/catalogo" className="hover:text-[#8bc34a] transition flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Catálogo</Link></li>
                <li><Link href="/nosotros" className="hover:text-[#8bc34a] transition flex items-center text-[#8bc34a]"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Nosotros</Link></li>
                <li><Link href="/nosotros#contacto" className="hover:text-[#8bc34a] transition flex items-center text-[#8bc34a]"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Camponuevo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}