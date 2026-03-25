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
import { GripVertical, Edit2, Eye, Trash2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeccionLanding {
  id: string;
  tipo: "hero" | "categorias" | "productos" | "testimonios" | "newsletter";
  titulo: string;
  activa: boolean;
}

const tiposSeccion = [
  { id: "hero", nombre: "Hero", descripcion: "Sección principal con imagen de fondo" },
  { id: "categorias", nombre: "Categorías", descripcion: "Grid de categorías" },
  { id: "productos", nombre: "Productos Destacados", descripcion: "Carrusel de productos" },
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
          <span className="text-xs text-gray-400">{seccion.titulo}</span>
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

interface LandingEditorProps {
  secciones: SeccionLanding[];
  onChange: (secciones: SeccionLanding[]) => void;
}

export function LandingEditor({ secciones, onChange }: LandingEditorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSection, setEditingSection] = useState<SeccionLanding | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = secciones.findIndex((s) => s.id === active.id);
      const newIndex = secciones.findIndex((s) => s.id === over.id);
      onChange(arrayMove(secciones, oldIndex, newIndex));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta sección?")) {
      onChange(secciones.filter((s) => s.id !== id));
    }
  };

  const handleToggle = (id: string) => {
    onChange(
      secciones.map((s) =>
        s.id === id ? { ...s, activa: !s.activa } : s
      )
    );
  };

  const handleAdd = (tipo: SeccionLanding["tipo"]) => {
    const newSection: SeccionLanding = {
      id: `seccion_${Date.now()}`,
      tipo,
      titulo: `Nueva sección ${tipo}`,
      activa: true,
    };
    onChange([...secciones, newSection]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
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

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:border-green-400 hover:text-green-600 transition flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Agregar nueva sección
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Agregar Sección</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              {tiposSeccion.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => handleAdd(tipo.id as SeccionLanding["tipo"])}
                  className="text-left p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition"
                >
                  <p className="font-medium text-gray-900">{tipo.nombre}</p>
                  <p className="text-sm text-gray-500">{tipo.descripcion}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSection && (
        <SectionEditModal
          seccion={editingSection}
          onSave={(updated) => {
            onChange(
              secciones.map((s) =>
                s.id === updated.id ? updated : s
              )
            );
            setEditingSection(null);
          }}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  );
}

interface SectionEditModalProps {
  seccion: SeccionLanding;
  onSave: (seccion: SeccionLanding) => void;
  onClose: () => void;
}

function SectionEditModal({ seccion, onSave, onClose }: SectionEditModalProps) {
  const [formData, setFormData] = useState(seccion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Editar Sección</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la sección
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.activa}
                onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>Activa</span>
            </label>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
