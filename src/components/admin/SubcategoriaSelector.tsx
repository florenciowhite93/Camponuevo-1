"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, ChevronRight, ChevronDown, X, GripVertical, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Categoria, Subcategoria, Producto, ProductosConfig } from "@/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const supabase = createClient();

interface SubcategoriaSelectorProps {
  config: ProductosConfig;
  onChange: (config: ProductosConfig) => void;
}

interface SortableProductProps {
  producto: Producto;
  onRemove: () => void;
}

function SortableProduct({ producto, onRemove }: SortableProductProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: producto.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl",
        isDragging && "opacity-50 shadow-lg z-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
      >
        <GripVertical size={16} className="text-gray-400" />
      </button>
      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <X size={20} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{producto.titulo}</p>
        <p className="text-xs text-gray-500 truncate">{producto.laboratorio_nombre || producto.dosis}</p>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-red-50 rounded flex-shrink-0"
      >
        <X size={16} className="text-red-500" />
      </button>
    </div>
  );
}

export function SubcategoriaSelector({ config, onChange }: SubcategoriaSelectorProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategoriasSinCategoria, setSubcategoriasSinCategoria] = useState<Subcategoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSinCategoria, setExpandedSinCategoria] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSubcategorias, setShowSubcategorias] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  const selectedSubcategoriasIds = config.subcategorias_ids || [];
  const selectedProductIds = config.productos_ids || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const loadCategorias = useCallback(async () => {
    setLoading(true);
    const [categoriasResult, subcategoriasResult] = await Promise.all([
      supabase
        .from("categorias")
        .select("*, subcategorias(id, nombre, categoria_id)")
        .order("orden", { ascending: true }),
      supabase
        .from("subcategorias")
        .select("id, nombre, categoria_id")
        .is("categoria_id", null)
        .order("nombre", { ascending: true })
    ]);
    setCategorias(categoriasResult.data || []);
    setSubcategoriasSinCategoria(subcategoriasResult.data || []);
    setLoading(false);
  }, []);

  const loadSelectedProducts = useCallback(async () => {
    if (selectedProductIds.length === 0) {
      setProductos([]);
      return;
    }
    setLoadingProductos(true);
    const { data } = await supabase
      .from("productos")
      .select(`*, laboratorio:laboratorios(nombre)`)
      .in("id", selectedProductIds);
    
    if (data) {
      const productMap = new Map(data.map(p => [p.id, { ...p, laboratorio_nombre: p.laboratorio?.nombre }]));
      const orderedProducts = selectedProductIds
        .map(id => productMap.get(id))
        .filter(Boolean) as Producto[];
      setProductos(orderedProducts);
    }
    setLoadingProductos(false);
  }, [selectedProductIds]);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  useEffect(() => {
    loadSelectedProducts();
  }, [loadSelectedProducts]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const currentIds = config.productos_ids || [];
      const oldIndex = currentIds.indexOf(active.id as string);
      const newIndex = currentIds.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(currentIds, oldIndex, newIndex);
        onChange({ ...config, productos_ids: newOrder });
      }
    }
  }, [config, onChange]);

  const toggleExpand = (categoriaId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    );
  };

  const toggleExpandSinCategoria = () => {
    setExpandedSinCategoria((prev) => !prev);
  };

  const selectedSubcategorias = selectedSubcategoriasIds
    .map((id) => {
      for (const cat of categorias) {
        const sub = cat.subcategorias?.find((s) => s.id === id);
        if (sub) return { ...sub, categoriaNombre: cat.nombre };
      }
      const sinCat = subcategoriasSinCategoria.find((s) => s.id === id);
      if (sinCat) return { ...sinCat, categoriaNombre: "Sin categoría" };
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

  const removeProduct = (productId: string) => {
    onChange({
      ...config,
      productos_ids: selectedProductIds.filter((id) => id !== productId),
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

  const filteredSinCategoria = subcategoriasSinCategoria
    .filter((sub) => sub.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  const [availableProducts, setAvailableProducts] = useState<Producto[]>([]);

  const searchProducts = async (query: string) => {
    if (!query || query.length < 2) {
      setAvailableProducts([]);
      return;
    }
    setLoadingProductos(true);
    const { data } = await supabase
      .from("productos")
      .select(`*, laboratorio:laboratorios(nombre)`)
      .eq("visible", true)
      .ilike("titulo", `%${query}%`)
      .limit(20);
    
    if (data) {
      setAvailableProducts(
        data
          .filter((p: any) => !selectedProductIds.includes(p.id))
          .map((p: any) => ({ ...p, laboratorio_nombre: p.laboratorio?.nombre }))
      );
    }
    setLoadingProductos(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(productSearchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [productSearchTerm]);

  const addProduct = (product: Producto) => {
    onChange({
      ...config,
      productos_ids: [...(config.productos_ids || []), product.id],
    });
    setProductSearchTerm("");
    setAvailableProducts([]);
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">
            Productos seleccionados ({selectedProductIds.length})
          </h3>
          <button
            onClick={() => setShowProductSelector(!showProductSelector)}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            {showProductSelector ? "Ocultar selector" : "Agregar productos"}
          </button>
        </div>
        
        {showProductSelector && (
          <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos para agregar..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            {availableProducts.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-2">
                {availableProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProduct(product)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-white border border-gray-100 rounded-lg transition text-left"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {product.imagen ? (
                        <img src={product.imagen} alt={product.titulo} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <X size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.titulo}</p>
                      <p className="text-xs text-gray-500 truncate">{product.laboratorio_nombre}</p>
                    </div>
                    <span className="text-xs text-green-600">+ Agregar</span>
                  </button>
                ))}
              </div>
            )}
            
            {loadingProductos && productSearchTerm.length >= 2 && (
              <p className="text-sm text-gray-500 text-center py-2">Buscando...</p>
            )}
            
            {!loadingProductos && productSearchTerm.length >= 2 && availableProducts.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">No se encontraron productos</p>
            )}
          </div>
        )}

        {selectedProductIds.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Sin productos seleccionados. Usa el buscador para agregar productos.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedProductIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {productos.map((producto) => (
                  <SortableProduct
                    key={producto.id}
                    producto={producto}
                    onRemove={() => removeProduct(producto.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSubcategorias(!showSubcategorias)}
          className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
        >
          {showSubcategorias ? (
            <ChevronDown size={16} className="text-gray-400" />
          ) : (
            <ChevronRight size={16} className="text-gray-400" />
          )}
          <span className="flex-1 font-medium text-gray-600">Avanzado: Seleccionar por subcategorías</span>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
            {selectedSubcategoriasIds.length} seleccionadas
          </span>
        </button>
        
        {showSubcategorias && (
          <div className="p-4 border-t border-gray-100 space-y-4">
            <p className="text-xs text-gray-500 italic">
              Esta opción permite mostrar productos automáticamente según las subcategorías seleccionadas. 
              Si ya hay productos seleccionados manualmente, esta opción será ignorada.
            </p>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Subcategorías seleccionadas ({selectedSubcategoriasIds.length})
              </h4>
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
              <h4 className="text-sm font-medium text-gray-700 mb-2">Seleccionar subcategorías</h4>
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
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredCategorias.map((categoria) => {
                    const hasSubcategorias = categoria.subcategorias && categoria.subcategorias.length > 0;
                    const isExpanded = expandedCategories.includes(categoria.id);

                    return (
                      <div key={categoria.id} className="border border-gray-200 rounded-lg overflow-hidden">
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
                            {categoria.subcategorias?.length || 0}
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
                                    "w-full flex items-center gap-3 px-4 py-2 text-left transition border-b last:border-b-0",
                                    isSelected
                                      ? "bg-green-50"
                                      : "bg-white hover:bg-gray-50"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded border flex items-center justify-center",
                                      isSelected
                                        ? "bg-green-600 border-green-600"
                                        : "border-gray-300"
                                    )}
                                  >
                                    {isSelected && <Check size={12} className="text-white" />}
                                  </div>
                                  <span className="flex-1 text-sm">{sub.nombre}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {subcategoriasSinCategoria.length > 0 && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={toggleExpandSinCategoria}
                        className="w-full flex items-center gap-3 p-3 transition bg-gray-50 hover:bg-gray-100"
                      >
                        {expandedSinCategoria ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                        <span className="flex-1 text-left font-medium text-gray-600">Sin categoría</span>
                        <span className="text-xs text-gray-500">
                          {filteredSinCategoria.length}
                        </span>
                      </button>
                      {expandedSinCategoria && (
                        <div className="border-t border-gray-100">
                          {filteredSinCategoria.map((sub) => {
                            const isSelected = selectedSubcategoriasIds.includes(sub.id);
                            return (
                              <button
                                key={sub.id}
                                onClick={() => toggleSubcategoria(sub)}
                                className={cn(
                                  "w-full flex items-center gap-3 px-4 py-2 text-left transition border-b last:border-b-0",
                                  isSelected
                                    ? "bg-green-50"
                                    : "bg-white hover:bg-gray-50"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center",
                                    isSelected
                                      ? "bg-green-600 border-green-600"
                                      : "border-gray-300"
                                  )}
                                >
                                  {isSelected && <Check size={12} className="text-white" />}
                                </div>
                                <span className="flex-1 text-sm">{sub.nombre}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Nota</h4>
        <p className="text-sm text-blue-700">
          {selectedProductIds.length > 0
            ? `Se mostrarán ${Math.min(selectedProductIds.length, config.max_productos)} productos en el orden que aparecen arriba.`
            : `Los productos destacados se mostrarán según las subcategorías seleccionadas, hasta un máximo de ${config.max_productos} productos.`}
        </p>
      </div>
    </div>
  );
}
