"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, Check, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function ReenviarVerificacionPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (resendError) {
        setError(resendError.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Error al reenviar el email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2d5a27] mb-8 transition"
        >
          <ArrowLeft size={18} />
          Volver al login
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2d5a27] flex items-center justify-center">
              <Mail className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reenviar email de verificación</h1>
            <p className="text-gray-600 mt-2">
              Ingresá tu email para recibir nuevamente el enlace de verificación
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <Check className="text-green-600 text-xl mt-0.5" />
                <div>
                  <p className="font-medium">¡Email enviado!</p>
                  <p className="text-sm">Revisá tu bandeja de entrada y spam. El enlace expira en 24 horas.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleResend} className="space-y-6">
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setSuccess(false);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Enviando...
                </>
              ) : success ? (
                <>
                  <Check size={18} />
                  Email enviado
                </>
              ) : (
                <>
                  <Send size={18} />
                  Reenviar email
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>¿No recibiste el email?</p>
            <p>Revisá tu carpeta de spam o correo no deseado.</p>
          </div>

          <div className="mt-6 pt-6 border-t text-center">
            <Link
              href="/registro"
              className="text-[#2d5a27] font-medium hover:underline"
            >
              Crear una nueva cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
