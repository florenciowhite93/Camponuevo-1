"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registroSchema } from "@/lib/schemas";

const supabase = createClient();

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Debés aceptar los términos y condiciones");
      return;
    }

    const result = registroSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
            telefono: formData.telefono,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data.session) {
        router.push("/cuenta");
      } else if (data.user) {
        setSuccessMessage("¡Cuenta creada correctamente! Ya podés iniciar sesión.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Error al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "Al menos 8 caracteres" },
    { met: /[A-Z]/.test(formData.password), text: "Una mayúscula" },
    { met: /[a-z]/.test(formData.password), text: "Una minúscula" },
    { met: /[0-9]/.test(formData.password), text: "Un número" },
  ];

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80')",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#2d5a27]/90 to-[#1b5e20]/90 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">Únete a Camponuevo</h2>
            <p className="text-lg text-white/90">
              Creá tu cuenta para acceder a mejores precios, seguimiento de pedidos y ofertas exclusivas.
            </p>
          </div>
        </div>
      </div>

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
            <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
            <p className="text-gray-600 mt-2">Completá tus datos para registrarte</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 flex items-center gap-3">
              <i className="fas fa-check-circle"></i>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico *
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {passwordRequirements.map((req, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      req.met
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {req.met ? <Check size={12} /> : <Lock size={12} />}
                    {req.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Acepto los{" "}
                <a href="#" className="text-[#2d5a27] hover:underline">
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-[#2d5a27] hover:underline">
                  Política de Privacidad
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-[#2d5a27] font-medium hover:underline">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
