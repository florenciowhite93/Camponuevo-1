"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (svg: string) => void;
  onClear?: () => void;
}

export function IconPicker({ value, onChange, onClear }: IconPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgContent = event.target?.result as string;
        onChange(svgContent);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  return (
    <div className="space-y-4">
      {/* Preview grande */}
      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 relative">
        {value ? (
          <>
            <div className="w-20 h-20 text-green-700" dangerouslySetInnerHTML={{ __html: value }} />
            {onClear && (
              <button
                onClick={onClear}
                className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full transition"
              >
                <X size={16} className="text-red-600" />
              </button>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400">
            <FileText size={32} className="mx-auto mb-2" />
            <p className="text-sm">Sin icono</p>
          </div>
        )}
      </div>

      {/* Upload area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer",
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400"
        )}
      >
        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-3">
          Arrastra un archivo SVG aquí
        </p>
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept=".svg,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <span className={cn(
            "inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition",
            isUploading && "opacity-50"
          )}>
            {isUploading ? "Procesando..." : "Seleccionar archivo"}
          </span>
        </label>
        <p className="text-xs text-gray-400 mt-3">Formatos: .svg</p>
      </div>
    </div>
  );
}
