"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Check, ChevronDown, GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { IconPicker } from "@/components/admin/IconPicker";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SubcategoriaSelector } from "@/components/admin/SubcategoriaSelector";
import type { Categoria, ProductosConfig } from "@/types";

const supabase = createClient();

interface CategoriaItem {
  id: string;
  nombre: string;
  icono_svg: string;
  subcategorias?: { id: string; nombre: string }[];
}

interface SortableCategoriaItemProps {
  cat: CategoriaItem;
  isSelected: boolean;
  onToggle: () => void;
  onEditIcon: () => void;
}

function SortableCategoriaItem({ cat, isSelected, onToggle, onEditIcon }: SortableCategoriaItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition",
        isDragging ? "ring-2 ring-green-500 shadow-lg" : "",
        isSelected ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-gray-100 p-1 rounded"
      >
        <GripVertical size={20} className="text-gray-400" />
      </button>

      <button
        onClick={onToggle}
        className={cn(
          "w-6 h-6 rounded border-2 flex items-center justify-center transition",
          isSelected ? "bg-green-600 border-green-600" : "border-gray-300"
        )}
      >
        {isSelected && <Check size={14} className="text-white" />}
      </button>

      <button
        onClick={onEditIcon}
        className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:border-green-400 transition overflow-hidden"
      >
        {cat.icono_svg ? (
          <img src={cat.icono_svg} alt={cat.nombre} className="w-7 h-7 object-contain" />
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
}

export function LandingEditor() {
  const [categorias, setCategorias] = useState<CategoriaItem[]>([]);
  const [productosConfig, setProductosConfig] = useState<ProductosConfig>({
    titulo: "Productos Destacados",
    descripcion: "Los más elegidos por nuestros clientes",
    subcategorias_ids: [],
    productos_ids: [],
    max_productos: 8,
  });
  const [categoriasTitulo, setCategoriasTitulo] = useState("Nuestras Categorías");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingIcon, setEditingIcon] = useState<{ id: string; svg: string; nombre: string } | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [ordenesActualizados, setOrdenesActualizados] = useState<Record<string, number>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categorias.findIndex(c => c.id === active.id);
    const newIndex = categorias.findIndex(c => c.id === over.id);
    
    const newOrden = arrayMove(categorias, oldIndex, newIndex);
    setCategorias(newOrden);

    const nuevosOrdenes: Record<string, number> = {};
    newOrden.forEach((cat, idx) => {
      nuevosOrdenes[cat.id] = idx;
    });
    setOrdenesActualizados(nuevosOrdenes);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriasRes, seccionesRes] = await Promise.all([
        supabase.from("categorias").select("*, subcategorias(id, nombre)").order("orden"),
        supabase.from("secciones_landing").select("*").in("tipo", ["categorias", "productos"]).order("orden"),
      ]);

      console.log("[loadData] Secciones from DB:", JSON.stringify(seccionesRes.data, null, 2));

      let newCategoriasTitulo = "Nuestras Categorías";
      let newCategoriasSeleccionadas: string[] = [];
      let newProductosConfig: ProductosConfig = {
        titulo: "Productos Destacados",
        descripcion: "Los más elegidos por nuestros clientes",
        subcategorias_ids: [],
        productos_ids: [],
        max_productos: 8,
      };

      if (seccionesRes.data && seccionesRes.data.length > 0) {
        seccionesRes.data.forEach((seccion) => {
          const cfg = seccion.config as any;
          if (seccion.tipo === "categorias") {
            newCategoriasTitulo = cfg?.titulo || "Nuestras Categorías";
            newCategoriasSeleccionadas = cfg?.categorias_ids || [];
          }
          if (seccion.tipo === "productos") {
            newProductosConfig = {
              titulo: cfg?.titulo || "Productos Destacados",
              descripcion: cfg?.descripcion || "Los más elegidos por nuestros clientes",
              subcategorias_ids: cfg?.subcategorias_ids || [],
              productos_ids: cfg?.productos_ids || [],
              max_productos: cfg?.max_productos || 8,
            };
          }
        });
      }

      console.log("[loadData] Setting productosConfig:", JSON.stringify(newProductosConfig, null, 2));

      setCategorias(categoriasRes.data || []);
      setCategoriasTitulo(newCategoriasTitulo);
      setCategoriasSeleccionadas(newCategoriasSeleccionadas);
      setProductosConfig(newProductosConfig);
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
    setSaving(true);
    setSaveMessage(null);

    try {
      console.log("=== SAVE CONFIG START ===");
      console.log("Saving productosConfig:", JSON.stringify(productosConfig, null, 2));

      const seccionesRes = await supabase
        .from("secciones_landing")
        .select("id, tipo")
        .in("tipo", ["categorias", "productos"]);

      console.log("Secciones found:", seccionesRes.data);

      if (seccionesRes.error) {
        console.error("Error fetching secciones:", seccionesRes.error);
        throw new Error(seccionesRes.error.message);
      }

      const existentes = seccionesRes.data || [];
      const productoExistente = existentes.find((s) => s.tipo === "productos");

      console.log("Producto existente:", productoExistente);

      if (!productoExistente) {
        console.warn("No se encontró sección de productos para actualizar");
        setSaveMessage({ type: "error", text: "No se encontró la sección de productos. Crea una desde el Editor Landing." });
        setSaving(false);
        return;
      }

      const now = new Date().toISOString();
      const updateData = {
        titulo: productosConfig.titulo,
        config: productosConfig,
        updated_at: now,
      };

      console.log("Updating with data:", JSON.stringify(updateData, null, 2));

      const { data, error } = await supabase
        .from("secciones_landing")
        .update(updateData)
        .eq("id", productoExistente.id)
        .select();

      console.log("Update result - data:", data, "error:", error);

      if (error) {
        console.error("Error updating productos section:", error);
        throw error;
      }

      if (Object.keys(ordenesActualizados).length > 0) {
        console.log("Updating category orders:", ordenesActualizados);
        const updates = Object.entries(ordenesActualizados).map(([id, orden]) =>
          supabase.from("categorias").update({ orden }).eq("id", id)
        );
        await Promise.all(updates);
        setOrdenesActualizados({});
      }

      console.log("=== SAVE CONFIG SUCCESS ===");
      setSaveMessage({ type: "success", text: "Cambios guardados correctamente" });
      
      // Recargar datos después de guardar
      await loadData();
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage({ type: "error", text: `Error al guardar: ${error instanceof Error ? error.message : "Unknown error"}` });
    } finally {
      setSaving(false);
    }
  };

  const toggleCategoria = (categoriaId: string) => {
    const newIds = categoriasSeleccionadas.includes(categoriaId)
      ? categoriasSeleccionadas.filter((id) => id !== categoriaId)
      : [...categoriasSeleccionadas, categoriaId];
    setCategoriasSeleccionadas(newIds);
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

    await supabase
      .from("categorias")
      .update({ icono_svg: "", updated_at: new Date().toISOString() })
      .eq("id", categoriaId);
  };

  const handleProductosConfigChange = (newConfig: ProductosConfig) => {
    setProductosConfig(newConfig);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a27]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Sección de Categorías</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título de la sección
          </label>
          <input
            type="text"
            value={categoriasTitulo}
            onChange={(e) => setCategoriasTitulo(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <h3 className="text-sm font-semibold text-gray-600 mb-4">Categorías (drag para reordenar, click para seleccionar)</h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={categorias.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {categorias.map((cat) => {
                const isSelected = categoriasSeleccionadas.includes(cat.id);
                return (
                  <SortableCategoriaItem
                    key={cat.id}
                    cat={cat}
                    isSelected={isSelected}
                    onToggle={() => toggleCategoria(cat.id)}
                    onEditIcon={() => setEditingIcon({ id: cat.id, svg: cat.icono_svg, nombre: cat.nombre })}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Sección de Productos Destacados</h2>
        
        <SubcategoriaSelector
          config={productosConfig}
          onChange={handleProductosConfigChange}
        />
      </div>

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
            <X size={24} />
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
