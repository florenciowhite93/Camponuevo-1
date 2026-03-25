"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, ChevronRight, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Categoria, Subcategoria, ProductosConfig } from "@/types";

const supabase = createClient();

interface SubcategoriaSelectorProps {
  config: ProductosConfig;
  onChange: (config: ProductosConfig) => void;
}

export function SubcategoriaSelector({ config, onChange }: SubcategoriaSelectorProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCategorias = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("categorias")
      .select("*, subcategorias(id, nombre, categoria_id)")
      .order("orden", { ascending: true });
    setCategorias(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  const toggleExpand = (categoriaId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    );
  };

  const selectedSubcategoriasIds = config.subcategorias_ids || [];
  const selectedSubcategorias = selectedSubcategoriasIds
    .map((id) => {
      for (const cat of categorias) {
        const sub = cat.subcategorias?.find((s) => s.id === id);
        if (sub) return { ...sub, categoriaNombre: cat.nombre };
      }
      return null;
    })
    .filter(Boolean) as (Subcategoria & { categoriaNombre: string })[];

  const toggleSubcategoria = (subcategoria: Subcategoria) => {
    const isSelected = selectedSubcategoriasIds.includes(subcategoria.id);
    const newIds = isSelected
      ? selectedSubcategoriasIds.filter((id) => id !== subcategoria.id)
      : [...selectedSubcategoriasIds, subcategoria.id];
    onChange({ ...config, subcategorias_ids: newIds });
  };

  const removeSubcategoria = (subcategoriaId: string) => {
    onChange({
      ...config,
      subcategorias_ids: selectedSubcategoriasIds.filter((id) => id !== subcategoriaId),
    });
  };

  const filteredCategorias = categorias
    .map((cat) => ({
      ...cat,
      subcategorias: cat.subcategorias?.filter((sub) =>
        sub.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => {
      if (!searchTerm) return true;
      if (cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      return cat.subcategorias && cat.subcategorias.length > 0;
    });

  const getProductCount = async (subcategoriaId: string): Promise<number> => {
    const { count } = await supabase
      .from("productos")
      .select("*", { count: "exact", head: true })
      .contains("subcategorias_ids", [subcategoriaId])
      .eq("visible", true);
    return count || 0;
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Máximo de productos a mostrar
        </label>
        <input
          type="number"
          min={1}
          max={50}
          value={config.max_productos}
          onChange={(e) => onChange({ ...config, max_productos: parseInt(e.target.value) || 8 })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Subcategorías seleccionadas ({selectedSubcategoriasIds.length})
        </h3>
        {selectedSubcategoriasIds.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Sin subcategorías seleccionadas</p>
        ) : (
          <div className="space-y-2">
            {selectedSubcategorias.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl"
              >
                <span className="text-xs text-gray-500">{sub.categoriaNombre}</span>
                <span className="flex-1 font-medium">{sub.nombre}</span>
                <button
                  onClick={() => removeSubcategoria(sub.id)}
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Seleccionar subcategorías
        </h3>
        <input
          type="text"
          placeholder="Buscar subcategorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {loading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : (
          <div className="max-h-80 overflow-y-auto space-y-2">
            {filteredCategorias.map((categoria) => {
              const hasSubcategorias = categoria.subcategorias && categoria.subcategorias.length > 0;
              const isExpanded = expandedCategories.includes(categoria.id);

              return (
                <div key={categoria.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleExpand(categoria.id)}
                    disabled={!hasSubcategorias}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 transition",
                      hasSubcategorias
                        ? "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        : "bg-gray-50 cursor-not-allowed opacity-50"
                    )}
                  >
                    {hasSubcategorias && (
                      isExpanded ? (
                        <ChevronDown size={16} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-400" />
                      )
                    )}
                    <span className="flex-1 text-left font-medium">{categoria.nombre}</span>
                    <span className="text-xs text-gray-500">
                      {categoria.subcategorias?.length || 0} subcategorías
                    </span>
                  </button>
                  {isExpanded && hasSubcategorias && (
                    <div className="border-t border-gray-100">
                      {categoria.subcategorias!.map((sub) => {
                        const isSelected = selectedSubcategoriasIds.includes(sub.id);
                        return (
                          <button
                            key={sub.id}
                            onClick={() => toggleSubcategoria(sub)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left transition border-b last:border-b-0",
                              isSelected
                                ? "bg-green-50"
                                : "bg-white hover:bg-gray-50"
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center",
                                isSelected
                                  ? "bg-green-600 border-green-600"
                                  : "border-gray-300"
                              )}
                            >
                              {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <span className="flex-1">{sub.nombre}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Nota</h4>
        <p className="text-sm text-blue-700">
          Los productos destacados se mostrarán según las subcategorías seleccionadas, 
          hasta un máximo de {config.max_productos} productos.
        </p>
      </div>
    </div>
  );
}
