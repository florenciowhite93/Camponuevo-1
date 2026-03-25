"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (svg: string) => void;
  onClear?: () => void;
}

function normalizeSvg(svg: string): string {
  if (!svg) return "";
  
  let normalized = svg.trim();
  
  normalized = normalized.replace(/width="[^"]*"/gi, 'width="24"');
  normalized = normalized.replace(/height="[^"]*"/gi, 'height="24"');
  
  if (!normalized.includes('viewBox=')) {
    if (normalized.includes('<svg')) {
      normalized = normalized.replace('<svg', '<svg viewBox="0 0 24 24"');
    }
  }
  
  return normalized;
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
        const normalized = normalizeSvg(svgContent);
        onChange(normalized);
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

  const handleClear = useCallback(() => {
    onChange("");
    onClear?.();
  }, [onChange, onClear]);

  return (
    <div className="space-y-4">
      {/* Preview grande */}
      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 relative overflow-hidden">
        {value ? (
          <>
            <div 
              className="w-24 h-24 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:text-green-700"
              dangerouslySetInnerHTML={{ __html: value }} 
            />
            {onClear && (
              <button
                onClick={handleClear}
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
          "border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer",
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400"
        )}
      >
        <Upload size={20} className="mx-auto mb-2 text-gray-400" />
        <p className="text-xs text-gray-600 mb-2">
          Arrastrá un SVG o
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
            "inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition",
            isUploading && "opacity-50"
          )}>
            {isUploading ? "Procesando..." : "seleccioná un archivo"}
          </span>
        </label>
      </div>
    </div>
  );
}
