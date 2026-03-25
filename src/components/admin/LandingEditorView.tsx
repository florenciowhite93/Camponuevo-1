"use client";

import { useState } from "react";
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
import { GripVertical, Edit2, Trash2, X, Save, Eye, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLandingSections } from "@/hooks/useLandingSections";
import { CategoriaSelector } from "@/components/admin/CategoriaSelector";
import { SubcategoriaSelector } from "@/components/admin/SubcategoriaSelector";
import type { SeccionLanding, CategoriasConfig, ProductosConfig } from "@/types";

const tiposSeccion = [
  { id: "hero", nombre: "Hero", descripcion: "Sección principal con imagen de fondo" },
  { id: "categorias", nombre: "Categorías", descripcion: "Grid de categorías" },
  { id: "productos", nombre: "Productos Destacados", descripcion: "Productos destacados según subcategorías" },
  { id: "testimonios", nombre: "Testimonios", descripcion: "Reseñas de clientes" },
  { id: "newsletter", nombre: "Newsletter", descripcion: "Formulario de suscripción" },
];

interface SortableSectionProps {
  seccion: SeccionLanding;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

function SortableSection({ seccion, onEdit, onDelete, onToggle }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: seccion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tipoInfo = tiposSeccion.find((t) => t.id === seccion.tipo);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border",
        isDragging && "opacity-50 shadow-lg z-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg"
      >
        <GripVertical size={20} className="text-gray-400" />
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{tipoInfo?.nombre || seccion.tipo}</span>
          <span className="text-xs text-gray-400">{seccion.config?.titulo || ""}</span>
        </div>
        <p className="text-xs text-gray-500">{tipoInfo?.descripcion}</p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={seccion.activa}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </label>

      <button
        onClick={onEdit}
        className="p-2 hover:bg-gray-100 rounded-lg transition"
        title="Editar"
      >
        <Edit2 size={18} className="text-gray-600" />
      </button>

      <button
        onClick={onDelete}
        className="p-2 hover:bg-red-50 rounded-lg transition"
        title="Eliminar"
      >
        <Trash2 size={18} className="text-red-500" />
      </button>
    </div>
  );
}

export function LandingEditorView() {
  const { secciones, loading, updateSeccion, reorderSecciones } = useLandingSections();
  const [editingSection, setEditingSection] = useState<SeccionLanding | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = secciones.findIndex((s) => s.id === active.id);
      const newIndex = secciones.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(secciones, oldIndex, newIndex);
      await reorderSecciones(newOrder.map((s) => s.id));
    }
  };

  const handleToggle = async (id: string) => {
    const seccion = secciones.find((s) => s.id === id);
    if (seccion) {
      await updateSeccion(id, { activa: !seccion.activa });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar esta sección?")) {
      await fetch(`/api/landing/seccion/${id}`, { method: "DELETE" });
      window.location.reload();
    }
  };

  const handleSaveConfig = async () => {
    if (!editingSection) return;
    setSaving(true);
    try {
      await updateSeccion(editingSection.id, { config: editingSection.config });
      setEditingSection(null);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
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
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-2">Editor de Landing Page</h2>
        <p className="text-sm text-gray-600 mb-6">
          Reordena las secciones arrastrándolas. Haz clic en editar para configurar cada sección.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={secciones.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {secciones.map((seccion) => (
                <SortableSection
                  key={seccion.id}
                  seccion={seccion}
                  onEdit={() => setEditingSection(seccion)}
                  onDelete={() => handleDelete(seccion.id)}
                  onToggle={() => handleToggle(seccion.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {secciones.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No hay secciones configuradas.</p>
          </div>
        )}
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <AddSeccionModal
          onAdd={async (tipo, titulo) => {
            await fetch("/api/landing/seccion", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tipo, titulo }),
            });
            window.location.reload();
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Section Modal */}
      {editingSection && (
        <SectionEditModal
          seccion={editingSection}
          onChange={setEditingSection}
          onSave={handleSaveConfig}
          onClose={() => setEditingSection(null)}
          saving={saving}
        />
      )}
    </div>
  );
}

interface AddSeccionModalProps {
  onAdd: (tipo: string, titulo: string) => void;
  onClose: () => void;
}

function AddSeccionModal({ onAdd, onClose }: AddSeccionModalProps) {
  const [tipo, setTipo] = useState("hero");
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(tipo, titulo);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Agregar Sección</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de sección
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {tiposSeccion.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} - {t.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ej: Nuestras Categorías"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface SectionEditModalProps {
  seccion: SeccionLanding;
  onChange: (seccion: SeccionLanding) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}

function SectionEditModal({ seccion, onChange, onSave, onClose, saving }: SectionEditModalProps) {
  const config = seccion.config as Record<string, any>;

  const handleConfigChange = (key: string, value: any) => {
    onChange({ ...seccion, config: { ...config, [key]: value } as any });
  };

  const renderConfigEditor = () => {
    switch (seccion.tipo) {
      case "categorias":
        return (
          <CategoriaSelector
            config={config as CategoriasConfig}
            onChange={(newConfig) => onChange({ ...seccion, config: newConfig as any })}
          />
        );
      case "productos":
        return (
          <SubcategoriaSelector
            config={config as ProductosConfig}
            onChange={(newConfig) => onChange({ ...seccion, config: newConfig as any })}
          />
        );
      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título de la sección
              </label>
              <input
                type="text"
                value={config.titulo || ""}
                onChange={(e) => handleConfigChange("titulo", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={config.descripcion || ""}
                onChange={(e) => handleConfigChange("descripcion", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={3}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            Editar {tiposSeccion.find((t) => t.id === seccion.tipo)?.nombre}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">{renderConfigEditor()}</div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save size={18} />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
