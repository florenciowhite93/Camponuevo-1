"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User, Package, MapPin, Lock, ChevronRight, X, Save, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const supabase = createClient();

const estadoColors = {
  pendiente: "bg-yellow-100 text-yellow-800",
  confirmado: "bg-blue-100 text-blue-800",
  enviado: "bg-purple-100 text-purple-800",
  entregado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
};

const estadoLabels = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

type Tab = "perfil" | "pedidos" | "direcciones";

interface Pedido {
  id: string;
  order_id?: string;
  created_at: string;
  total: number;
  estado: string;
  productos: any[];
  cliente_nombre: string;
  cliente_email: string;
  cliente_telefono: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  codigo_postal: string;
  notas: string;
}

interface Perfil {
  id: string;
  email: string;
  nombre: string | null;
  telefono: string | null;
}

function CuentaContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("perfil");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });
  const [showPasswords, setShowPasswords] = useState({ actual: false, nueva: false, confirmar: false });
  const [profileForm, setProfileForm] = useState({
    nombre: "",
    telefono: "",
  });

  const [newAddress, setNewAddress] = useState({ 
    provincia: "", 
    ciudad: "", 
    direccion: "", 
    codigoPostal: "" 
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'pedidos' || tabParam === 'direcciones') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await Promise.all([
          fetchPerfil(user.id),
          fetchPedidos(user.id),
          fetchAddresses(user.id),
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("direcciones")
        .select("*")
        .eq("usuario_id", userId)
        .order("es_predeterminada", { ascending: false })
        .order("created_at", { ascending: false });

      if (data) {
        setAddresses(data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const fetchPerfil = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        setPerfil(data);
        setProfileForm({
          nombre: data.nombre || "",
          telefono: data.telefono || "",
        });
      }
    } catch (error) {
      console.error("Error fetching perfil:", error);
    }
  };

  const fetchPedidos = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("pedidos")
        .select("*")
        .eq("usuario_id", userId)
        .order("created_at", { ascending: false });

      if (data) {
        setPedidos(data);
      }
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("perfiles")
        .update({
          nombre: profileForm.nombre,
          telefono: profileForm.telefono,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      await fetchPerfil(user.id);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.nueva !== passwords.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (passwords.nueva.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.nueva,
      });
      if (error) throw error;
      alert("Contraseña actualizada correctamente");
      setShowPasswordModal(false);
      setPasswords({ actual: "", nueva: "", confirmar: "" });
    } catch (error: any) {
      alert(error.message || "Error al cambiar contraseña");
    }
  };

  const handleOpenPedidoModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setShowPedidoModal(true);
  };

  const handleAddAddress = async () => {
    if (!user || !newAddress.direccion.trim() || !newAddress.ciudad.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from("direcciones")
        .insert({
          usuario_id: user.id,
          provincia: newAddress.provincia,
          ciudad: newAddress.ciudad,
          direccion: newAddress.direccion,
          codigo_postal: newAddress.codigoPostal,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setAddresses([data, ...addresses]);
        setNewAddress({ provincia: "", ciudad: "", direccion: "", codigoPostal: "" });
        setShowAddressForm(false);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Error al guardar la dirección");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("¿Eliminar esta dirección?")) return;
    
    try {
      const { error } = await supabase
        .from("direcciones")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAddresses(addresses.filter(a => a.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error al eliminar la dirección");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-center h-64">
              <i className="fas fa-spinner fa-spin text-4xl text-[#2d5a27]"></i>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto text-center bg-white rounded-2xl p-8 shadow-sm">
              <i className="fas fa-user-lock text-5xl text-gray-300 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h2>
              <p className="text-gray-600 mb-6">Iniciá sesión para ver tu cuenta</p>
              <Link
                href="/login"
                className="inline-block bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Iniciar Sesión
              </Link>
            </div>
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
              <p className="text-gray-600 mt-1">Gestiona tu perfil y pedidos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                {[
                  { id: "perfil" as Tab, label: "Perfil", icon: User },
                  { id: "pedidos" as Tab, label: "Pedidos", icon: Package },
                  { id: "direcciones" as Tab, label: "Direcciones", icon: MapPin },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 py-4 px-6 font-medium transition flex items-center justify-center gap-2",
                      activeTab === tab.id
                        ? "text-[#2d5a27] border-b-2 border-[#2d5a27]"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === "perfil" && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-2xl font-bold">
                        {(perfil?.nombre || perfil?.email || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {perfil?.nombre || "Completá tu perfil"}
                        </h2>
                        <p className="text-gray-500">{perfil?.email}</p>
                      </div>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            value={profileForm.nombre}
                            onChange={(e) => setProfileForm({ ...profileForm, nombre: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={perfil?.email || ""}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={profileForm.telefono}
                            onChange={(e) => setProfileForm({ ...profileForm, telefono: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                            placeholder="Tu teléfono"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button
                          type="submit"
                          disabled={saving}
                          className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 px-8 rounded-xl transition flex items-center gap-2 disabled:opacity-50"
                        >
                          {saving ? (
                            <><i className="fas fa-spinner fa-spin"></i> Guardando...</>
                          ) : (
                            <><Save size={18} /> Guardar cambios</>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPasswordModal(true)}
                          className="flex items-center gap-2 text-[#2d5a27] font-medium py-3 px-6 border-2 border-[#2d5a27] rounded-xl hover:bg-[#f1f8e9] transition"
                        >
                          <Lock size={16} />
                          Cambiar contraseña
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "pedidos" && (
                  <div className="space-y-4">
                    {pedidos.length > 0 ? (
                      pedidos.map((pedido) => (
                        <div
                          key={pedido.id}
                          onClick={() => handleOpenPedidoModal(pedido)}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Package className="text-gray-600" size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{pedido.order_id || pedido.id.slice(0, 8).toUpperCase()}</p>
                                <p className="text-sm text-gray-500">{formatDate(pedido.created_at)} · {pedido.productos?.length || 0} productos</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={cn("px-3 py-1 rounded-full text-sm font-medium", estadoColors[pedido.estado as keyof typeof estadoColors] || estadoColors.pendiente)}>
                                {estadoLabels[pedido.estado as keyof typeof estadoLabels] || pedido.estado}
                              </span>
                              <p className="font-bold text-[#2d5a27]">{formatPrice(pedido.total)}</p>
                              <ChevronRight size={20} className="text-gray-400" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenés pedidos</h3>
                        <p className="text-gray-500 mb-6">Cuando realices tu primer pedido, acá vas a poder verlo</p>
                        <Link
                          href="/catalogo"
                          className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 px-8 rounded-xl transition inline-block"
                        >
                          Ver Catálogo
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "direcciones" && (
                  <div>
                    {addresses.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {addresses.map((addr) => (
                          <div key={addr.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{addr.direccion}</p>
                              <p className="text-sm text-gray-500">{addr.ciudad} {addr.codigo_postal && `· ${addr.codigo_postal}`}</p>
                              {addr.provincia && <p className="text-sm text-gray-500 capitalize">{addr.provincia.replace(/_/g, ' ')}</p>}
                            </div>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="p-2 hover:bg-red-50 rounded-lg"
                            >
                              <i className="fas fa-trash text-red-500"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {showAddressForm ? (
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold mb-6">Nueva Dirección</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Provincia *
                            </label>
                            <select
                              value={newAddress.provincia}
                              onChange={(e) => setNewAddress({ ...newAddress, provincia: e.target.value })}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] appearance-none"
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
                              value={newAddress.ciudad}
                              onChange={(e) => setNewAddress({ ...newAddress, ciudad: e.target.value })}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                              placeholder="Ciudad"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Dirección *
                            </label>
                            <input
                              type="text"
                              value={newAddress.direccion}
                              onChange={(e) => setNewAddress({ ...newAddress, direccion: e.target.value })}
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
                              value={newAddress.codigoPostal}
                              onChange={(e) => setNewAddress({ ...newAddress, codigoPostal: e.target.value })}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                              placeholder="Ej: B1603"
                            />
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={handleAddAddress}
                              className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 px-6 rounded-xl transition"
                            >
                              Guardar Dirección
                            </button>
                            <button
                              onClick={() => setShowAddressForm(false)}
                              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenés direcciones guardadas</h3>
                        <p className="text-gray-500 mb-6">Agregá una dirección para facilitar tus compras</p>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 px-8 rounded-xl transition"
                        >
                          Agregar dirección
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showPasswordModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPasswordModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Cambiar Contraseña</h2>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showPasswords.nueva ? "text" : "password"}
                    value={passwords.nueva}
                    onChange={(e) => setPasswords({ ...passwords, nueva: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, nueva: !showPasswords.nueva })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.nueva ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmar ? "text" : "password"}
                    value={passwords.confirmar}
                    onChange={(e) => setPasswords({ ...passwords, confirmar: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                    placeholder="Repetí la contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirmar: !showPasswords.confirmar })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.confirmar ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full bg-[#2d5a27] hover:bg-[#1b5e20] text-white font-bold py-3 rounded-xl transition"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </>
      )}

      {showPedidoModal && selectedPedido && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPedidoModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Pedido #{selectedPedido.order_id || selectedPedido.id.slice(0, 8).toUpperCase()}</h2>
              <button onClick={() => setShowPedidoModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">{formatDate(selectedPedido.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <span className={cn("px-3 py-1 rounded-full text-sm font-medium inline-block", estadoColors[selectedPedido.estado as keyof typeof estadoColors] || estadoColors.pendiente)}>
                    {estadoLabels[selectedPedido.estado as keyof typeof estadoLabels] || selectedPedido.estado}
                  </span>
                </div>
              </div>
              
              {/* Datos de envío */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {selectedPedido.notas?.includes("RETIRO") ? "Retiro en local" : "Envío a domicilio"}
                </p>
                <p className="font-medium text-sm">
                  {selectedPedido.notas?.includes("RETIRO") 
                    ? "Paraguay 754, CABA" 
                    : `${selectedPedido.direccion || ""}, ${selectedPedido.ciudad || ""}, ${selectedPedido.provincia?.replace(/_/g, ' ') || ""} ${selectedPedido.codigo_postal || ""}`}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Productos</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  {selectedPedido.productos && selectedPedido.productos.length > 0 ? (
                    selectedPedido.productos.map((prod: any, i: number) => (
                      <div key={i} className="flex justify-between py-2">
                        <span className="text-gray-700">{prod.titulo || prod.nombre} x{prod.cantidad || 1}</span>
                        <span className="font-medium">{formatPrice(prod.precio * (prod.cantidad || 1))}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Sin detalles de productos</p>
                  )}
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-[#2d5a27]">{formatPrice(selectedPedido.total)}</span>
              </div>
            </div>
            <div className="p-6 border-t">
              <button
                onClick={() => setShowPedidoModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function CuentaPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="flex-1 pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-center h-64">
              <i className="fas fa-spinner fa-spin text-4xl text-[#2d5a27]"></i>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <CuentaContent />
    </Suspense>
  );
}
