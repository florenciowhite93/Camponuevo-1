"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Send, Check, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    const confirmed = searchParams.get("confirmed");
    const type = searchParams.get("type");
    
    if (confirmed === "true" || (type === "signup" && !searchParams.get("token"))) {
      setEmailConfirmed(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setEmailNotConfirmed(false);
    setEmailConfirmed(false);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message === "Email not confirmed") {
          setEmailNotConfirmed(true);
          setError("");
        } else {
          setError(authError.message);
        }
      } else if (data.user) {
        router.push("/cuenta");
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendingEmail(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (resendError) {
        setError(resendError.message);
      } else {
        setEmailResent(true);
        setEmailNotConfirmed(false);
      }
    } catch (err: any) {
      setError(err.message || "Error al reenviar el email");
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2d5a27] mb-8 transition"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2d5a27] flex items-center justify-center">
              <Lock className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
            <p className="text-gray-600 mt-2">Accedé a tu cuenta para gestionar tus pedidos</p>
          </div>

          {emailConfirmed && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 p-5 rounded-2xl mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">¡Email confirmado correctamente!</p>
                  <p className="text-sm mb-4">Ya podés iniciar sesión con tus credenciales.</p>
                  <button
                    onClick={() => setEmailConfirmed(false)}
                    className="text-sm text-green-700 hover:text-green-800 underline"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {emailNotConfirmed && (
            <div className="bg-blue-50 border-2 border-blue-200 text-blue-800 p-5 rounded-2xl mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">Verificá tu email</p>
                  <p className="text-sm mb-4">Te enviamos un enlace de verificación a <strong>{email}</strong>. Revisá tu bandeja de entrada y spam.</p>
                  <button
                    onClick={handleResendConfirmation}
                    disabled={resendingEmail}
                    className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-2.5 px-5 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {resendingEmail ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Reenviar email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {emailResent && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 p-5 rounded-2xl mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">¡Email reenviado!</p>
                  <p className="text-sm">Revisá tu bandeja de entrada y spam.</p>
                </div>
              </div>
            </div>
          )}

          {error && !emailNotConfirmed && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailNotConfirmed(false);
                    setEmailResent(false);
                    setEmailConfirmed(false);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setEmailNotConfirmed(false);
                    setEmailResent(false);
                    setEmailConfirmed(false);
                  }}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27]"
                />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <Link
                href="/recupera"
                className="text-sm text-[#2d5a27] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            ¿No tenés cuenta?{" "}
            <Link href="/registro" className="text-[#2d5a27] font-medium hover:underline">
              Creá una cuenta
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1595825852509-38257008cfce?w=800&q=80')",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#2d5a27]/90 to-[#1b5e20]/90 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">Bienvenido de vuelta</h2>
            <p className="text-lg text-white/90">
              Accedé a tu cuenta para ver tus pedidos, gestionar tu perfil y acceder a ofertas exclusivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-[#2d5a27]"></i>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
