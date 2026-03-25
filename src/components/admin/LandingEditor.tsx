"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { IconPicker } from "@/components/admin/IconPicker";

const supabase = createClient();

interface Categoria {
  id: string;
  nombre: string;
  icono_svg: string;
  subcategorias?: { id: string; nombre: string }[];
}

interface HomeConfig {
  categorias_seccion: {
    titulo: string;
    categorias_ids: string[];
  };
  productos_seccion: {
    titulo: string;
    subcategoria_id: string;
  };
}

export function LandingEditor() {
  const [config, setConfig] = useState<HomeConfig | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<{ id: string; nombre: string; categoria_nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingIcon, setEditingIcon] = useState<{ id: string; svg: string; nombre: string } | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriasRes, subcategoriasRes] = await Promise.all([
        supabase.from("categorias").select("*, subcategorias(id, nombre)").order("orden"),
        supabase.from("subcategorias").select("*, categoria:categorias(nombre)").order("nombre"),
      ]);

      const seccionesRes = await supabase
        .from("secciones_landing")
        .select("*")
        .in("tipo", ["categorias", "productos"])
        .order("orden");

      if (categoriasRes.data) setCategorias(categoriasRes.data);
      if (subcategoriasRes.data) setSubcategorias(subcategoriasRes.data);

      if (seccionesRes.data && seccionesRes.data.length > 0) {
        const configObj: HomeConfig = {
          categorias_seccion: { titulo: "Nuestras Categorías", categorias_ids: [] },
          productos_seccion: { titulo: "Catálogo Productos Destacados", subcategoria_id: "" },
        };

        seccionesRes.data.forEach((seccion) => {
          const cfg = seccion.config as any;
          if (seccion.tipo === "categorias") {
            configObj.categorias_seccion = {
              titulo: cfg?.titulo || "Nuestras Categorías",
              categorias_ids: cfg?.categorias_ids || [],
            };
          }
          if (seccion.tipo === "productos") {
            configObj.productos_seccion = {
              titulo: cfg?.titulo || "Catálogo Productos Destacados",
              subcategoria_id: cfg?.subcategorias_ids?.[0] || cfg?.subcategoria_id || "",
            };
          }
        });

        setConfig(configObj);
      } else {
        setConfig({
          categorias_seccion: { titulo: "Nuestras Categorías", categorias_ids: [] },
          productos_seccion: { titulo: "Catálogo Productos Destacados", subcategoria_id: "" },
        });
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveConfig = async () => {
    if (!config) return;
    setSaving(true);
    setSaveMessage(null);

    try {
      const seccionesRes = await supabase
        .from("secciones_landing")
        .select("id, tipo")
        .in("tipo", ["categorias", "productos"]);

      const existentes = seccionesRes.data || [];
      const categoriaExistente = existentes.find((s) => s.tipo === "categorias");
      const productoExistente = existentes.find((s) => s.tipo === "productos");

      const now = new Date().toISOString();

      if (categoriaExistente) {
        const { error } = await supabase
          .from("secciones_landing")
          .update({
            titulo: config.categorias_seccion.titulo,
            config: {
              titulo: config.categorias_seccion.titulo,
              categorias_ids: config.categorias_seccion.categorias_ids,
            },
            updated_at: now,
          })
          .eq("id", categoriaExistente.id);

        if (error) throw error;
      } else {
        await supabase.from("secciones_landing").insert({
          tipo: "categorias",
          titulo: config.categorias_seccion.titulo,
          activa: true,
          orden: 1,
          config: {
            titulo: config.categorias_seccion.titulo,
            categorias_ids: config.categorias_seccion.categorias_ids,
          },
        });
      }

      if (productoExistente) {
        const { error } = await supabase
          .from("secciones_landing")
          .update({
            titulo: config.productos_seccion.titulo,
            config: {
              titulo: config.productos_seccion.titulo,
              subcategorias_ids: config.productos_seccion.subcategoria_id
                ? [config.productos_seccion.subcategoria_id]
                : [],
            },
            updated_at: now,
          })
          .eq("id", productoExistente.id);

        if (error) throw error;
      } else {
        await supabase.from("secciones_landing").insert({
          tipo: "productos",
          titulo: config.productos_seccion.titulo,
          activa: true,
          orden: 2,
          config: {
            titulo: config.productos_seccion.titulo,
            subcategorias_ids: config.productos_seccion.subcategoria_id
              ? [config.productos_seccion.subcategoria_id]
              : [],
          },
        });
      }

      setSaveMessage({ type: "success", text: "Cambios guardados correctamente" });
      await loadData();
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage({ type: "error", text: "Error al guardar los cambios" });
    } finally {
      setSaving(false);
    }
  };

  const toggleCategoria = (categoriaId: string) => {
    if (!config) return;
    const ids = config.categorias_seccion.categorias_ids;
    const newIds = ids.includes(categoriaId)
      ? ids.filter((id) => id !== categoriaId)
      : [...ids, categoriaId];
    setConfig({
      ...config,
      categorias_seccion: { ...config.categorias_seccion, categorias_ids: newIds },
    });
  };

  const updateCategoriaIcono = async (categoriaId: string, newUrl: string) => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaId ? { ...c, icono_svg: newUrl } : c))
    );
    setEditingIcon(null);

    const { error } = await supabase
      .from("categorias")
      .update({ icono_svg: newUrl, updated_at: new Date().toISOString() })
      .eq("id", categoriaId);

    if (error) {
      console.error("Error updating icono:", error);
      setSaveMessage({ type: "error", text: "Error al guardar el icono" });
    } else {
      setSaveMessage({ type: "success", text: "Icono guardado correctamente" });
    }
  };

  const clearCategoriaIcono = async (categoriaId: string) => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaId ? { ...c, icono_svg: "" } : c))
    );
    setEditingIcon(null);

    const { error } = await supabase
      .from("categorias")
      .update({ icono_svg: "", updated_at: new Date().toISOString() })
      .eq("id", categoriaId);

    if (error) {
      console.error("Error clearing icono:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a27]"></div>
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="space-y-8">
      {/* Mensaje de estado */}
      {saveMessage && (
        <div
          className={cn(
            "p-4 rounded-xl text-sm font-medium",
            saveMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {saveMessage.text}
        </div>
      )}

      {/* Categorías Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título de la sección
          </label>
          <input
            type="text"
            value={config.categorias_seccion.titulo}
            onChange={(e) =>
              setConfig({
                ...config,
                categorias_seccion: { ...config.categorias_seccion, titulo: e.target.value },
              })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <h3 className="text-lg font-semibold mb-4">Categorías</h3>
        <div className="space-y-2">
          {categorias.map((cat) => {
            const isSelected = config.categorias_seccion.categorias_ids.includes(cat.id);
            return (
              <div
                key={cat.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition",
                  isSelected ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                )}
              >
                <button
                  onClick={() => toggleCategoria(cat.id)}
                  className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center transition",
                    isSelected ? "bg-green-600 border-green-600" : "border-gray-300"
                  )}
                >
                  {isSelected && <Check size={14} className="text-white" />}
                </button>

                <button
                  onClick={() => setEditingIcon({ id: cat.id, svg: cat.icono_svg, nombre: cat.nombre })}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:border-green-400 transition"
                >
                  {cat.icono_svg ? (
                    <div dangerouslySetInnerHTML={{ __html: cat.icono_svg }} className="w-7 h-7 text-green-700" />
                  ) : (
                    <span className="text-lg">🌿</span>
                  )}
                </button>

                <span className="flex-1 font-medium">{cat.nombre}</span>
                <span className="text-sm text-gray-400">
                  {cat.subcategorias?.length || 0} subcategorías
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Productos Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título de la sección
          </label>
          <input
            type="text"
            value={config.productos_seccion.titulo}
            onChange={(e) =>
              setConfig({
                ...config,
                productos_seccion: { ...config.productos_seccion, titulo: e.target.value },
              })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <h3 className="text-lg font-semibold mb-4">Subcategoría de productos</h3>
        <div className="relative">
          <select
            value={config.productos_seccion.subcategoria_id}
            onChange={(e) =>
              setConfig({
                ...config,
                productos_seccion: { ...config.productos_seccion, subcategoria_id: e.target.value },
              })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
          >
            <option value="">Sin subcategoría (mostrar todos)</option>
            {subcategorias.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.categoria_nombre} → {sub.nombre}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveConfig}
        disabled={saving}
        className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Guardando...
          </>
        ) : (
          <>
            <Save size={20} />
            Guardar Cambios
          </>
        )}
      </button>

      {/* Icon Editor Modal */}
      {editingIcon && (
        <IconEditorModal
          nombre={editingIcon.nombre}
          svg={editingIcon.svg}
          onSave={(svg) => updateCategoriaIcono(editingIcon.id, svg)}
          onClear={() => clearCategoriaIcono(editingIcon.id)}
          onClose={() => setEditingIcon(null)}
        />
      )}
    </div>
  );
}

function IconEditorModal({
  nombre,
  svg,
  onSave,
  onClear,
  onClose,
}: {
  nombre: string;
  svg: string;
  onSave: (s: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [svgCode, setSvgCode] = useState(svg);

  const handleSave = () => {
    onSave(svgCode);
  };

  const handleClear = () => {
    setSvgCode("");
    onClear();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Icono: {nombre}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-6">
          <IconPicker 
            value={svgCode} 
            onChange={setSvgCode}
            onClear={handleClear}
          />
        </div>
        <div className="flex justify-end gap-3 p-6 border-t">
          <button onClick={onClose} className="px-6 py-3 border rounded-xl hover:bg-gray-100">
            Cerrar
          </button>
          <button onClick={handleSave} className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
