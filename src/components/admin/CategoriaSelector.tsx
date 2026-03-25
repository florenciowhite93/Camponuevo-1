"use client";

import { useState, useEffect, useCallback } from "react";
import { X, GripVertical, Check, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Categoria, CategoriasConfig } from "@/types";

const supabase = createClient();

interface CategoriaSelectorProps {
  config: CategoriasConfig;
  onChange: (config: CategoriasConfig) => void;
}

export function CategoriaSelector({ config, onChange }: CategoriaSelectorProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIcon, setEditingIcon] = useState<{ id: string; svg: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCategorias = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("categorias")
      .select("*")
      .order("orden", { ascending: true });
    setCategorias(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  const selectedIds = config.categorias.map((c) => c.categoria_id);
  const selectedCategorias = config.categorias.map((c) => {
    const cat = categorias.find((categoria) => categoria.id === c.categoria_id);
    return { ...c, nombre: cat?.nombre || c.nombre, icono_svg: cat?.icono_svg || c.icono_svg };
  });

  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategoria = (categoria: Categoria) => {
    const exists = config.categorias.find((c) => c.categoria_id === categoria.id);
    if (exists) {
      onChange({
        ...config,
        categorias: config.categorias.filter((c) => c.categoria_id !== categoria.id),
      });
    } else {
      onChange({
        ...config,
        categorias: [
          ...config.categorias,
          {
            categoria_id: categoria.id,
            nombre: categoria.nombre,
            icono_svg: categoria.icono_svg || "",
          },
        ],
      });
    }
  };

  const removeCategoria = (categoriaId: string) => {
    onChange({
      ...config,
      categorias: config.categorias.filter((c) => c.categoria_id !== categoriaId),
    });
  };

  const updateIcon = async (categoriaId: string, newSvg: string) => {
    await supabase.from("categorias").update({ icono_svg: newSvg }).eq("id", categoriaId);
    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaId ? { ...c, icono_svg: newSvg } : c))
    );
    onChange({
      ...config,
      categorias: config.categorias.map((c) =>
        c.categoria_id === categoriaId ? { ...c, icono_svg: newSvg } : c
      ),
    });
    setEditingIcon(null);
  };

  const moveCategoria = (index: number, direction: "up" | "down") => {
    const newCategorias = [...config.categorias];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCategorias.length) return;
    [newCategorias[index], newCategorias[targetIndex]] = [newCategorias[targetIndex], newCategorias[index]];
    onChange({ ...config, categorias: newCategorias });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título de la sección
        </label>
        <input
          type="text"
          value={config.titulo}
          onChange={(e) => onChange({ ...config, titulo: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <input
          type="text"
          value={config.descripcion}
          onChange={(e) => onChange({ ...config, descripcion: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Categorías seleccionadas ({config.categorias.length})
        </h3>
        {config.categorias.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Sin categorías seleccionadas</p>
        ) : (
          <div className="space-y-2">
            {config.categorias.map((cat, index) => (
              <div
                key={cat.categoria_id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl"
              >
                <GripVertical size={16} className="text-gray-400 cursor-grab" />
                <div
                  className="w-8 h-8 flex items-center justify-center text-green-700"
                  dangerouslySetInnerHTML={{ __html: cat.icono_svg || "" }}
                />
                <span className="flex-1 font-medium">{cat.nombre}</span>
                <button
                  onClick={() => moveCategoria(index, "up")}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveCategoria(index, "down")}
                  disabled={index === config.categorias.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => setEditingIcon({ id: cat.categoria_id, svg: cat.icono_svg })}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Editar icono"
                >
                  <Edit2 size={14} className="text-gray-500" />
                </button>
                <button
                  onClick={() => removeCategoria(cat.categoria_id)}
                  className="p-1 hover:bg-red-50 rounded"
                >
                  <X size={14} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Agregar categorías</h3>
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {loading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredCategorias.map((categoria) => {
              const isSelected = selectedIds.includes(categoria.id);
              return (
                <button
                  key={categoria.id}
                  onClick={() => toggleCategoria(categoria)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border transition",
                    isSelected
                      ? "bg-green-50 border-green-300"
                      : "bg-white border-gray-200 hover:border-green-400"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg",
                      isSelected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    )}
                    dangerouslySetInnerHTML={{ __html: categoria.icono_svg || "" }}
                  />
                  <span className="flex-1 text-left font-medium">{categoria.nombre}</span>
                  {isSelected && <Check size={18} className="text-green-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {editingIcon && (
        <IconEditorModal
          svg={editingIcon.svg}
          onSave={(newSvg) => updateIcon(editingIcon.id, newSvg)}
          onClose={() => setEditingIcon(null)}
        />
      )}
    </div>
  );
}

interface IconEditorModalProps {
  svg: string;
  onSave: (svg: string) => void;
  onClose: () => void;
}

function IconEditorModal({ svg, onSave, onClose }: IconEditorModalProps) {
  const [svgCode, setSvgCode] = useState(svg);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Editar Icono SVG</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código SVG
            </label>
            <textarea
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              className="w-full h-40 px-4 py-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="<svg viewBox='0 0 24 24' ...>"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vista previa</label>
            <div className="flex items-center justify-center h-20 bg-gray-50 border border-gray-200 rounded-xl">
              {svgCode ? (
                <div
                  className="w-12 h-12 text-green-700"
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
              ) : (
                <span className="text-gray-400">Sin icono</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(svgCode)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
