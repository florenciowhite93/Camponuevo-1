"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Package, Users, ShoppingCart, Layout, Plus, Search, 
  Edit2, Trash2, Copy, ChevronRight, X, Menu, 
  Tags, FlaskConical, FolderTree, Layers, Eye, ArrowLeft, Save, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AdminView = "dashboard" | "productos" | "categorias" | "subcategorias" | "laboratorios" | "etiquetas" | "clientes" | "pedidos" | "landing";

const sidebarItems = [
  { id: "dashboard" as AdminView, label: "Panel de Control", icon: Layout },
  { id: "productos" as AdminView, label: "Productos", icon: Package },
  { id: "categorias" as AdminView, label: "Categorías", icon: FolderTree },
  { id: "subcategorias" as AdminView, label: "Sub-Categorías", icon: Layers },
  { id: "laboratorios" as AdminView, label: "Laboratorios", icon: FlaskConical },
  { id: "etiquetas" as AdminView, label: "Etiquetas", icon: Tags },
  { id: "clientes" as AdminView, label: "Clientes", icon: Users },
  { id: "pedidos" as AdminView, label: "Pedidos", icon: ShoppingCart },
];

const ESTADOS = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];
const ESPECIES = ["bovino", "ovino", "equino", "porcino", "canino", "felino"];
const COLORES_ETIQUETAS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#1b5e20"];

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data states
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [subcategorias, setSubcategorias] = useState<any[]>([]);
  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [etiquetas, setEtiquetas] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<any>(null);
  const [showLabModal, setShowLabModal] = useState(false);
  const [editingLab, setEditingLab] = useState<any>(null);
  const [showEtiquetaModal, setShowEtiquetaModal] = useState(false);
  const [editingEtiqueta, setEditingEtiqueta] = useState<any>(null);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<any>(null);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<any>(null);

  // Forms
  const [productForm, setProductForm] = useState({
    titulo: "",
    precio: "",
    laboratorio_id: "",
    volumen: "",
    descripcion: "",
    drogas: "",
    dosis: "",
    especies: [] as string[],
    etiquetas_ids: [] as string[],
    subcategorias_ids: [] as string[],
    imagen: "",
    link_externo: "",
    visible: true,
  });

  const [categoryForm, setCategoryForm] = useState({ nombre: "", icono_svg: "" });
  const [subcategoryForm, setSubcategoryForm] = useState({ nombre: "", categoria_id: "" });
  const [labForm, setLabForm] = useState({ nombre: "" });
  const [etiquetaForm, setEtiquetaForm] = useState({ nombre: "", color: "#2d5a27" });
  const [clienteForm, setClienteForm] = useState({ nombre: "", email: "", telefono: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  // Check auth
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await fetchAllData();
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const [prodRes, catRes, subcatRes, labRes, etqRes, cliRes, pedRes] = await Promise.all([
        supabase.from("productos").select(`*, laboratorio:laboratorios(nombre)`).order("created_at", { ascending: false }),
        supabase.from("categorias").select("*").order("nombre"),
        supabase.from("subcategorias").select("*").order("nombre"),
        supabase.from("laboratorios").select("*").order("nombre"),
        supabase.from("etiquetas").select("*").order("nombre"),
        supabase.from("perfiles").select("*").order("created_at", { ascending: false }),
        supabase.from("pedidos").select("*").order("created_at", { ascending: false }),
      ]);

      setProductos((prodRes.data || []).map(p => ({ ...p, laboratorio_nombre: p.laboratorio?.nombre })));
      setCategorias(catRes.data || []);
      setSubcategorias(subcatRes.data || []);
      setLaboratorios(labRes.data || []);
      setEtiquetas(etqRes.data || []);
      setClientes(cliRes.data || []);
      setPedidos(pedRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
  };

  // --- PRODUCTOS ---
  const openProductModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        titulo: product.titulo || "",
        precio: product.precio?.toString() || "",
        laboratorio_id: product.laboratorio_id || "",
        volumen: product.volumen || "",
        descripcion: product.descripcion || "",
        drogas: product.drogas || "",
        dosis: product.dosis || "",
        especies: product.especies || [],
        etiquetas_ids: product.etiquetas_ids || [],
        subcategorias_ids: product.subcategorias_ids || [],
        imagen: product.imagen || "",
        link_externo: product.link_externo || "",
        visible: product.visible ?? true,
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        titulo: "",
        precio: "",
        laboratorio_id: "",
        volumen: "",
        descripcion: "",
        drogas: "",
        dosis: "",
        especies: [],
        etiquetas_ids: [],
        subcategorias_ids: [],
        imagen: "",
        link_externo: "",
        visible: true,
      });
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        titulo: productForm.titulo,
        precio: parseFloat(productForm.precio) || 0,
        laboratorio_id: productForm.laboratorio_id || null,
        volumen: productForm.volumen,
        descripcion: productForm.descripcion,
        drogas: productForm.drogas,
        dosis: productForm.dosis,
        especies: productForm.especies,
        etiquetas_ids: productForm.etiquetas_ids,
        subcategorias_ids: productForm.subcategorias_ids,
        imagen: productForm.imagen,
        link_externo: productForm.link_externo,
        visible: productForm.visible,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        await supabase.from("productos").update(productData).eq("id", editingProduct.id);
      } else {
        await supabase.from("productos").insert(productData);
      }
      await fetchAllData();
      setShowProductModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("¿Eliminar este producto?")) {
      await supabase.from("productos").delete().eq("id", id);
      await fetchAllData();
    }
  };

  // --- CATEGORÍAS ---
  const openCategoryModal = (category?: any) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ nombre: category.nombre || "", icono_svg: category.icono_svg || "" });
    } else {
      setEditingCategory(null);
      setCategoryForm({ nombre: "", icono_svg: "" });
    }
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await supabase.from("categorias").update(categoryForm).eq("id", editingCategory.id);
      } else {
        await supabase.from("categorias").insert(categoryForm);
      }
      await fetchAllData();
      setShowCategoryModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const deleteCategory = async (id: string) => {
    if (confirm("¿Eliminar esta categoría?")) {
      await supabase.from("categorias").delete().eq("id", id);
      await fetchAllData();
    }
  };

  // --- SUBCATEGORÍAS ---
  const openSubcategoryModal = (subcategory?: any) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setSubcategoryForm({ nombre: subcategory.nombre || "", categoria_id: subcategory.categoria_id || "" });
    } else {
      setEditingSubcategory(null);
      setSubcategoryForm({ nombre: "", categoria_id: "" });
    }
    setShowSubcategoryModal(true);
  };

  const handleSaveSubcategory = async () => {
    try {
      if (editingSubcategory) {
        await supabase.from("subcategorias").update(subcategoryForm).eq("id", editingSubcategory.id);
      } else {
        await supabase.from("subcategorias").insert(subcategoryForm);
      }
      await fetchAllData();
      setShowSubcategoryModal(false);
    } catch (error) {
      console.error("Error saving subcategory:", error);
    }
  };

  const deleteSubcategory = async (id: string) => {
    if (confirm("¿Eliminar esta subcategoría?")) {
      await supabase.from("subcategorias").delete().eq("id", id);
      await fetchAllData();
    }
  };

  // --- LABORATORIOS ---
  const openLabModal = (lab?: any) => {
    if (lab) {
      setEditingLab(lab);
      setLabForm({ nombre: lab.nombre || "" });
    } else {
      setEditingLab(null);
      setLabForm({ nombre: "" });
    }
    setShowLabModal(true);
  };

  const handleSaveLab = async () => {
    try {
      if (editingLab) {
        await supabase.from("laboratorios").update(labForm).eq("id", editingLab.id);
      } else {
        await supabase.from("laboratorios").insert(labForm);
      }
      await fetchAllData();
      setShowLabModal(false);
    } catch (error) {
      console.error("Error saving lab:", error);
    }
  };

  const deleteLab = async (id: string) => {
    if (confirm("¿Eliminar este laboratorio?")) {
      await supabase.from("laboratorios").delete().eq("id", id);
      await fetchAllData();
    }
  };

  // --- ETIQUETAS ---
  const openEtiquetaModal = (etq?: any) => {
    if (etq) {
      setEditingEtiqueta(etq);
      setEtiquetaForm({ nombre: etq.nombre || "", color: etq.color || "#2d5a27" });
    } else {
      setEditingEtiqueta(null);
      setEtiquetaForm({ nombre: "", color: "#2d5a27" });
    }
    setShowEtiquetaModal(true);
  };

  const handleSaveEtiqueta = async () => {
    try {
      if (editingEtiqueta) {
        await supabase.from("etiquetas").update(etiquetaForm).eq("id", editingEtiqueta.id);
      } else {
        await supabase.from("etiquetas").insert(etiquetaForm);
      }
      await fetchAllData();
      setShowEtiquetaModal(false);
    } catch (error) {
      console.error("Error saving etiqueta:", error);
    }
  };

  const deleteEtiqueta = async (id: string) => {
    if (confirm("¿Eliminar esta etiqueta?")) {
      await supabase.from("etiquetas").delete().eq("id", id);
      await fetchAllData();
    }
  };

  // --- PEDIDOS ---
  const openPedidoModal = (pedido: any) => {
    setSelectedPedido(pedido);
    setShowPedidoModal(true);
  };

  const updatePedidoEstado = async (pedidoId: string, nuevoEstado: string) => {
    try {
      await supabase.from("pedidos").update({ estado: nuevoEstado, updated_at: new Date().toISOString() }).eq("id", pedidoId);
      await fetchAllData();
      if (selectedPedido && selectedPedido.id === pedidoId) {
        setSelectedPedido({ ...selectedPedido, estado: nuevoEstado });
      }
    } catch (error) {
      console.error("Error updating pedido:", error);
    }
  };

  // --- CLIENTES ---
  const openClienteModal = (cliente?: any) => {
    if (cliente) {
      setEditingCliente(cliente);
      setClienteForm({ nombre: cliente.nombre || "", email: cliente.email || "", telefono: cliente.telefono || "" });
    } else {
      setEditingCliente(null);
      setClienteForm({ nombre: "", email: "", telefono: "" });
    }
    setShowClienteModal(true);
  };

  const handleSaveCliente = async () => {
    try {
      if (editingCliente) {
        await supabase.from("perfiles").update(clienteForm).eq("id", editingCliente.id);
      }
      await fetchAllData();
      setShowClienteModal(false);
    } catch (error) {
      console.error("Error saving cliente:", error);
    }
  };

  const filteredProducts = productos.filter(p => 
    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPedidos = filterEstado 
    ? pedidos.filter(p => p.estado === filterEstado)
    : pedidos;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <i className="fas fa-spinner fa-spin text-4xl text-[#2d5a27]"></i>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
          <i className="fas fa-lock text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">Iniciá sesión para acceder al panel de administración</p>
          <Link href="/login" className="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-medium">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#1b5e20] text-white w-64 flex-shrink-0 transition-all duration-300",
        isSidebarOpen ? "block" : "hidden lg:block",
        "fixed lg:relative inset-y-0 left-0 z-50 lg:z-0"
      )}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10">
              <svg viewBox="0 0 82.99 82.99" className="w-full h-full">
                <defs>
                  <style>{`.cls-1 { fill: #0a92cf; } .cls-2 { fill: #03a84d; }`}</style>
                </defs>
                <g>
                  <path className="cls-1" d="M82.99,41.49c0,3.01-.32,5.95-.93,8.77-8.39-13.6-23.44-22.69-40.56-22.69S9.32,36.66.93,50.27c-.61-2.83-.93-5.76-.93-8.78C0,18.58,18.58,0,41.5,0s41.49,18.58,41.49,41.49Z"/>
                  <path className="cls-2" d="M80.49,55.64c-5.77,15.96-21.05,27.35-38.99,27.35S8.28,71.59,2.49,55.65c7.18-14.27,21.97-24.08,39.01-24.08s31.81,9.81,38.99,24.07Z"/>
                </g>
              </svg>
            </div>
            <span className="font-bold text-lg">Admin</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); setSearchTerm(""); setFilterEstado(""); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
                activeView === item.id ? "bg-white/20 border-l-4 border-[#8bc34a]" : "hover:bg-white/10"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white mb-3">
            <ArrowLeft size={16} />
            Ver tienda
          </Link>
          <button 
            onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg transition text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white shadow-sm p-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
              {activeView === "dashboard" ? "Panel de Control" : activeView}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {activeView === "productos" && (
              <button onClick={() => openProductModal()} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
                <Plus size={18} />
                Nuevo
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* DASHBOARD */}
          {activeView === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Productos", value: productos.length, icon: Package, color: "bg-blue-500" },
                { label: "Pedidos", value: pedidos.length, icon: ShoppingCart, color: "bg-green-500" },
                { label: "Clientes", value: clientes.length, icon: Users, color: "bg-purple-500" },
                { label: "Categorías", value: categorias.length, icon: FolderTree, color: "bg-orange-500" },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
                <h3 className="font-semibold mb-4">Últimos Pedidos</h3>
                <div className="space-y-3">
                  {pedidos.slice(0, 5).map((pedido) => (
                    <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{pedido.id.slice(0, 8)}</p>
                        <p className="text-xs text-gray-500">{formatDate(pedido.created_at)}</p>
                      </div>
                      <span className={cn("px-2 py-1 rounded text-xs font-medium",
                        pedido.estado === "entregado" && "bg-green-100 text-green-800",
                        pedido.estado === "enviado" && "bg-purple-100 text-purple-800",
                        pedido.estado === "pendiente" && "bg-yellow-100 text-yellow-800",
                      )}>{pedido.estado}</span>
                    </div>
                  ))}
                  {pedidos.length === 0 && <p className="text-gray-500 text-sm">No hay pedidos</p>}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
                <h3 className="font-semibold mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setActiveView("productos")} className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
                    <Package size={20} className="text-[#2d5a27] mb-1" />
                    <p className="text-sm font-medium">Gestionar Productos</p>
                  </button>
                  <button onClick={() => setActiveView("pedidos")} className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
                    <ShoppingCart size={20} className="text-[#2d5a27] mb-1" />
                    <p className="text-sm font-medium">Ver Pedidos</p>
                  </button>
                  <button onClick={() => setActiveView("categorias")} className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
                    <FolderTree size={20} className="text-[#2d5a27] mb-1" />
                    <p className="text-sm font-medium">Categorías</p>
                  </button>
                  <button onClick={() => setActiveView("clientes")} className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
                    <Users size={20} className="text-[#2d5a27] mb-1" />
                    <p className="text-sm font-medium">Clientes</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTOS */}
          {activeView === "productos" && (
            <div>
              <div className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-600">Producto</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Laboratorio</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Especies</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Precio</th>
                        <th className="text-center p-4 font-semibold text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="p-4"><p className="font-medium text-gray-900">{product.titulo}</p></td>
                          <td className="p-4 text-gray-600">{product.laboratorio_nombre}</td>
                          <td className="p-4">
                            <div className="flex gap-1 flex-wrap">
                              {product.especies?.slice(0, 3).map((esp: string) => (
                                <span key={esp} className="px-2 py-1 bg-gray-100 rounded text-xs">{esp}</span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#2d5a27]">{formatPrice(product.precio)}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openProductModal(product)} className="p-2 hover:bg-gray-100 rounded-lg" title="Editar"><Edit2 size={18} className="text-gray-600" /></button>
                              <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Eliminar"><Trash2 size={18} className="text-red-500" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Package size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No hay productos</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORÍAS */}
          {activeView === "categorias" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nueva categoría</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Nombre de la categoría..." value={categoryForm.nombre} onChange={(e) => setCategoryForm({ ...categoryForm, nombre: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={() => openCategoryModal()} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"><Plus size={18} /></button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50"><h3 className="font-semibold text-gray-600">Categorías Existentes</h3></div>
                <div className="divide-y">
                  {categorias.map((cat) => (
                    <div key={cat.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f1f8e9] flex items-center justify-center"><FolderTree size={20} className="text-[#2d5a27]" /></div>
                        <span className="font-medium">{cat.nombre}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openCategoryModal(cat)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit2 size={18} className="text-gray-600" /></button>
                        <button onClick={() => deleteCategory(cat.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} className="text-red-500" /></button>
                      </div>
                    </div>
                  ))}
                  {categorias.length === 0 && <div className="p-8 text-center text-gray-500">No hay categorías</div>}
                </div>
              </div>
            </div>
          )}

          {/* SUBCATEGORÍAS */}
          {activeView === "subcategorias" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nueva subcategoría</h3>
                <div className="flex gap-3 flex-wrap">
                  <select value={subcategoryForm.categoria_id} onChange={(e) => setSubcategoryForm({ ...subcategoryForm, categoria_id: e.target.value })}
                    className="flex-1 min-w-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]">
                    <option value="">Seleccionar categoría...</option>
                    {categorias.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nombre}</option>))}
                  </select>
                  <input type="text" placeholder="Nombre de la subcategoría..." value={subcategoryForm.nombre} onChange={(e) => setSubcategoryForm({ ...subcategoryForm, nombre: e.target.value })}
                    className="flex-1 min-w-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={() => openSubcategoryModal()} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"><Plus size={18} /></button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50"><h3 className="font-semibold text-gray-600">Sub-Categorías Existentes</h3></div>
                <div className="divide-y">
                  {subcategorias.map((sub) => {
                    const cat = categorias.find(c => c.id === sub.categoria_id);
                    return (
                      <div key={sub.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Layers size={20} className="text-gray-400" />
                          <div>
                            <span className="font-medium">{sub.nombre}</span>
                            {cat && <span className="text-xs text-gray-500 ml-2">({cat.nombre})</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openSubcategoryModal(sub)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit2 size={18} className="text-gray-600" /></button>
                          <button onClick={() => deleteSubcategory(sub.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} className="text-red-500" /></button>
                        </div>
                      </div>
                    );
                  })}
                  {subcategorias.length === 0 && <div className="p-8 text-center text-gray-500">No hay subcategorías</div>}
                </div>
              </div>
            </div>
          )}

          {/* LABORATORIOS */}
          {activeView === "laboratorios" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nuevo laboratorio</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Nombre del laboratorio..." value={labForm.nombre} onChange={(e) => setLabForm({ ...labForm, nombre: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={() => openLabModal()} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"><Plus size={18} /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {laboratorios.map((lab) => (
                  <div key={lab.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><FlaskConical size={20} className="text-blue-600" /></div>
                      <span className="font-medium">{lab.nombre}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openLabModal(lab)} className="p-1.5 hover:bg-gray-100 rounded"><Edit2 size={16} className="text-gray-500" /></button>
                      <button onClick={() => deleteLab(lab.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {laboratorios.length === 0 && <div className="text-center py-8 text-gray-500">No hay laboratorios</div>}
            </div>
          )}

          {/* ETIQUETAS */}
          {activeView === "etiquetas" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nueva etiqueta</h3>
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm text-gray-500 mb-2">Nombre</label>
                    <input type="text" placeholder="Ej: Liquidación" value={etiquetaForm.nombre} onChange={(e) => setEtiquetaForm({ ...etiquetaForm, nombre: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Color</label>
                    <div className="flex gap-2">
                      {COLORES_ETIQUETAS.map((color) => (
                        <button key={color} onClick={() => setEtiquetaForm({ ...etiquetaForm, color })}
                          className={cn("w-8 h-8 rounded-lg border-2 border-white shadow-sm", etiquetaForm.color === color ? "ring-2 ring-offset-2 ring-[#2d5a27]" : "")}
                          style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => openEtiquetaModal()} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition"><Plus size={18} /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {etiquetas.map((etq) => (
                  <div key={etq.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: etq.color }} />
                      <span className="font-medium">{etq.nombre}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEtiquetaModal(etq)} className="p-1.5 hover:bg-gray-100 rounded"><Edit2 size={16} className="text-gray-500" /></button>
                      <button onClick={() => deleteEtiqueta(etq.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {etiquetas.length === 0 && <div className="text-center py-8 text-gray-500">No hay etiquetas</div>}
            </div>
          )}

          {/* CLIENTES */}
          {activeView === "clientes" && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Lista de clientes</h3>
                <div className="relative w-64">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Buscar cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                </div>
              </div>
              <div className="divide-y">
                {clientes.filter(c => c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || c.email?.toLowerCase().includes(searchTerm.toLowerCase())).map((cliente) => (
                  <div key={cliente.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f1f8e9] flex items-center justify-center text-[#2d5a27] font-bold">
                        {(cliente.nombre || cliente.email || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{cliente.nombre || "Sin nombre"}</p>
                        <p className="text-sm text-gray-500">{cliente.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{cliente.telefono || "Sin teléfono"}</p>
                      </div>
                      <button onClick={() => openClienteModal(cliente)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Edit2 size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
                {clientes.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No hay clientes registrados</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PEDIDOS */}
          {activeView === "pedidos" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
                <h3 className="font-semibold">Gestión de pedidos</h3>
                <div className="flex gap-3">
                  <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none">
                    <option value="">Todos los estados</option>
                    {ESTADOS.map((est) => (<option key={est} value={est}>{est.charAt(0).toUpperCase() + est.slice(1)}</option>))}
                  </select>
                </div>
              </div>
              <div className="divide-y">
                {filteredPedidos.map((pedido) => (
                  <div key={pedido.id} onClick={() => openPedidoModal(pedido)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center"><ShoppingCart size={20} className="text-gray-600" /></div>
                      <div>
                        <p className="font-medium">{pedido.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-sm text-gray-500">{formatDate(pedido.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={cn("px-3 py-1 rounded-full text-sm font-medium",
                        pedido.estado === "entregado" && "bg-green-100 text-green-800",
                        pedido.estado === "enviado" && "bg-purple-100 text-purple-800",
                        pedido.estado === "pendiente" && "bg-yellow-100 text-yellow-800",
                        pedido.estado === "cancelado" && "bg-red-100 text-red-800",
                      )}>{pedido.estado}</span>
                      <p className="font-bold text-[#2d5a27]">{formatPrice(pedido.total)}</p>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                ))}
                {filteredPedidos.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No hay pedidos</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL PRODUCTO */}
      {showProductModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowProductModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-4 md:bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                    <input type="text" value={productForm.titulo} onChange={(e) => setProductForm({...productForm, titulo: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Nombre del producto" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                      <input type="number" value={productForm.precio} onChange={(e) => setProductForm({...productForm, precio: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Volumen</label>
                      <input type="text" value={productForm.volumen} onChange={(e) => setProductForm({...productForm, volumen: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Ej: 5L" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Laboratorio</label>
                    <select value={productForm.laboratorio_id} onChange={(e) => setProductForm({...productForm, laboratorio_id: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]">
                      <option value="">Seleccionar...</option>
                      {laboratorios.map((lab) => (<option key={lab.id} value={lab.id}>{lab.nombre}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea value={productForm.descripcion} onChange={(e) => setProductForm({...productForm, descripcion: e.target.value})}
                      rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none" placeholder="Descripción..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
                    <input type="url" value={productForm.imagen} onChange={(e) => setProductForm({...productForm, imagen: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drogas / Principios Activos</label>
                    <input type="text" value={productForm.drogas} onChange={(e) => setProductForm({...productForm, drogas: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Ej: Ibuprofeno 500mg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosis Recomendada</label>
                    <input type="text" value={productForm.dosis} onChange={(e) => setProductForm({...productForm, dosis: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Ej: 1 vez al día" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especies de Destino</label>
                    <div className="flex flex-wrap gap-2">
                      {ESPECIES.map((esp) => (
                        <button key={esp} type="button" onClick={() => {
                          const newEspecies = productForm.especies.includes(esp)
                            ? productForm.especies.filter(e => e !== esp)
                            : [...productForm.especies, esp];
                          setProductForm({...productForm, especies: newEspecies});
                        }}
                          className={cn("px-3 py-1 rounded-full text-sm font-medium transition", productForm.especies.includes(esp) ? "bg-[#2d5a27] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
                          {esp}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Externo</label>
                    <input type="url" value={productForm.link_externo} onChange={(e) => setProductForm({...productForm, link_externo: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="https://..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={productForm.visible} onChange={(e) => setProductForm({...productForm, visible: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#2d5a27]" id="visible" />
                    <label htmlFor="visible" className="text-sm text-gray-700">Visible en tienda</label>
                  </div>
                </div>
                {/* Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-4">Vista previa</h4>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {productForm.imagen ? (
                        <img src={productForm.imagen} alt="Preview" className="w-full h-full object-contain p-4" />
                      ) : (<i className="fas fa-image text-4xl text-gray-300"></i>)}
                    </div>
                    <div className="p-4">
                      <h5 className="font-semibold line-clamp-2">{productForm.titulo || "Nombre del producto"}</h5>
                      <p className="text-sm text-[#4caf50] mt-1">
                        {laboratorios.find(l => l.id === productForm.laboratorio_id)?.nombre}
                      </p>
                      <p className="text-xl font-bold text-[#2d5a27] mt-2">
                        {productForm.precio ? formatPrice(parseFloat(productForm.precio)) : "Consultar"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowProductModal(false)} className="px-6 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={handleSaveProduct} className="px-6 py-2 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL CATEGORÍA */}
      {showCategoryModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCategoryModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={categoryForm.nombre} onChange={(e) => setCategoryForm({...categoryForm, nombre: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCategoryModal(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSaveCategory} className="flex-1 px-6 py-3 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL SUBCATEGORÍA */}
      {showSubcategoryModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSubcategoryModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">{editingSubcategory ? "Editar Subcategoría" : "Nueva Subcategoría"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select value={subcategoryForm.categoria_id} onChange={(e) => setSubcategoryForm({...subcategoryForm, categoria_id: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]">
                  <option value="">Seleccionar...</option>
                  {categorias.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nombre}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={subcategoryForm.nombre} onChange={(e) => setSubcategoryForm({...subcategoryForm, nombre: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSubcategoryModal(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSaveSubcategory} className="flex-1 px-6 py-3 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL LABORATORIO */}
      {showLabModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowLabModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">{editingLab ? "Editar Laboratorio" : "Nuevo Laboratorio"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={labForm.nombre} onChange={(e) => setLabForm({...labForm, nombre: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLabModal(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSaveLab} className="flex-1 px-6 py-3 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL ETIQUETA */}
      {showEtiquetaModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEtiquetaModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">{editingEtiqueta ? "Editar Etiqueta" : "Nueva Etiqueta"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={etiquetaForm.nombre} onChange={(e) => setEtiquetaForm({...etiquetaForm, nombre: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORES_ETIQUETAS.map((color) => (
                    <button key={color} onClick={() => setEtiquetaForm({...etiquetaForm, color})}
                      className={cn("w-8 h-8 rounded-lg border-2", etiquetaForm.color === color ? "border-gray-900 ring-2 ring-[#2d5a27]" : "border-white")}
                      style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowEtiquetaModal(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSaveEtiqueta} className="flex-1 px-6 py-3 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL PEDIDO */}
      {showPedidoModal && selectedPedido && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPedidoModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Pedido #{selectedPedido.id.slice(0, 8).toUpperCase()}</h2>
              <button onClick={() => setShowPedidoModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Fecha</p><p className="font-medium">{formatDate(selectedPedido.created_at)}</p></div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <select value={selectedPedido.estado} onChange={(e) => updatePedidoEstado(selectedPedido.id, e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    {ESTADOS.map((est) => (<option key={est} value={est}>{est}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Productos</p>
                <div className="bg-gray-50 rounded-xl p-3 max-h-40 overflow-y-auto">
                  {selectedPedido.productos?.length > 0 ? (
                    selectedPedido.productos.map((prod: any, i: number) => (
                      <div key={i} className="flex justify-between py-1 text-sm">
                        <span>{prod.titulo || prod.nombre} x{prod.cantidad || 1}</span>
                        <span className="font-medium">{formatPrice(prod.precio * (prod.cantidad || 1))}</span>
                      </div>
                    ))
                  ) : (<p className="text-gray-500 text-sm">Sin detalles</p>)}
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-[#2d5a27]">{formatPrice(selectedPedido.total)}</span>
              </div>
            </div>
            <div className="p-4 border-t">
              <button onClick={() => setShowPedidoModal(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl">Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL CLIENTE */}
      {showClienteModal && editingCliente && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowClienteModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={clienteForm.nombre} onChange={(e) => setClienteForm({...clienteForm, nombre: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" value={clienteForm.telefono} onChange={(e) => setClienteForm({...clienteForm, telefono: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowClienteModal(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSaveCliente} className="flex-1 px-6 py-3 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-xl font-medium">Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
