"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function RecuperaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/cuenta/cambiar-contrasena`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Ocurrió un error. Intentalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2d5a27] mb-8 transition"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="text-green-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Email enviado</h1>
              <p className="text-gray-600 mb-6">
                Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un email con las instrucciones para restablecer tu contraseña.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Revisá tu bandeja de entrada (y spam).
              </p>
              <Link
                href="/login"
                className="text-[#2d5a27] font-medium hover:underline"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2d5a27] flex items-center justify-center">
                  <Mail className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h1>
                <p className="text-gray-600 mt-2">
                  Ingresá tu email y te enviaremos las instrucciones
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    "Enviar instrucciones"
                  )}
                </button>
              </form>

              <p className="text-center mt-6 text-gray-600">
                ¿Recordaste tu contraseña?{" "}
                <Link href="/login" className="text-[#2d5a27] font-medium hover:underline">
                  Iniciá sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
