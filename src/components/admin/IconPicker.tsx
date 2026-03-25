"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (url: string) => void;
  onClear?: () => void;
}

export function IconPicker({ value, onChange, onClear }: IconPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif'];
    
    if (!validTypes.includes(file.type)) {
      alert('Formato no válido. Usa PNG, JPG, SVG, WebP o GIF.');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      onChange(dataUrl);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Error al leer el archivo');
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    onChange('');
    onClear?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange, onClear]);

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 relative overflow-hidden">
        {previewUrl ? (
          <>
            <div className="w-32 h-32 flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={previewUrl}
                alt="Icono"
                className="max-w-full max-h-full object-contain"
                style={{ width: 48, height: 48, objectFit: 'contain' }}
              />
            </div>
            {onClear && (
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-red-100 hover:bg-red-200 rounded-full transition"
              >
                <X size={16} className="text-red-600" />
              </button>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400">
            <Image size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Sin imagen</p>
          </div>
        )}
      </div>

      {/* Upload zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition",
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400",
          isUploading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Upload size={20} className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          {isUploading ? 'Procesando...' : 'Arrastrá una imagen o hacé clic'}
        </p>
        <p className="text-xs text-gray-400">
          PNG, JPG, SVG (máx 2MB)
        </p>
      </div>
    </div>
  );
}
