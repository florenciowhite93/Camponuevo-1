"use client";

import { useState, useEffect } from "react";
import { X, Save, Edit2, Eye, EyeOff, GripVertical, Plus, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Banner {
  id: string;
  titulo: string;
  subtitulo: string;
  imagen_url: string;
  texto_boton: string;
  enlace_boton: string;
  activa: boolean;
  orden: number;
}

interface Categoria {
  id: string;
  nombre: string;
  icono_svg: string;
  visible_home: boolean;
  orden: number;
}

interface Producto {
  id: string;
  titulo: string;
  imagen: string;
}

export function HomeEditor() {
  const [activeTab, setActiveTab] = useState<"banner" | "categorias" | "productos">("banner");
  const [banner, setBanner] = useState<Banner | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productosMes, setProductosMes] = useState<Producto[]>([]);
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBanner, setEditingBanner] = useState(false);
  const [editingIcon, setEditingIcon] = useState<{ id: string; svg: string } | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bannerRes, categoriasRes, productosRes, productosMesRes] = await Promise.all([
        supabase.from("banner_home").select("*").eq("activa", true).order("orden").limit(1).single(),
        supabase.from("categorias").select("*").order("orden"),
        supabase.from("productos").select("id, titulo, imagen").eq("visible", true).order("titulo"),
        supabase.from("productos_mes").select("*, productos(id, titulo, imagen)").order("orden"),
      ]);

      if (bannerRes.data) setBanner(bannerRes.data);
      if (categoriasRes.data) setCategorias(categoriasRes.data);
      if (productosRes.data) setAllProducts(productosRes.data);
      if (productosMesRes.data) {
        const prods = productosMesRes.data.map((p: any) => p.productos).filter(Boolean);
        setProductosMes(prods);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBanner = async () => {
    if (!banner) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("banner_home")
        .upsert({ ...banner, updated_at: new Date().toISOString() });
      if (error) throw error;
      setEditingBanner(false);
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategoriaVisible = async (categoria: Categoria) => {
    const newValue = !categoria.visible_home;
    setCategorias(prev => prev.map(c => c.id === categoria.id ? { ...c, visible_home: newValue } : c));
    
    await supabase
      .from("categorias")
      .update({ visible_home: newValue })
      .eq("id", categoria.id);
  };

  const updateCategoriaNombre = async (categoria: Categoria, newNombre: string) => {
    setCategorias(prev => prev.map(c => c.id === categoria.id ? { ...c, nombre: newNombre } : c));
    
    await supabase
      .from("categorias")
      .update({ nombre: newNombre })
      .eq("id", categoria.id);
  };

  const updateCategoriaIcono = async (categoriaId: string, newSvg: string) => {
    setCategorias(prev => prev.map(c => c.id === categoriaId ? { ...c, icono_svg: newSvg } : c));
    setEditingIcon(null);
    
    await supabase
      .from("categorias")
      .update({ icono_svg: newSvg })
      .eq("id", categoriaId);
  };

  const reorderCategorias = async (newOrder: Categoria[]) => {
    setCategorias(newOrder);
    for (let i = 0; i < newOrder.length; i++) {
      await supabase
        .from("categorias")
        .update({ orden: i })
        .eq("id", newOrder[i].id);
    }
  };

  const addProductoMes = async (producto: Producto) => {
    if (productosMes.find(p => p.id === producto.id)) return;
    
    setProductosMes(prev => [...prev, producto]);
    await supabase
      .from("productos_mes")
      .insert({ producto_id: producto.id, orden: productosMes.length });
  };

  const removeProductoMes = async (productoId: string) => {
    setProductosMes(prev => prev.filter(p => p.id !== productoId));
    await supabase
      .from("productos_mes")
      .delete()
      .eq("producto_id", productoId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a27]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b">
        {[
          { id: "banner" as const, label: "Banner" },
          { id: "categorias" as const, label: "Categorías" },
          { id: "productos" as const, label: "Productos del Mes" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 font-medium border-b-2 transition",
              activeTab === tab.id
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "banner" && (
        <BannerEditor
          banner={banner}
          setBanner={setBanner}
          editing={editingBanner}
          setEditing={setEditingBanner}
          onSave={saveBanner}
          saving={saving}
        />
      )}

      {activeTab === "categorias" && (
        <CategoriasEditor
          categorias={categorias}
          onToggle={toggleCategoriaVisible}
          onUpdateNombre={updateCategoriaNombre}
          onUpdateIcono={updateCategoriaIcono}
          onReorder={reorderCategorias}
          editingIcon={editingIcon}
          setEditingIcon={setEditingIcon}
        />
      )}

      {activeTab === "productos" && (
        <ProductosEditor
          productosMes={productosMes}
          allProducts={allProducts}
          showSelector={showProductSelector}
          setShowSelector={setShowProductSelector}
          onAdd={addProductoMes}
          onRemove={removeProductoMes}
        />
      )}
    </div>
  );
}

function BannerEditor({
  banner,
  setBanner,
  editing,
  setEditing,
  onSave,
  saving,
}: {
  banner: Banner | null;
  setBanner: (b: Banner) => void;
  editing: boolean;
  setEditing: (e: boolean) => void;
  onSave: () => void;
  saving: boolean;
}) {
  if (!banner && !editing) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <p className="text-gray-500 mb-4">No hay banner configurado</p>
        <button
          onClick={() => {
            setBanner({
              id: "",
              titulo: "Bienvenido a CampoNuevo",
              subtitulo: "Productos de calidad para tu campo",
              imagen_url: "https://images.unsplash.com/photo-1603350514202-7091b5b1c2d9?w=1920&q=80",
              texto_boton: "Ver Catálogo",
              enlace_boton: "/catalogo",
              activa: true,
              orden: 0,
            });
            setEditing(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Crear Banner
        </button>
      </div>
    );
  }

  const currentBanner = banner || {
    id: "",
    titulo: "",
    subtitulo: "",
    imagen_url: "",
    texto_boton: "Ver más",
    enlace_boton: "/catalogo",
    activa: true,
    orden: 0,
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Banner Principal</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Edit2 size={16} />
          {editing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={currentBanner.titulo}
              onChange={(e) => setBanner({ ...currentBanner, titulo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input
              type="text"
              value={currentBanner.subtitulo}
              onChange={(e) => setBanner({ ...currentBanner, subtitulo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
            <input
              type="url"
              value={currentBanner.imagen_url}
              onChange={(e) => setBanner({ ...currentBanner, imagen_url: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Botón</label>
              <input
                type="text"
                value={currentBanner.texto_boton}
                onChange={(e) => setBanner({ ...currentBanner, texto_boton: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enlace del Botón</label>
              <input
                type="text"
                value={currentBanner.enlace_boton}
                onChange={(e) => setBanner({ ...currentBanner, enlace_boton: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              {saving ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> : <Save size={16} />}
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={currentBanner.imagen_url}
            alt="Banner"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{currentBanner.titulo}</h2>
              <p className="text-lg mb-4">{currentBanner.subtitulo}</p>
              <a
                href={currentBanner.enlace_boton}
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
              >
                {currentBanner.texto_boton}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriasEditor({
  categorias,
  onToggle,
  onUpdateNombre,
  onUpdateIcono,
  onReorder,
  editingIcon,
  setEditingIcon,
}: {
  categorias: Categoria[];
  onToggle: (c: Categoria) => void;
  onUpdateNombre: (c: Categoria, n: string) => void;
  onUpdateIcono: (id: string, svg: string) => void;
  onReorder: (c: Categoria[]) => void;
  editingIcon: { id: string; svg: string } | null;
  setEditingIcon: (e: { id: string; svg: string } | null) => void;
}) {
  const moveCategoria = (index: number, direction: "up" | "down") => {
    const newOrder = [...categorias];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    onReorder(newOrder);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-bold mb-6">Categorías en Home</h3>
      <div className="space-y-3">
        {categorias.map((cat, index) => (
          <div
            key={cat.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border transition",
              cat.visible_home ? "bg-white" : "bg-gray-50 opacity-60"
            )}
          >
            <div className="text-gray-400 cursor-move">
              <GripVertical size={20} />
            </div>
            <button
              onClick={() => moveCategoria(index, "up")}
              disabled={index === 0}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              ↑
            </button>
            <button
              onClick={() => moveCategoria(index, "down")}
              disabled={index === categorias.length - 1}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              ↓
            </button>
            <button
              onClick={() => setEditingIcon({ id: cat.id, svg: cat.icono_svg })}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50"
            >
              {cat.icono_svg ? (
                <div dangerouslySetInnerHTML={{ __html: cat.icono_svg }} className="w-6 h-6 text-green-700" />
              ) : (
                <span className="text-green-700">🌿</span>
              )}
            </button>
            <input
              type="text"
              value={cat.nombre}
              onChange={(e) => onUpdateNombre(cat, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => onToggle(cat)}
              className={cn(
                "p-2 rounded-lg transition",
                cat.visible_home ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
              )}
              title={cat.visible_home ? "Visible en home" : "Oculto"}
            >
              {cat.visible_home ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Los cambios se guardan automáticamente. Usa ↑↓ para reordenar.
      </p>

      {editingIcon && (
        <IconEditorModal
          svg={editingIcon.svg}
          onSave={(svg) => onUpdateIcono(editingIcon.id, svg)}
          onClose={() => setEditingIcon(null)}
        />
      )}
    </div>
  );
}

function IconEditorModal({ svg, onSave, onClose }: { svg: string; onSave: (s: string) => void; onClose: () => void }) {
  const [svgCode, setSvgCode] = useState(svg);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Editar Icono SVG</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Código SVG</label>
            <textarea
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              className="w-full h-32 px-4 py-3 font-mono text-sm bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500"
              placeholder="<svg viewBox='0 0 24 24' ...>"
            />
          </div>
          <div className="flex items-center justify-center h-16 bg-gray-50 rounded-xl">
            {svgCode ? (
              <div className="w-12 h-12 text-green-700" dangerouslySetInnerHTML={{ __html: svgCode }} />
            ) : (
              <span className="text-gray-400">Sin icono</span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t">
          <button onClick={onClose} className="px-6 py-3 border rounded-xl hover:bg-gray-100">
            Cancelar
          </button>
          <button onClick={() => onSave(svgCode)} className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductosEditor({
  productosMes,
  allProducts,
  showSelector,
  setShowSelector,
  onAdd,
  onRemove,
}: {
  productosMes: Producto[];
  allProducts: Producto[];
  showSelector: boolean;
  setShowSelector: (s: boolean) => void;
  onAdd: (p: Producto) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Productos del Mes</h3>
        <button
          onClick={() => setShowSelector(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>

      {productosMes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay productos seleccionados</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productosMes.map((producto) => (
            <div key={producto.id} className="relative group">
              <div className="bg-gray-50 rounded-xl p-4">
                <img
                  src={producto.imagen || "/placeholder.png"}
                  alt={producto.titulo}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <p className="font-medium text-sm truncate">{producto.titulo}</p>
              </div>
              <button
                onClick={() => onRemove(producto.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showSelector && (
        <ProductSelector
          products={allProducts}
          selected={productosMes}
          onAdd={onAdd}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
}

function ProductSelector({
  products,
  selected,
  onAdd,
  onClose,
}: {
  products: Producto[];
  selected: Producto[];
  onAdd: (p: Producto) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const selectedIds = selected.map((p) => p.id);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Seleccionar Productos</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((producto) => {
              const isSelected = selectedIds.includes(producto.id);
              return (
                <button
                  key={producto.id}
                  onClick={() => !isSelected && onAdd(producto)}
                  disabled={isSelected}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition text-left",
                    isSelected
                      ? "bg-green-50 border-green-300 opacity-50"
                      : "hover:border-green-400"
                  )}
                >
                  <img
                    src={producto.imagen || "/placeholder.png"}
                    alt={producto.titulo}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <span className="flex-1 text-sm font-medium truncate">{producto.titulo}</span>
                  {isSelected && <Check size={18} className="text-green-600" />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
