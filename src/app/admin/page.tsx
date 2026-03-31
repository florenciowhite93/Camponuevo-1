"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Package, Users, ShoppingCart, Layout, Plus, Search, 
  Edit2, Trash2, Copy, ChevronRight, X, Menu, 
  Tags, FlaskConical, FolderTree, Layers, Eye, ArrowLeft, Save, Check
} from "lucide-react";
import { cn, createSlug } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { LandingEditor } from "@/components/admin/LandingEditor";

const supabase = createClient();

type AdminView = "dashboard" | "productos" | "categorias" | "subcategorias" | "laboratorios" | "etiquetas" | "clientes" | "pedidos" | "landing";

const sidebarItems = [
  { id: "dashboard" as AdminView, label: "Panel de Control", icon: Layout },
  { id: "landing" as AdminView, label: "Editor Landing", icon: Layers },
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
  const [isAdmin, setIsAdmin] = useState(false);
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

  // Advanced Edit Modals (with product management)
  const [showEditSubCatModal, setShowEditSubCatModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [subcategoryProducts, setSubcategoryProducts] = useState<any[]>([]);
  const [subcatSearchTerm, setSubcatSearchTerm] = useState("");
  const [showEditSubCatNameModal, setShowEditSubCatNameModal] = useState(false);
  const [editSubCatName, setEditSubCatName] = useState("");

  const [showEditLabModal, setShowEditLabModal] = useState(false);
  const [selectedLab, setSelectedLab] = useState<any>(null);
  const [labProducts, setLabProducts] = useState<any[]>([]);
  const [labSearchTerm, setLabSearchTerm] = useState("");
  const [showEditLabNameModal, setShowEditLabNameModal] = useState(false);
  const [editLabName, setEditLabName] = useState("");

  const [showEditCatModal, setShowEditCatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categorySubcats, setCategorySubcats] = useState<any[]>([]);
  const [catSearchTerm, setCatSearchTerm] = useState("");
  const [showEditCatNameModal, setShowEditCatNameModal] = useState(false);
  const [editCatName, setEditCatName] = useState("");

  const [showEditLabelModal, setShowEditLabelModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<any>(null);
  const [labelProducts, setLabelProducts] = useState<any[]>([]);
  const [labelSearchTerm, setLabelSearchTerm] = useState("");
  const [showEditLabelNameModal, setShowEditLabelNameModal] = useState(false);
  const [editLabelName, setEditLabelName] = useState("");
  const [editLabelColor, setEditLabelColor] = useState("#2d5a27");

  // Bulk Selection States
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [bulkPricePercent, setBulkPricePercent] = useState("");
  const [showBulkLabelsModal, setShowBulkLabelsModal] = useState(false);
  const [bulkSelectedLabels, setBulkSelectedLabels] = useState<string[]>([]);
  const [bulkLabelsSearch, setBulkLabelsSearch] = useState("");
  const [showBulkSubcatsModal, setShowBulkSubcatsModal] = useState(false);
  const [bulkSelectedSubcats, setBulkSelectedSubcats] = useState<string[]>([]);
  const [bulkSubcatsSearch, setBulkSubcatsSearch] = useState("");
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState("");

  // Forms
  const [productForm, setProductForm] = useState({
    titulo: "",
    precio: "",
    laboratorio_id: "",
    volumen: "",
    descripcion: "",
    drogas: "",
    dosis: "",
    indicaciones: "",
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
  const [filterLaboratorio, setFilterLaboratorio] = useState("");
  const [filterVisible, setFilterVisible] = useState<'all' | 'visible' | 'hidden'>('all');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Editor product search states
  const [labSearch, setLabSearch] = useState("");
  const [showLabDropdown, setShowLabDropdown] = useState(false);
  const [subcatSearch, setSubcatSearch] = useState("");
  const [showSubcatDropdown, setShowSubcatDropdown] = useState(false);
  const [etqSearch, setEtqSearch] = useState("");
  const [showEtqDropdown, setShowEtqDropdown] = useState(false);

  // Check auth
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login?redirect=/admin");
        return;
      }

      setUser(user);

      const { data: perfil, error } = await supabase
        .from("perfiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error || !perfil?.is_admin) {
        router.push("/?error=unauthorized");
        return;
      }

      setIsAdmin(true);
      await fetchAllData();
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/");
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLabDropdown(false);
      setShowSubcatDropdown(false);
      setShowEtqDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
        indicaciones: product.indicaciones || "",
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
        indicaciones: "",
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
        indicaciones: productForm.indicaciones,
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

  const toggleProductVisibility = async (id: string, visible: boolean) => {
    await supabase
      .from("productos")
      .update({ visible, updated_at: new Date().toISOString() })
      .eq("id", id);
    await fetchAllData();
  };

  const duplicateProduct = async (product: any) => {
    const newProduct = {
      titulo: `${product.titulo} (copia)`,
      precio: product.precio,
      laboratorio_id: product.laboratorio_id,
      volumen: product.volumen,
      descripcion: product.descripcion,
      drogas: product.drogas,
      dosis: product.dosis,
      indicaciones: product.indicaciones,
      especies: product.especies,
      etiquetas_ids: product.etiquetas_ids,
      subcategorias_ids: product.subcategorias_ids,
      imagen: product.imagen,
      link_externo: product.link_externo,
      visible: false,
    };
    await supabase.from("productos").insert(newProduct);
    await fetchAllData();
  };

  // --- BULK OPERATIONS ---
  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkPriceIncrease = async () => {
    const percent = parseFloat(bulkPricePercent);
    if (isNaN(percent) || percent <= 0) return;
    
    for (const id of selectedProductIds) {
      const product = productos.find(p => p.id === id);
      if (product && product.precio > 0) {
        const newPrice = Math.round(product.precio * (1 + percent / 100) * 100) / 100;
        await supabase.from("productos").update({ precio: newPrice, updated_at: new Date().toISOString() }).eq("id", id);
      }
    }
    
    setShowBulkPriceModal(false);
    setBulkPricePercent("");
    setSelectedProductIds([]);
    await fetchAllData();
  };

  const handleBulkAddLabels = async () => {
    for (const id of selectedProductIds) {
      const product = productos.find(p => p.id === id);
      if (product) {
        const currentLabels = product.etiquetas_ids || [];
        const newLabels = [...new Set([...currentLabels, ...bulkSelectedLabels])];
        await supabase.from("productos").update({ etiquetas_ids: newLabels, updated_at: new Date().toISOString() }).eq("id", id);
      }
    }
    
    setShowBulkLabelsModal(false);
    setBulkSelectedLabels([]);
    setBulkLabelsSearch("");
    setSelectedProductIds([]);
    await fetchAllData();
  };

  const handleBulkAddSubcats = async () => {
    for (const id of selectedProductIds) {
      const product = productos.find(p => p.id === id);
      if (product) {
        const currentSubcats = product.subcategorias_ids || [];
        const newSubcats = [...new Set([...currentSubcats, ...bulkSelectedSubcats])];
        await supabase.from("productos").update({ subcategorias_ids: newSubcats, updated_at: new Date().toISOString() }).eq("id", id);
      }
    }
    
    setShowBulkSubcatsModal(false);
    setBulkSelectedSubcats([]);
    setBulkSubcatsSearch("");
    setSelectedProductIds([]);
    await fetchAllData();
  };

  const handleBulkDelete = async () => {
    if (bulkDeleteConfirm.toUpperCase() !== "ELIMINAR") return;
    
    for (const id of selectedProductIds) {
      await supabase.from("productos").delete().eq("id", id);
    }
    
    setShowBulkDeleteModal(false);
    setBulkDeleteConfirm("");
    setSelectedProductIds([]);
    await fetchAllData();
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

  // --- CREAR DIRECTO (SIN MODAL) ---
  const handleCreateCategory = async () => {
    if (!categoryForm.nombre.trim()) return;
    await supabase.from("categorias").insert({ nombre: categoryForm.nombre.trim() });
    setCategoryForm({ nombre: "", icono_svg: "" });
    await fetchAllData();
  };

  const handleCreateSubcategory = async () => {
    if (!subcategoryForm.nombre.trim()) return;
    await supabase.from("subcategorias").insert({ 
      nombre: subcategoryForm.nombre.trim(), 
      categoria_id: subcategoryForm.categoria_id || null 
    });
    setSubcategoryForm({ nombre: "", categoria_id: "" });
    await fetchAllData();
  };

  const handleCreateLab = async () => {
    if (!labForm.nombre.trim()) return;
    await supabase.from("laboratorios").insert({ nombre: labForm.nombre.trim() });
    setLabForm({ nombre: "" });
    await fetchAllData();
  };

  const handleCreateEtiqueta = async () => {
    if (!etiquetaForm.nombre.trim()) return;
    await supabase.from("etiquetas").insert({ nombre: etiquetaForm.nombre.trim(), color: etiquetaForm.color });
    setEtiquetaForm({ nombre: "", color: "#2d5a27" });
    await fetchAllData();
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

  // --- SUBCATEGORÍAS: Gestión avanzada de productos ---
  const openEditSubCatModal = async (subcategory: any) => {
    setSelectedSubcategory(subcategory);
    setSubcategoryProducts([]);
    setSubcatSearchTerm("");
    setShowEditSubCatModal(true);
    
    const { data } = await supabase
      .from("productos")
      .select("*")
      .contains("subcategorias_ids", [subcategory.id]);
    setSubcategoryProducts(data || []);
  };

  const addProductToSubcategory = async (productId: string) => {
    const product = productos.find(p => p.id === productId);
    if (!product || !selectedSubcategory) return;

    const currentIds = product.subcategorias_ids || [];
    if (!currentIds.includes(selectedSubcategory.id)) {
      await supabase
        .from("productos")
        .update({ subcategorias_ids: [...currentIds, selectedSubcategory.id] })
        .eq("id", productId);
      
      setSubcategoryProducts([...subcategoryProducts, product]);
      await fetchAllData();
    }
  };

  const removeProductFromSubcategory = async (productId: string) => {
    const product = productos.find(p => p.id === productId);
    if (!product || !selectedSubcategory) return;

    const currentIds = product.subcategorias_ids || [];
    const newIds = currentIds.filter((id: string) => id !== selectedSubcategory.id);
    
    await supabase
      .from("productos")
      .update({ subcategorias_ids: newIds })
      .eq("id", productId);
    
    setSubcategoryProducts(subcategoryProducts.filter(p => p.id !== productId));
    await fetchAllData();
  };

  const saveSubCatName = async () => {
    if (!selectedSubcategory || !editSubCatName.trim()) return;
    await supabase.from("subcategorias").update({ nombre: editSubCatName.trim() }).eq("id", selectedSubcategory.id);
    setSelectedSubcategory({ ...selectedSubcategory, nombre: editSubCatName.trim() });
    setSubcategorias(subcategorias.map(s => s.id === selectedSubcategory.id ? { ...s, nombre: editSubCatName.trim() } : s));
    setShowEditSubCatNameModal(false);
  };

  const deleteSubcategoryAdvanced = async () => {
    if (!selectedSubcategory || !confirm(`¿Eliminar la subcategoría "${selectedSubcategory.nombre}"? Los productos no se eliminarán, solo se desasociarán.`)) return;
    await supabase.from("subcategorias").delete().eq("id", selectedSubcategory.id);
    setShowEditSubCatModal(false);
    await fetchAllData();
  };

  // --- CATEGORÍAS: Gestión avanzada de subcategorías ---
  const openEditCatModal = async (category: any) => {
    setSelectedCategory(category);
    setEditCatName(category.nombre);
    setCategorySubcats([]);
    setCatSearchTerm("");
    setShowEditCatModal(true);
    
    const { data } = await supabase
      .from("subcategorias")
      .select("*")
      .eq("categoria_id", category.id)
      .order("nombre");
    setCategorySubcats(data || []);
  };

  const addSubcategoryToCategory = async (subcatId: string) => {
    const subcat = subcategorias.find(s => s.id === subcatId);
    if (!subcat || !selectedCategory) return;

    await supabase
      .from("subcategorias")
      .update({ categoria_id: selectedCategory.id })
      .eq("id", subcatId);
    
    setCategorySubcats([...categorySubcats, subcat]);
    await fetchAllData();
  };

  const removeSubcategoryFromCategory = async (subcatId: string) => {
    await supabase
      .from("subcategorias")
      .update({ categoria_id: null })
      .eq("id", subcatId);
    
    setCategorySubcats(categorySubcats.filter(s => s.id !== subcatId));
    await fetchAllData();
  };

  const saveCategoryName = async () => {
    if (!selectedCategory || !editCatName.trim()) return;
    await supabase.from("categorias").update({ nombre: editCatName.trim() }).eq("id", selectedCategory.id);
    setSelectedCategory({ ...selectedCategory, nombre: editCatName.trim() });
    setCategorias(categorias.map(c => c.id === selectedCategory.id ? { ...c, nombre: editCatName.trim() } : c));
    setShowEditCatNameModal(false);
  };

  const deleteCategoryAdvanced = async () => {
    if (!selectedCategory || !confirm(`¿Eliminar la categoría "${selectedCategory.nombre}"? Las subcategorías no se eliminarán, solo se desasociarán.`)) return;
    await supabase.from("categorias").delete().eq("id", selectedCategory.id);
    setShowEditCatModal(false);
    await fetchAllData();
  };

  // --- LABORATORIOS: Gestión avanzada de productos ---
  const openEditLabModal = async (lab: any) => {
    setSelectedLab(lab);
    setLabProducts([]);
    setLabSearchTerm("");
    setShowEditLabModal(true);
    
    const { data } = await supabase
      .from("productos")
      .select("*")
      .eq("laboratorio_id", lab.id);
    setLabProducts(data || []);
  };

  const addProductToLab = async (productId: string) => {
    const product = productos.find(p => p.id === productId);
    if (!product || !selectedLab) return;

    await supabase
      .from("productos")
      .update({ laboratorio_id: selectedLab.id })
      .eq("id", productId);
    
    setLabProducts([...labProducts, product]);
    await fetchAllData();
  };

  const removeProductFromLab = async (productId: string) => {
    await supabase
      .from("productos")
      .update({ laboratorio_id: null })
      .eq("id", productId);
    
    setLabProducts(labProducts.filter(p => p.id !== productId));
    await fetchAllData();
  };

  const saveLabName = async () => {
    if (!selectedLab || !editLabName.trim()) return;
    await supabase.from("laboratorios").update({ nombre: editLabName.trim() }).eq("id", selectedLab.id);
    setSelectedLab({ ...selectedLab, nombre: editLabName.trim() });
    setLaboratorios(laboratorios.map(l => l.id === selectedLab.id ? { ...l, nombre: editLabName.trim() } : l));
    setShowEditLabNameModal(false);
  };

  const deleteLabAdvanced = async () => {
    if (!selectedLab || !confirm(`¿Eliminar el laboratorio "${selectedLab.nombre}"? Los productos no se eliminarán, solo se desasociarán.`)) return;
    await supabase.from("laboratorios").delete().eq("id", selectedLab.id);
    setShowEditLabModal(false);
    await fetchAllData();
  };

  // --- ETIQUETAS: Gestión avanzada de productos ---
  const openEditLabelModal = async (label: any) => {
    setSelectedLabel(label);
    setEditLabelName(label.nombre);
    setEditLabelColor(label.color || "#2d5a27");
    setLabelProducts([]);
    setLabelSearchTerm("");
    setShowEditLabelModal(true);
    
    const { data } = await supabase
      .from("productos")
      .select("*")
      .contains("etiquetas_ids", [label.id]);
    setLabelProducts(data || []);
  };

  const addProductToLabel = async (productId: string) => {
    const product = productos.find(p => p.id === productId);
    if (!product || !selectedLabel) return;

    const currentIds = product.etiquetas_ids || [];
    if (!currentIds.includes(selectedLabel.id)) {
      await supabase
        .from("productos")
        .update({ etiquetas_ids: [...currentIds, selectedLabel.id] })
        .eq("id", productId);
      
      setLabelProducts([...labelProducts, product]);
      await fetchAllData();
    }
  };

  const removeProductFromLabel = async (productId: string) => {
    const product = productos.find(p => p.id === productId);
    if (!product || !selectedLabel) return;

    const currentIds = product.etiquetas_ids || [];
    const newIds = currentIds.filter((id: string) => id !== selectedLabel.id);
    
    await supabase
      .from("productos")
      .update({ etiquetas_ids: newIds })
      .eq("id", productId);
    
    setLabelProducts(labelProducts.filter(p => p.id !== productId));
    await fetchAllData();
  };

  const saveLabelName = async () => {
    if (!selectedLabel || !editLabelName.trim()) return;
    await supabase.from("etiquetas").update({ nombre: editLabelName.trim(), color: editLabelColor }).eq("id", selectedLabel.id);
    setSelectedLabel({ ...selectedLabel, nombre: editLabelName.trim(), color: editLabelColor });
    setEtiquetas(etiquetas.map(l => l.id === selectedLabel.id ? { ...l, nombre: editLabelName.trim(), color: editLabelColor } : l));
    setShowEditLabelNameModal(false);
  };

  const deleteLabelAdvanced = async () => {
    if (!selectedLabel || !confirm(`¿Eliminar la etiqueta "${selectedLabel.nombre}"? Los productos no se eliminarán, solo se desasociarán.`)) return;
    await supabase.from("etiquetas").delete().eq("id", selectedLabel.id);
    setShowEditLabelModal(false);
    await fetchAllData();
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

  const filteredProducts = productos.filter(p => {
    const matchesSearch = p.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLaboratorio = !filterLaboratorio || p.laboratorio_id === filterLaboratorio;
    const matchesVisible = filterVisible === 'all' || 
      (filterVisible === 'visible' && p.visible) || 
      (filterVisible === 'hidden' && !p.visible);
    return matchesSearch && matchesLaboratorio && matchesVisible;
  }).sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal: any, bVal: any;
    
    switch (sortField) {
      case 'titulo':
        aVal = a.titulo?.toLowerCase() || '';
        bVal = b.titulo?.toLowerCase() || '';
        break;
      case 'laboratorio':
        aVal = a.laboratorio_nombre?.toLowerCase() || '';
        bVal = b.laboratorio_nombre?.toLowerCase() || '';
        break;
      case 'precio':
        aVal = a.precio || 0;
        bVal = b.precio || 0;
        break;
      case 'visible':
        aVal = a.visible ? 1 : 0;
        bVal = b.visible ? 1 : 0;
        break;
      default:
        return 0;
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
          <i className="fas fa-lock text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">No tenés permisos para acceder al panel de administración</p>
          <Link href="/" className="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-medium">
            Volver al Inicio
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

          {/* LANDING EDITOR */}
          {activeView === "landing" && <LandingEditor />}

          {/* PRODUCTOS */}
          {activeView === "productos" && (
            <div>
              <div className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap">
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  </div>
                  <select value={filterLaboratorio} onChange={(e) => setFilterLaboratorio(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] text-sm">
                    <option value="">Todos los laboratorios</option>
                    {laboratorios.map(lab => (
                      <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                    ))}
                  </select>
                  <select value={filterVisible} onChange={(e) => setFilterVisible(e.target.value as 'all' | 'visible' | 'hidden')}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] text-sm">
                    <option value="all">Todos</option>
                    <option value="visible">Visibles</option>
                    <option value="hidden">No visibles</option>
                  </select>
                </div>
                {selectedProductIds.length > 0 && (
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <span className="text-sm font-semibold text-blue-800">{selectedProductIds.length} seleccionados</span>
                    <button onClick={() => setShowBulkPriceModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition flex items-center whitespace-nowrap">
                      Aumento +%
                    </button>
                    <button onClick={() => setShowBulkLabelsModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition flex items-center whitespace-nowrap">
                      Agregar Etiquetas
                    </button>
                    <button onClick={() => setShowBulkSubcatsModal(true)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition flex items-center whitespace-nowrap">
                      Agregar Sub-cats
                    </button>
                    <button onClick={() => setShowBulkDeleteModal(true)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition flex items-center whitespace-nowrap">
                      Eliminar
                    </button>
                    <button onClick={() => setSelectedProductIds([])} className="text-blue-600 hover:text-blue-800 text-xs font-medium ml-2">Cancelar</button>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-center p-4 font-semibold text-gray-600 w-12">
                          <input type="checkbox" checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0} onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27] cursor-pointer" />
                        </th>
                        <th className="text-left p-4 font-semibold cursor-pointer hover:text-[#2d5a27] transition" onClick={() => handleSort('titulo')}>
                          <div className="flex items-center gap-1">
                            Producto
                            {sortField === 'titulo' && (
                              <i className={cn("fas", sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down', "text-xs text-[#2d5a27]")}></i>
                            )}
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold cursor-pointer hover:text-[#2d5a27] transition" onClick={() => handleSort('laboratorio')}>
                          <div className="flex items-center gap-1">
                            Laboratorio
                            {sortField === 'laboratorio' && (
                              <i className={cn("fas", sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down', "text-xs text-[#2d5a27]")}></i>
                            )}
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-600">Especies</th>
                        <th className="text-left p-4 font-semibold cursor-pointer hover:text-[#2d5a27] transition" onClick={() => handleSort('precio')}>
                          <div className="flex items-center gap-1">
                            Precio
                            {sortField === 'precio' && (
                              <i className={cn("fas", sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down', "text-xs text-[#2d5a27]")}></i>
                            )}
                          </div>
                        </th>
                        <th className="text-center p-4 font-semibold cursor-pointer hover:text-[#2d5a27] transition" onClick={() => handleSort('visible')}>
                          <div className="flex items-center justify-center gap-1">
                            Visible
                            {sortField === 'visible' && (
                              <i className={cn("fas", sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down', "text-xs text-[#2d5a27]")}></i>
                            )}
                          </div>
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className={cn("hover:bg-gray-50", selectedProductIds.includes(product.id) && "bg-blue-50")}>
                          <td className="p-4 text-center">
                            <input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => toggleProductSelection(product.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27] cursor-pointer" />
                          </td>
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
                          <td className="p-4 text-center">
                            <button
                              onClick={() => toggleProductVisibility(product.id, !product.visible)}
                              className={cn(
                                "p-2 rounded-lg transition",
                                product.visible 
                                  ? "bg-green-100 text-green-600 hover:bg-green-200" 
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                              )}
                              title={product.visible ? "Ocultar de la tienda" : "Mostrar en la tienda"}
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                           <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <a href={`/catalogo/${createSlug(product.titulo)}`} target="_blank" className="p-2 hover:bg-green-50 rounded-lg" title="Ver"><Eye size={18} className="text-green-600" /></a>
                              <button onClick={() => openProductModal(product)} className="p-2 hover:bg-gray-100 rounded-lg" title="Editar"><Edit2 size={18} className="text-gray-600" /></button>
                              <button onClick={() => duplicateProduct(product)} className="p-2 hover:bg-blue-50 rounded-lg" title="Duplicar"><Copy size={18} className="text-blue-500" /></button>
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nueva categoría</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Nombre de la categoría..." value={categoryForm.nombre} onChange={(e) => setCategoryForm({ ...categoryForm, nombre: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={handleCreateCategory} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition">Crear</button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50"><h3 className="font-semibold text-gray-600">Categorías Existentes</h3></div>
                <div className="divide-y">
                  {categorias.map((cat) => (
                    <div key={cat.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f1f8e9] flex items-center justify-center"><FolderTree size={20} className="text-[#2d5a27]" /></div>
                        <button onClick={() => openEditCatModal(cat)} className="font-medium hover:text-[#2d5a27] transition text-left">{cat.nombre}</button>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditCatModal(cat)} className="p-2 hover:bg-gray-100 rounded-lg" title="Gestionar subcategorías"><Layers size={18} className="text-[#2d5a27]" /></button>
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nueva subcategoría</h3>
                <div className="flex gap-3 flex-wrap">
                  <select value={subcategoryForm.categoria_id} onChange={(e) => setSubcategoryForm({ ...subcategoryForm, categoria_id: e.target.value })}
                    className="flex-1 min-w-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]">
                    <option value="">Sin categoría</option>
                    {categorias.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nombre}</option>))}
                  </select>
                  <input type="text" placeholder="Nombre de la subcategoría..." value={subcategoryForm.nombre} onChange={(e) => setSubcategoryForm({ ...subcategoryForm, nombre: e.target.value })}
                    className="flex-1 min-w-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={handleCreateSubcategory} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition">Crear</button>
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
                            <button onClick={() => openEditSubCatModal(sub)} className="font-medium hover:text-[#2d5a27] transition text-left">{sub.nombre}</button>
                            {cat && <span className="text-xs text-gray-500 ml-2">({cat.nombre})</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openEditSubCatModal(sub)} className="p-2 hover:bg-gray-100 rounded-lg" title="Gestionar productos"><Package size={18} className="text-[#2d5a27]" /></button>
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Agregar nuevo laboratorio</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Nombre del laboratorio..." value={labForm.nombre} onChange={(e) => setLabForm({ ...labForm, nombre: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <button onClick={handleCreateLab} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition">Crear</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {laboratorios.map((lab) => (
                  <div key={lab.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><FlaskConical size={20} className="text-blue-600" /></div>
                        <button onClick={() => openEditLabModal(lab)} className="font-medium hover:text-[#2d5a27] transition">{lab.nombre}</button>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditLabModal(lab)} className="p-1.5 hover:bg-gray-100 rounded" title="Gestionar productos"><Package size={16} className="text-[#2d5a27]" /></button>
                        <button onClick={() => openLabModal(lab)} className="p-1.5 hover:bg-gray-100 rounded"><Edit2 size={16} className="text-gray-500" /></button>
                        <button onClick={() => deleteLab(lab.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {laboratorios.length === 0 && <div className="text-center py-8 text-gray-500">No hay laboratorios</div>}
            </div>
          )}

          {/* ETIQUETAS */}
          {activeView === "etiquetas" && (
            <div className="max-w-4xl mx-auto">
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
                  <button onClick={handleCreateEtiqueta} className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-medium transition">Crear</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {etiquetas.map((etq) => (
                  <div key={etq.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEditLabelModal(etq)} className="w-4 h-4 rounded-full hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 transition" style={{ backgroundColor: etq.color }} />
                        <button onClick={() => openEditLabelModal(etq)} className="font-medium hover:text-[#2d5a27] transition">{etq.nombre}</button>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditLabelModal(etq)} className="p-1.5 hover:bg-gray-100 rounded" title="Gestionar productos"><Package size={16} className="text-[#2d5a27]" /></button>
                        <button onClick={() => openEtiquetaModal(etq)} className="p-1.5 hover:bg-gray-100 rounded"><Edit2 size={16} className="text-gray-500" /></button>
                        <button onClick={() => deleteEtiqueta(etq.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
                      </div>
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
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* SECCIÓN: Información Básica */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">1</span>
                  Información Básica
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título del Producto *</label>
                    <input type="text" value={productForm.titulo} onChange={(e) => setProductForm({...productForm, titulo: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Ej. Dardox Konig 5lt." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($) *</label>
                      <input type="number" value={productForm.precio} onChange={(e) => setProductForm({...productForm, precio: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Volumen / Peso</label>
                      <input type="text" value={productForm.volumen} onChange={(e) => setProductForm({...productForm, volumen: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="Ej. 1L, 500g, 24 Bolos" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                    <textarea value={productForm.descripcion} onChange={(e) => setProductForm({...productForm, descripcion: e.target.value})}
                      rows={2} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none" placeholder="Descripción del producto..." />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Laboratorio */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">2</span>
                  Laboratorio *
                </h3>
                <div className="relative">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={labSearch || (productForm.laboratorio_id ? laboratorios.find(l => l.id === productForm.laboratorio_id)?.nombre || "" : "")}
                      onChange={(e) => {
                        setLabSearch(e.target.value);
                        setShowLabDropdown(true);
                      }}
                      onFocus={() => setShowLabDropdown(true)}
                      placeholder="Buscar laboratorio..."
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" 
                    />
                  </div>
                  {showLabDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {laboratorios
                        .filter(l => !labSearch || l.nombre.toLowerCase().includes(labSearch.toLowerCase()))
                        .length === 0 && !labSearch ? (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">Escribí para buscar...</div>
                      ) : (
                        <>
                          {laboratorios
                            .filter(l => !labSearch || l.nombre.toLowerCase().includes(labSearch.toLowerCase()))
                            .map((lab) => (
                              <button
                                key={lab.id}
                                onClick={() => {
                                  setProductForm({...productForm, laboratorio_id: lab.id});
                                  setLabSearch("");
                                  setShowLabDropdown(false);
                                }}
                                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              >
                                {lab.nombre}
                              </button>
                            ))
                          }
                          {(!labSearch || !laboratorios.some(l => l.nombre.toLowerCase() === labSearch.toLowerCase())) && (
                            <button
                              onClick={async () => {
                                const nombre = labSearch?.trim() || prompt("Nombre del nuevo laboratorio:");
                                if (nombre?.trim()) {
                                  const { data } = await supabase.from("laboratorios").insert({ nombre: nombre.trim() }).select().single();
                                  if (data) {
                                    setLaboratorios([...laboratorios, data]);
                                    setProductForm({...productForm, laboratorio_id: data.id});
                                    setLabSearch("");
                                    setShowLabDropdown(false);
                                  }
                                }
                              }}
                              className="w-full px-4 py-2.5 text-left text-[#2d5a27] hover:bg-green-50 border-t-2 border-[#2d5a27] font-medium"
                            >
                              <Plus size={14} className="inline mr-1" />
                              Crear "{labSearch || "nuevo laboratorio"}"
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => setShowLabDropdown(false)} className="text-xs text-gray-400 hover:text-gray-600 mt-2">
                  {productForm.laboratorio_id && <span className="underline">Lab seleccionado: {laboratorios.find(l => l.id === productForm.laboratorio_id)?.nombre}</span>}
                </button>
              </div>

              {/* SECCIÓN: Clasificación */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">3</span>
                  Clasificación
                </h3>
                <div className="space-y-5">
                  {/* Subcategorías */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sub-Categorías</label>
                    <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                      {productForm.subcategorias_ids.map((subId) => {
                        const sub = subcategorias.find(s => s.id === subId);
                        const cat = categorias.find(c => c.id === sub?.categoria_id);
                        return sub ? (
                          <span key={subId} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-[#2d5a27] text-sm rounded-lg">
                            {sub.nombre}
                            {cat && <span className="text-xs text-gray-400">({cat.nombre})</span>}
                            <button onClick={() => setProductForm({...productForm, subcategorias_ids: productForm.subcategorias_ids.filter(id => id !== subId)})} className="ml-1 hover:text-red-500">
                              <X size={14} />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="relative">
                      <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          value={subcatSearch}
                          onChange={(e) => {
                            setSubcatSearch(e.target.value);
                            setShowSubcatDropdown(true);
                          }}
                          onFocus={() => setShowSubcatDropdown(true)}
                          placeholder="Buscar sub-categoría o crear nueva..."
                          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" 
                        />
                      </div>
                      {showSubcatDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                          {subcategorias
                            .filter(s => !subcatSearch || s.nombre.toLowerCase().includes(subcatSearch.toLowerCase()))
                            .length === 0 && !subcatSearch ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">Escribí para buscar...</div>
                          ) : (
                            <>
                              {subcategorias
                                .filter(s => !subcatSearch || s.nombre.toLowerCase().includes(subcatSearch.toLowerCase()))
                                .map((sub) => {
                                  const cat = categorias.find(c => c.id === sub.categoria_id);
                                  return (
                                    <button
                                      key={sub.id}
                                      onClick={() => {
                                        if (!productForm.subcategorias_ids.includes(sub.id)) {
                                          setProductForm({...productForm, subcategorias_ids: [...productForm.subcategorias_ids, sub.id]});
                                        }
                                        setSubcatSearch("");
                                        setShowSubcatDropdown(false);
                                      }}
                                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                    >
                                      {sub.nombre}
                                      {cat && <span className="text-xs text-gray-400 ml-1">({cat.nombre})</span>}
                                    </button>
                                  );
                                })
                              }
                              {(!subcatSearch || !subcategorias.some(s => s.nombre.toLowerCase() === subcatSearch.toLowerCase())) && (
                                <button
                                  onClick={async () => {
                                    const nombre = subcatSearch?.trim() || prompt("Nombre de la nueva subcategoría:");
                                    if (nombre?.trim()) {
                                      const { data } = await supabase.from("subcategorias").insert({ nombre: nombre.trim() }).select().single();
                                      if (data) {
                                        setSubcategorias([...subcategorias, data]);
                                        setProductForm({...productForm, subcategorias_ids: [...productForm.subcategorias_ids, data.id]});
                                        setSubcatSearch("");
                                        setShowSubcatDropdown(false);
                                      }
                                    }
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-[#2d5a27] hover:bg-green-50 border-t-2 border-[#2d5a27] font-medium"
                                >
                                  <Plus size={14} className="inline mr-1" />
                                  Crear "{subcatSearch || "nueva subcategoría"}"
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Etiquetas */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Etiquetas</label>
                    <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                      {productForm.etiquetas_ids.map((etqId) => {
                        const etq = etiquetas.find(e => e.id === etqId);
                        return etq ? (
                          <span key={etqId} className="inline-flex items-center gap-1 px-3 py-1.5 text-white text-sm rounded-lg" style={{ backgroundColor: etq.color }}>
                            {etq.nombre}
                            <button onClick={() => setProductForm({...productForm, etiquetas_ids: productForm.etiquetas_ids.filter(id => id !== etqId)})} className="hover:opacity-70">
                              <X size={14} />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="relative">
                      <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          value={etqSearch}
                          onChange={(e) => {
                            setEtqSearch(e.target.value);
                            setShowEtqDropdown(true);
                          }}
                          onFocus={() => setShowEtqDropdown(true)}
                          placeholder="Buscar etiqueta o crear nueva..."
                          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" 
                        />
                      </div>
                      {showEtqDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                          {etiquetas
                            .filter(e => !etqSearch || e.nombre.toLowerCase().includes(etqSearch.toLowerCase()))
                            .length === 0 && !etqSearch ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">Escribí para buscar...</div>
                          ) : (
                            <>
                              {etiquetas
                                .filter(e => !etqSearch || e.nombre.toLowerCase().includes(etqSearch.toLowerCase()))
                                .map((etq) => (
                                  <button
                                    key={etq.id}
                                    onClick={() => {
                                      if (!productForm.etiquetas_ids.includes(etq.id)) {
                                        setProductForm({...productForm, etiquetas_ids: [...productForm.etiquetas_ids, etq.id]});
                                      }
                                      setEtqSearch("");
                                      setShowEtqDropdown(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                  >
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: etq.color }} />
                                    {etq.nombre}
                                  </button>
                                ))
                              }
                              {(!etqSearch || !etiquetas.some(e => e.nombre.toLowerCase() === etqSearch.toLowerCase())) && (
                                <button
                                  onClick={async () => {
                                    const nombre = etqSearch?.trim() || prompt("Nombre de la nueva etiqueta:");
                                    if (nombre?.trim()) {
                                      const colorAleatorio = COLORES_ETIQUETAS[Math.floor(Math.random() * COLORES_ETIQUETAS.length)];
                                      const { data } = await supabase.from("etiquetas").insert({ nombre: nombre.trim(), color: colorAleatorio }).select().single();
                                      if (data) {
                                        setEtiquetas([...etiquetas, data]);
                                        setProductForm({...productForm, etiquetas_ids: [...productForm.etiquetas_ids, data.id]});
                                        setEtqSearch("");
                                        setShowEtqDropdown(false);
                                      }
                                    }
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-[#2d5a27] hover:bg-green-50 border-t-2 border-[#2d5a27] font-medium"
                                >
                                  <Plus size={14} className="inline mr-1" />
                                  Crear "{etqSearch || "nueva etiqueta"}"
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Especies y Composición */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">4</span>
                  Especies y Composición
                </h3>
                <div className="space-y-4">
                  {/* Especies */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Especies de Destino</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {ESPECIES.map((esp) => (
                        <label key={esp} className={cn(
                          "flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition",
                          productForm.especies.includes(esp) 
                            ? "bg-[#2d5a27] text-white border-[#2d5a27]" 
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#2d5a27]"
                        )}>
                          <input type="checkbox" checked={productForm.especies.includes(esp)} onChange={() => {
                            const newEspecies = productForm.especies.includes(esp)
                              ? productForm.especies.filter(e => e !== esp)
                              : [...productForm.especies, esp];
                            setProductForm({...productForm, especies: newEspecies});
                          }} className="sr-only" />
                          <span className="text-sm font-medium capitalize">{esp}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Composición */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Drogas / Principios Activos</label>
                    <textarea value={productForm.drogas} onChange={(e) => setProductForm({...productForm, drogas: e.target.value})}
                      rows={3} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none" placeholder="Escribe cada droga en una línea diferente&#10;Ej.&#10;Eprinomectina 0,5g&#10;Flumetrina 2g" />
                  </div>

                  {/* Dosis */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Dosis Recomendada</label>
                    <textarea value={productForm.dosis} onChange={(e) => setProductForm({...productForm, dosis: e.target.value})}
                      rows={2} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none" placeholder="Dosis recomendada..." />
                  </div>

                  {/* Indicaciones */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Indicaciones</label>
                    <textarea value={productForm.indicaciones} onChange={(e) => setProductForm({...productForm, indicaciones: e.target.value})}
                      rows={2} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] resize-none" placeholder="Indicaciones del producto..." />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Imagen */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">5</span>
                  Imagen del Producto
                </h3>
                <div className="flex flex-col gap-3">
                  <input type="url" value={productForm.imagen} onChange={(e) => setProductForm({...productForm, imagen: e.target.value})}
                    placeholder="https://ejemplo.com/imagen.jpg (URL de imagen)"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                  <div className="flex items-center py-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium">o</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#f1f8e9] hover:border-[#2d5a27] transition group"
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-[#2d5a27]', 'bg-[#f1f8e9]'); }}
                    onDragLeave={(e) => { e.currentTarget.classList.remove('border-[#2d5a27]', 'bg-[#f1f8e9]'); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-[#2d5a27]', 'bg-[#f1f8e9]');
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (event) => setProductForm({...productForm, imagen: event.target?.result as string});
                        reader.readAsDataURL(file);
                      }
                    }}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => setProductForm({...productForm, imagen: event.target?.result as string});
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                  >
                    {productForm.imagen ? (
                      <div className="relative w-full">
                        <img src={productForm.imagen} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                        <p className="text-xs text-gray-500 mt-3">Hacé clic o arrastrá una imagen para cambiar</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#2d5a27] mb-3 transition">
                          <i className="fas fa-cloud-upload-alt text-2xl"></i>
                        </div>
                        <p className="text-base font-medium text-gray-600">Haz clic o arrastrá una imagen aquí</p>
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP hasta 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Información Adicional */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs flex items-center justify-center mr-2">6</span>
                  Información Adicional
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Link Externo</label>
                    <input type="url" value={productForm.link_externo} onChange={(e) => setProductForm({...productForm, link_externo: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" placeholder="https://www.laboratorio.com/producto" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <input type="checkbox" checked={productForm.visible} onChange={(e) => setProductForm({...productForm, visible: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27]" id="visible" />
                    <label htmlFor="visible" className="text-sm font-medium text-gray-700">Visible en tienda</label>
                  </div>
                </div>
              </div>

            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowProductModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition">Cancelar</button>
              <button onClick={handleSaveProduct} className="px-5 py-2.5 bg-[#2d5a27] hover:bg-[#1b5e20] text-white rounded-lg font-medium transition shadow-lg">Guardar Producto</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL BULK PRECIO */}
      {showBulkPriceModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowBulkPriceModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4">Aumentar Precios</h2>
            <p className="text-sm text-gray-600 mb-4">
              Se aumentará el precio de <strong>{selectedProductIds.length}</strong> productos seleccionados.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de aumento (%)</label>
              <input type="number" value={bulkPricePercent} onChange={(e) => setBulkPricePercent(e.target.value)}
                placeholder="Ej: 15"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowBulkPriceModal(false); setBulkPricePercent(""); }} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={handleBulkPriceIncrease} className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium">Aplicar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL BULK ETIQUETAS */}
      {showBulkLabelsModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => { setShowBulkLabelsModal(false); setBulkSelectedLabels([]); setBulkLabelsSearch(""); }} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Agregar Etiquetas</h2>
            <p className="text-sm text-gray-600 mb-4">
              Agregar etiquetas a <strong>{selectedProductIds.length}</strong> productos seleccionados.
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              {bulkSelectedLabels.map((labelId) => {
                const label = etiquetas.find(l => l.id === labelId);
                return label ? (
                  <span key={labelId} className="inline-flex items-center gap-1 px-3 py-1 text-white text-sm rounded-full" style={{ backgroundColor: label.color }}>
                    {label.nombre}
                    <button onClick={() => setBulkSelectedLabels(prev => prev.filter(id => id !== labelId))} className="hover:opacity-70">
                      <X size={14} />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={bulkLabelsSearch} onChange={(e) => setBulkLabelsSearch(e.target.value)}
                placeholder="Buscar etiqueta..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            </div>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl mb-4">
              {etiquetas.filter(e => 
                e.nombre.toLowerCase().includes(bulkLabelsSearch.toLowerCase()) && 
                !bulkSelectedLabels.includes(e.id)
              ).length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">No hay etiquetas disponibles</p>
              ) : (
                etiquetas.filter(e => 
                  e.nombre.toLowerCase().includes(bulkLabelsSearch.toLowerCase()) && 
                  !bulkSelectedLabels.includes(e.id)
                ).map((label) => (
                  <button key={label.id} onClick={() => setBulkSelectedLabels(prev => [...prev, label.id])}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100 last:border-b-0">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color }} />
                    <span className="text-sm">{label.nombre}</span>
                  </button>
                ))
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowBulkLabelsModal(false); setBulkSelectedLabels([]); setBulkLabelsSearch(""); }} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={handleBulkAddLabels} disabled={bulkSelectedLabels.length === 0}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium">Agregar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL BULK SUBCATEGORÍAS */}
      {showBulkSubcatsModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => { setShowBulkSubcatsModal(false); setBulkSelectedSubcats([]); setBulkSubcatsSearch(""); }} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Agregar Subcategorías</h2>
            <p className="text-sm text-gray-600 mb-4">
              Agregar subcategorías a <strong>{selectedProductIds.length}</strong> productos seleccionados.
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              {bulkSelectedSubcats.map((subcatId) => {
                const subcat = subcategorias.find(s => s.id === subcatId);
                return subcat ? (
                  <span key={subcatId} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full border border-green-200">
                    {subcat.nombre}
                    <button onClick={() => setBulkSelectedSubcats(prev => prev.filter(id => id !== subcatId))} className="hover:opacity-70">
                      <X size={14} />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={bulkSubcatsSearch} onChange={(e) => setBulkSubcatsSearch(e.target.value)}
                placeholder="Buscar subcategoría..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            </div>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl mb-4">
              {subcategorias.filter(s => 
                s.nombre.toLowerCase().includes(bulkSubcatsSearch.toLowerCase()) && 
                !bulkSelectedSubcats.includes(s.id)
              ).length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">No hay subcategorías disponibles</p>
              ) : (
                subcategorias.filter(s => 
                  s.nombre.toLowerCase().includes(bulkSubcatsSearch.toLowerCase()) && 
                  !bulkSelectedSubcats.includes(s.id)
                ).map((subcat) => {
                  const cat = categorias.find(c => c.id === subcat.categoria_id);
                  return (
                    <button key={subcat.id} onClick={() => setBulkSelectedSubcats(prev => [...prev, subcat.id])}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100 last:border-b-0">
                      <Layers size={16} className="text-gray-400" />
                      <span className="text-sm">{subcat.nombre}</span>
                      {cat && <span className="text-xs text-gray-400">({cat.nombre})</span>}
                    </button>
                  );
                })
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowBulkSubcatsModal(false); setBulkSelectedSubcats([]); setBulkSubcatsSearch(""); }} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={handleBulkAddSubcats} disabled={bulkSelectedSubcats.length === 0}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium">Agregar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL BULK ELIMINAR */}
      {showBulkDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => { setShowBulkDeleteModal(false); setBulkDeleteConfirm(""); }} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-6">
            <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar Productos</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-700 font-medium">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Esta acción no se puede deshacer.
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Se eliminarán <strong>{selectedProductIds.length}</strong> productos del catálogo.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Escribí <span className="font-bold text-red-600">ELIMINAR</span> para confirmar:
              </label>
              <input type="text" value={bulkDeleteConfirm} onChange={(e) => setBulkDeleteConfirm(e.target.value)}
                placeholder="ELIMINAR"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowBulkDeleteModal(false); setBulkDeleteConfirm(""); }} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={handleBulkDelete} disabled={bulkDeleteConfirm.toUpperCase() !== "ELIMINAR"}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium">Eliminar</button>
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

      {/* MODAL EDITAR SUBCATEGORÍA (Gestión de productos) */}
      {showEditSubCatModal && selectedSubcategory && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEditSubCatModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-4 md:bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">Editar Sub-Categoría</h2>
                <button onClick={() => { setEditSubCatName(selectedSubcategory.nombre); setShowEditSubCatNameModal(true); }} 
                  className="text-sm text-[#2d5a27] hover:underline mt-1">{selectedSubcategory.nombre} (clic para cambiar nombre)</button>
              </div>
              <button onClick={() => setShowEditSubCatModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Productos en esta sub-categoría</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-2">
                  {subcategoryProducts.length > 0 ? subcategoryProducts.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <button onClick={() => removeProductFromSubcategory(prod.id)} className="p-1 hover:bg-red-50 rounded text-red-500 ml-2">
                        <X size={16} />
                      </button>
                    </div>
                  )) : <p className="text-sm text-gray-400 text-center py-4">No hay productos en esta sub-categoría</p>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Agregar productos</h4>
                <input type="text" placeholder="Buscar productos..." value={subcatSearchTerm} onChange={(e) => setSubcatSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {productos.filter(p => 
                    p.titulo?.toLowerCase().includes(subcatSearchTerm.toLowerCase()) && 
                    !subcategoryProducts.find(sp => sp.id === p.id)
                  ).slice(0, 20).map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addProductToSubcategory(prod.id)}>
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <Plus size={16} className="text-[#2d5a27]" />
                    </div>
                  ))}
                  {productos.filter(p => p.titulo?.toLowerCase().includes(subcatSearchTerm.toLowerCase()) && !subcategoryProducts.find(sp => sp.id === p.id)).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay productos disponibles</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <button onClick={deleteSubcategoryAdvanced} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <Trash2 size={16} /> Eliminar
              </button>
              <button onClick={() => setShowEditSubCatModal(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR NOMBRE SUBCATEGORÍA */}
      {showEditSubCatNameModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowEditSubCatNameModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-[60] p-6">
            <h3 className="text-lg font-bold mb-4">Editar Nombre de Sub-Categoría</h3>
            <input type="text" value={editSubCatName} onChange={(e) => setEditSubCatName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowEditSubCatNameModal(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
              <button onClick={saveSubCatName} className="flex-1 px-4 py-2 bg-[#2d5a27] text-white rounded-lg hover:bg-[#1b5e20] transition">Guardar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR LABORATORIO (Gestión de productos) */}
      {showEditLabModal && selectedLab && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEditLabModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-4 md:bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">Editar Laboratorio</h2>
                <button onClick={() => { setEditLabName(selectedLab.nombre); setShowEditLabNameModal(true); }} 
                  className="text-sm text-[#2d5a27] hover:underline mt-1">{selectedLab.nombre} (clic para cambiar nombre)</button>
              </div>
              <button onClick={() => setShowEditLabModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Productos de este laboratorio</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-2">
                  {labProducts.length > 0 ? labProducts.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <button onClick={() => removeProductFromLab(prod.id)} className="p-1 hover:bg-red-50 rounded text-red-500 ml-2">
                        <X size={16} />
                      </button>
                    </div>
                  )) : <p className="text-sm text-gray-400 text-center py-4">No hay productos de este laboratorio</p>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Agregar productos</h4>
                <input type="text" placeholder="Buscar productos..." value={labSearchTerm} onChange={(e) => setLabSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {productos.filter(p => 
                    p.titulo?.toLowerCase().includes(labSearchTerm.toLowerCase()) && 
                    !labProducts.find(lp => lp.id === p.id)
                  ).slice(0, 20).map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addProductToLab(prod.id)}>
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <Plus size={16} className="text-[#2d5a27]" />
                    </div>
                  ))}
                  {productos.filter(p => p.titulo?.toLowerCase().includes(labSearchTerm.toLowerCase()) && !labProducts.find(lp => lp.id === p.id)).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay productos disponibles</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <button onClick={deleteLabAdvanced} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <Trash2 size={16} /> Eliminar
              </button>
              <button onClick={() => setShowEditLabModal(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR NOMBRE LABORATORIO */}
      {showEditLabNameModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowEditLabNameModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-[60] p-6">
            <h3 className="text-lg font-bold mb-4">Editar Nombre de Laboratorio</h3>
            <input type="text" value={editLabName} onChange={(e) => setEditLabName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowEditLabNameModal(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
              <button onClick={saveLabName} className="flex-1 px-4 py-2 bg-[#2d5a27] text-white rounded-lg hover:bg-[#1b5e20] transition">Guardar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR ETIQUETA (Gestión de productos) */}
      {showEditLabelModal && selectedLabel && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEditLabelModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-4 md:bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: selectedLabel.color }} />
                <div>
                  <h2 className="text-xl font-bold">Editar Etiqueta</h2>
                  <button onClick={() => setShowEditLabelNameModal(true)} 
                    className="text-sm text-[#2d5a27] hover:underline mt-1">{selectedLabel.nombre} (clic para editar)</button>
                </div>
              </div>
              <button onClick={() => setShowEditLabelModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Productos con esta etiqueta</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-2">
                  {labelProducts.length > 0 ? labelProducts.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <button onClick={() => removeProductFromLabel(prod.id)} className="p-1 hover:bg-red-50 rounded text-red-500 ml-2">
                        <X size={16} />
                      </button>
                    </div>
                  )) : <p className="text-sm text-gray-400 text-center py-4">No hay productos con esta etiqueta</p>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Agregar productos</h4>
                <input type="text" placeholder="Buscar productos..." value={labelSearchTerm} onChange={(e) => setLabelSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {productos.filter(p => 
                    p.titulo?.toLowerCase().includes(labelSearchTerm.toLowerCase()) && 
                    !labelProducts.find(lp => lp.id === p.id)
                  ).slice(0, 20).map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addProductToLabel(prod.id)}>
                      <span className="text-sm font-medium truncate flex-1">{prod.titulo}</span>
                      <Plus size={16} className="text-[#2d5a27]" />
                    </div>
                  ))}
                  {productos.filter(p => p.titulo?.toLowerCase().includes(labelSearchTerm.toLowerCase()) && !labelProducts.find(lp => lp.id === p.id)).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay productos disponibles</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <button onClick={deleteLabelAdvanced} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <Trash2 size={16} /> Eliminar
              </button>
              <button onClick={() => setShowEditLabelModal(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR NOMBRE/COLOR ETIQUETA */}
      {showEditLabelNameModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowEditLabelNameModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-[60] p-6">
            <h3 className="text-lg font-bold mb-4">Editar Etiqueta</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={editLabelName} onChange={(e) => setEditLabelName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORES_ETIQUETAS.map((color) => (
                    <button key={color} onClick={() => setEditLabelColor(color)}
                      className={cn("w-8 h-8 rounded-lg border-2", editLabelColor === color ? "border-gray-900 ring-2 ring-[#2d5a27]" : "border-white")}
                      style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditLabelNameModal(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
              <button onClick={saveLabelName} className="flex-1 px-4 py-2 bg-[#2d5a27] text-white rounded-lg hover:bg-[#1b5e20] transition">Guardar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR CATEGORÍA (Gestión de subcategorías) */}
      {showEditCatModal && selectedCategory && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEditCatModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-4 md:bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">Editar Categoría</h2>
                <button onClick={() => setShowEditCatNameModal(true)} 
                  className="text-sm text-[#2d5a27] hover:underline mt-1">{selectedCategory.nombre} (clic para cambiar nombre)</button>
              </div>
              <button onClick={() => setShowEditCatModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Subcategorías en esta categoría</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-2">
                  {categorySubcats.length > 0 ? categorySubcats.map((subcat) => (
                    <div key={subcat.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium truncate flex-1">{subcat.nombre}</span>
                      <button onClick={() => removeSubcategoryFromCategory(subcat.id)} className="p-1 hover:bg-red-50 rounded text-red-500 ml-2">
                        <X size={16} />
                      </button>
                    </div>
                  )) : <p className="text-sm text-gray-400 text-center py-4">No hay subcategorías en esta categoría</p>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Agregar subcategorías</h4>
                <input type="text" placeholder="Buscar subcategorías..." value={catSearchTerm} onChange={(e) => setCatSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {subcategorias.filter(s => 
                    s.nombre?.toLowerCase().includes(catSearchTerm.toLowerCase()) && 
                    s.categoria_id !== selectedCategory.id &&
                    !categorySubcats.find(cs => cs.id === s.id)
                  ).slice(0, 20).map((subcat) => (
                    <div key={subcat.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addSubcategoryToCategory(subcat.id)}>
                      <span className="text-sm font-medium truncate flex-1">{subcat.nombre}</span>
                      <Plus size={16} className="text-[#2d5a27]" />
                    </div>
                  ))}
                  {subcategorias.filter(s => s.nombre?.toLowerCase().includes(catSearchTerm.toLowerCase()) && s.categoria_id !== selectedCategory.id && !categorySubcats.find(cs => cs.id === s.id)).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay subcategorías disponibles</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <button onClick={deleteCategoryAdvanced} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <Trash2 size={16} /> Eliminar
              </button>
              <button onClick={() => setShowEditCatModal(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* MODAL EDITAR NOMBRE CATEGORÍA */}
      {showEditCatNameModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowEditCatNameModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-[60] p-6">
            <h3 className="text-lg font-bold mb-4">Editar Nombre de Categoría</h3>
            <input type="text" value={editCatName} onChange={(e) => setEditCatName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27]" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowEditCatNameModal(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
              <button onClick={saveCategoryName} className="flex-1 px-4 py-2 bg-[#2d5a27] text-white rounded-lg hover:bg-[#1b5e20] transition">Guardar</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
