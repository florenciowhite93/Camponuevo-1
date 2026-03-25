"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCarrito } from "@/context/CarritoContext";
import { Minus, Plus, Trash2, Check, ArrowLeft, Lock, MapPin, Building2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sendEmailSafe, ADMIN_EMAIL } from "@/lib/email-actions";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmationEmail";
import { AdminNewOrderEmail } from "@/emails/AdminNewOrderEmail";

const supabase = createClient();

interface Direccion {
  id: string;
  nombre: string | null;
  provincia: string | null;
  ciudad: string | null;
  direccion: string | null;
  codigo_postal: string | null;
  es_predeterminada: boolean;
}

export default function CheckoutPage() {
  const { items, updateCantidad, removeItem, totalPrecio, totalIva, totalConIva, clearCart } = useCarrito();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<Direccion[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [envioOption, setEnvioOption] = useState<"envio" | "retiro">("envio");
  const [guardarDireccion, setGuardarDireccion] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        
        const [perfilResult, addressesResult] = await Promise.all([
          supabase
            .from('perfiles')
            .select('nombre, telefono')
            .eq('id', user.id)
            .single(),
          supabase
            .from('direcciones')
            .select('*')
            .eq('usuario_id', user.id)
            .order('es_predeterminada', { ascending: false })
            .order('created_at', { ascending: false })
        ]);
        
        const perfil = perfilResult.data;
        const userAddresses = addressesResult.data || [];
        
        setAddresses(userAddresses);
        
        if (userAddresses.length > 0) {
          const predeterminada = userAddresses.find(a => a.es_predeterminada) || userAddresses[0];
          setSelectedAddressId(predeterminada.id);
        } else if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0].id);
        }
        
        setFormData(prev => ({
          ...prev,
          email: user.email || prev.email,
          nombre: perfil?.nombre || prev.nombre,
          telefono: perfil?.telefono || prev.telefono,
        }));
      }
    };
    getUser();
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    codigoPostal: "",
    notas: "",
  });

  useEffect(() => {
    if (selectedAddressId) {
      const address = addresses.find(a => a.id === selectedAddressId);
      if (address) {
        setFormData(prev => ({
          ...prev,
          provincia: address.provincia || "",
          ciudad: address.ciudad || "",
          direccion: address.direccion || "",
          codigoPostal: address.codigo_postal || "",
        }));
      }
    }
  }, [selectedAddressId, addresses]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    setShowNewAddressForm(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

      const productos = items.map((item) => ({
        id: item.producto.id,
        titulo: item.producto.titulo,
        cantidad: item.cantidad,
        precio: item.producto.precio,
        imagen: item.producto.imagen,
      }));

      let direccionGuardadaId: string | null = null;

      if (envioOption === "envio" && guardarDireccion && currentUser && !selectedAddressId) {
        const { data: newAddress, error: addressError } = await supabase
          .from('direcciones')
          .insert({
            usuario_id: currentUser.id,
            provincia: formData.provincia,
            ciudad: formData.ciudad,
            direccion: formData.direccion,
            codigo_postal: formData.codigoPostal,
            es_predeterminada: addresses.length === 0,
          })
          .select()
          .single();

        if (!addressError && newAddress) {
          direccionGuardadaId = newAddress.id;
          setAddresses(prev => [newAddress, ...prev]);
          setSelectedAddressId(newAddress.id);
        }
      }

      const { error: insertError } = await supabase.from('pedidos').insert({
        order_id: orderId,
        usuario_id: currentUser?.id || null,
        cliente_nombre: formData.nombre,
        cliente_email: formData.email,
        cliente_telefono: formData.telefono,
        provincia: envioOption === "retiro" ? "CABA" : formData.provincia,
        ciudad: envioOption === "retiro" ? "CABA" : formData.ciudad,
        direccion: envioOption === "retiro" ? "Paraguay 754" : formData.direccion,
        codigo_postal: envioOption === "retiro" ? "C1061" : formData.codigoPostal,
        notas: `${formData.notas}\n\n${envioOption === "retiro" ? "🚚 RETIRO EN LOCAL: Paraguay 754, CABA" : "🚛 ENVÍO A DOMICILIO"}`.trim(),
        productos,
        total: totalConIva,
        estado: 'pendiente',
      });

      if (insertError) {
        console.error('Error al guardar pedido:', insertError);
        alert("Error al guardar el pedido. Por favor intenta nuevamente.");
        setIsSubmitting(false);
        return;
      }

      if (currentUser) {
        await supabase.from('perfiles').upsert({
          id: currentUser.id,
          nombre: formData.nombre,
          telefono: formData.telefono,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });
      }

      const emailPromises: Promise<void>[] = [];

      emailPromises.push(
        sendEmailSafe({
          to: formData.email,
          subject: `Pedido #${orderId} - Confirmación Camponuevo`,
          react: OrderConfirmationEmail({
            orderId,
            clienteNombre: formData.nombre,
            clienteEmail: formData.email,
            items: productos,
            total: totalConIva,
            datosEnvio: {
              provincia: envioOption === "retiro" ? "CABA" : formData.provincia,
              ciudad: envioOption === "retiro" ? "CABA" : formData.ciudad,
              direccion: envioOption === "retiro" ? "Paraguay 754, CABA" : formData.direccion,
              telefono: formData.telefono,
            },
          }),
        }).then(() => {})
      );

      emailPromises.push(
        sendEmailSafe({
          to: ADMIN_EMAIL,
          subject: `Nuevo Pedido #${orderId} de ${formData.nombre}`,
          react: AdminNewOrderEmail({
            orderId,
            clienteNombre: formData.nombre,
            clienteEmail: formData.email,
            clienteTelefono: formData.telefono,
            items: productos,
            total: totalConIva,
            datosEnvio: {
              provincia: envioOption === "retiro" ? "CABA" : formData.provincia,
              ciudad: envioOption === "retiro" ? "CABA" : formData.ciudad,
              direccion: envioOption === "retiro" ? "Paraguay 754, CABA" : formData.direccion,
              codigoPostal: envioOption === "retiro" ? "C1061" : formData.codigoPostal,
            },
            notas: envioOption === "retiro" ? "Retiro en local" : formData.notas,
          }),
        }).then(() => {})
      );

      await Promise.allSettled(emailPromises);

      setOrderId(orderId);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error('Error en checkout:', err);
      alert("Error al procesar el pedido. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateAddressForm = () => {
    return formData.provincia && formData.ciudad && formData.direccion;
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 bg-gray-50 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-4xl text-gray-300"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-500 mb-6">Agregá productos para poder finalizar tu compra</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"
            >
              <ArrowLeft size={18} />
              Ver Catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 bg-gray-50 flex items-center justify-center min-h-screen">
          <div className="max-w-lg mx-auto text-center p-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pedido Confirmado!</h1>
            <p className="text-gray-600 mb-2">
              Tu pedido <strong>{orderId}</strong> ha sido recibido correctamente.
            </p>
            <p className="text-gray-500 mb-8">
              {envioOption === "retiro"
                ? "Te avisaremos cuando tu pedido esté listo para retirar en nuestro local."
                : "Te enviamos un email con los detalles de tu compra. Nos comunicaremos a la brevedad para coordinar el envío."}
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock size={16} />
                <span>Pago seguro garantizado</span>
              </div>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Continuar Comprando
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-1 pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/catalogo"
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
              <p className="text-gray-500">{items.length} productos en tu carrito</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#2d5a27] text-white flex items-center justify-center text-sm">1</span>
                    Información de Contacto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#2d5a27] text-white flex items-center justify-center text-sm">2</span>
                    Forma de Envío
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setEnvioOption("envio")}
                      className={`p-4 rounded-xl border-2 transition text-left ${
                        envioOption === "envio"
                          ? "border-[#2d5a27] bg-[#f1f8e9]"
                          : "border-gray-200 hover:border-[#4caf50]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          envioOption === "envio" ? "bg-[#2d5a27] text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="font-semibold">Envío a domicilio</p>
                          <p className="text-sm text-gray-500">Recibí tu pedido en tu dirección</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setEnvioOption("retiro")}
                      className={`p-4 rounded-xl border-2 transition text-left ${
                        envioOption === "retiro"
                          ? "border-[#2d5a27] bg-[#f1f8e9]"
                          : "border-gray-200 hover:border-[#4caf50]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          envioOption === "retiro" ? "bg-[#2d5a27] text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="font-semibold">Retiro en local</p>
                          <p className="text-sm text-gray-500">Paraguay 754, CABA</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#2d5a27] text-white flex items-center justify-center text-sm">3</span>
                    {envioOption === "envio" ? "Datos de Envío" : "Datos de Retiro"}
                  </h2>

                  {envioOption === "envio" ? (
                    <>
                      {addresses.length > 0 && !showNewAddressForm && (
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Tus direcciones guardadas
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {addresses.map((addr) => (
                              <button
                                key={addr.id}
                                type="button"
                                onClick={() => handleAddressSelect(addr.id)}
                                className={`p-4 rounded-xl border-2 text-left transition ${
                                  selectedAddressId === addr.id
                                    ? "border-[#2d5a27] bg-[#f1f8e9]"
                                    : "border-gray-200 hover:border-[#4caf50]"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{addr.direccion || "Sin dirección"}</p>
                                    <p className="text-xs text-gray-500 capitalize">
                                      {addr.ciudad || ""} {addr.provincia?.replace(/_/g, ' ') || ""}
                                    </p>
                                  </div>
                                  {addr.es_predeterminada && (
                                    <span className="text-xs bg-[#2d5a27] text-white px-2 py-0.5 rounded-full">Principal</span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewAddressForm(true);
                              setSelectedAddressId(null);
                              setFormData(prev => ({ ...prev, provincia: "", ciudad: "", direccion: "", codigoPostal: "" }));
                            }}
                            className="text-[#2d5a27] hover:text-[#1b5e20] text-sm font-medium flex items-center gap-1"
                          >
                            <i className="fas fa-plus"></i>
                            Agregar nueva dirección
                          </button>
                        </div>
                      )}

                      {(showNewAddressForm || addresses.length === 0) && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">
                              {showNewAddressForm ? "Nueva Dirección" : "Ingresá tu dirección"}
                            </h3>
                            {addresses.length > 0 && showNewAddressForm && (
                              <button
                                type="button"
                                onClick={() => {
                                  setShowNewAddressForm(false);
                                  if (addresses.length > 0) {
                                    setSelectedAddressId(addresses[0].id);
                                  }
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Provincia *
                              </label>
                              <select
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                              >
                                <option value="">Seleccionar...</option>
                                <option value="buenos_aires">Buenos Aires</option>
                                <option value="cordoba">Córdoba</option>
                                <option value="santa_fe">Santa Fe</option>
                                <option value="mendoza">Mendoza</option>
                                <option value="tucuman">Tucumán</option>
                                <option value="entre_rios">Entre Ríos</option>
                                <option value="corrientes">Corrientes</option>
                                <option value="misiones">Misiones</option>
                                <option value="chaco">Chaco</option>
                                <option value="formosa">Formosa</option>
                                <option value="santiago">Santiago del Estero</option>
                                <option value="salta">Salta</option>
                                <option value="jujuy">Jujuy</option>
                                <option value="catamarca">Catamarca</option>
                                <option value="la_rioja">La Rioja</option>
                                <option value="san_luis">San Luis</option>
                                <option value="san_juan">San Juan</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad *
                              </label>
                              <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                                placeholder="Ciudad"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dirección *
                              </label>
                              <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                                placeholder="Calle, número, piso, departamento"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código Postal
                              </label>
                              <input
                                type="text"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                                placeholder="Ej: B1603"
                              />
                            </div>
                          </div>

                          {currentUser && !selectedAddressId && (
                            <div className="mt-4 flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="guardarDireccion"
                                checked={guardarDireccion}
                                onChange={(e) => setGuardarDireccion(e.target.checked)}
                                className="w-4 h-4 text-[#2d5a27] border-gray-300 rounded focus:ring-[#2d5a27]"
                              />
                              <label htmlFor="guardarDireccion" className="text-sm text-gray-600">
                                Guardar esta dirección para futuras compras
                              </label>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-[#f1f8e9] rounded-xl p-6 border border-[#4caf50]">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#2d5a27] text-white flex items-center justify-center flex-shrink-0">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900 mb-1">Retiro en nuestro local</p>
                          <p className="text-gray-700 font-medium">Paraguay 754, CABA</p>
                          <p className="text-gray-500 text-sm mt-2">
                            Te avisaremos cuando tu pedido esté listo para retirar. 
                            Horario de atención: Lun a Vie de 9 a 18hs.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#2d5a27] text-white flex items-center justify-center text-sm">4</span>
                    Notas del Pedido
                  </h2>
                  <textarea
                    name="notas"
                    rows={3}
                    value={formData.notas}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none"
                    placeholder={envioOption === "retiro" 
                      ? "Indicaciones para el retiro, horarios preferidos, etc."
                      : "Indicaciones especiales para el envío, horarios de entrega preferidos, etc."
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (envioOption === "envio" && !validateAddressForm())}
                  className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white py-4 rounded-xl font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Confirmar Pedido
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Al confirmar, aceptás nuestros{" "}
                  <a href="#" className="text-[#2d5a27] hover:underline">
                    Términos y Condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-[#2d5a27] hover:underline">
                    Política de Privacidad
                  </a>
                </p>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                <h2 className="text-lg font-bold mb-4">Resumen del Pedido</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.producto.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        {item.producto.imagen ? (
                          <Image
                            src={item.producto.imagen}
                            alt={item.producto.titulo}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-image text-gray-300"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.producto.titulo}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateCantidad(item.producto.id, item.cantidad - 1)}
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.cantidad}</span>
                          <button
                            onClick={() => updateCantidad(item.producto.id, item.cantidad + 1)}
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#2d5a27] text-sm">
                          {item.producto.precio > 0
                            ? formatPrice(item.producto.precio * item.cantidad)
                            : "-"}
                        </p>
                        <button
                          onClick={() => removeItem(item.producto.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition mt-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrecio)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (21%)</span>
                    <span className="font-medium">{formatPrice(totalIva)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-[#4caf50] font-medium">
                      {envioOption === "retiro" ? "Gratis" : "A coordinar"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-[#2d5a27]">{formatPrice(totalConIva)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
