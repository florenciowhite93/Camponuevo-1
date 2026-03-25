"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCSVRow {
  titulo: string;
  precio: string;
  laboratorio: string;
  imagen: string;
  descripcion: string;
  volumen: string;
  drogas: string;
  especies: string;
  errores: string[];
}

interface ImportCSVProps {
  onImport: (productos: ProductCSVRow[]) => void;
  onClose: () => void;
}

export function ImportCSV({ onImport, onClose }: ImportCSVProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [parsedData, setParsedData] = useState<ProductCSVRow[]>([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; errors: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Por favor, selecciona un archivo CSV");
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        alert("El archivo CSV debe tener al menos una fila de encabezado y una fila de datos");
        setIsProcessing(false);
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const products: ProductCSVRow[] = [];

      for (let i = hasHeaders ? 1 : 0; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const row: any = {};

        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        const errores: string[] = [];
        if (!row.titulo && !row.title) {
          errores.push("Falta título");
        }

        products.push({
          titulo: row.titulo || row.title || "",
          precio: row.precio || row.price || "0",
          laboratorio: row.laboratorio || row.laboratory || row.lab || "",
          imagen: row.imagen || row.image || row.url || "",
          descripcion: row.descripcion || row.description || "",
          volumen: row.volumen || row.volume || row.presentacion || "",
          drogas: row.drogas || row.drugs || row.composicion || "",
          especies: row.especies || row.especie || row.animals || "",
          errores,
        });
      }

      setParsedData(products);
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());

    return result;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleImport = () => {
    onImport(parsedData);
    setImportResult({ success: parsedData.length, errors: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Upload className="text-green-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Importar Productos desde CSV</h2>
              <p className="text-sm text-gray-500">Subí un archivo CSV con tus productos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {parsedData.length === 0 ? (
            <>
              {/* Options */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasHeaders}
                    onChange={(e) => setHasHeaders(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    La primera fila contiene encabezados (titulo, precio, laboratorio, etc.)
                  </span>
                </label>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition",
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-gray-400 text-2xl" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Arrastrá tu archivo CSV aquí
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  o hacé clic para seleccionar
                </p>
                <p className="text-xs text-gray-400">
                  Formato: titulo, precio, laboratorio, imagen, descripcion, volumen, drogas, especies
                </p>
              </div>

              {/* Template Download */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">¿No tenés un archivo?</h4>
                <p className="text-sm text-blue-600 mb-3">
                  Descargá la plantilla CSV para ver el formato correcto:
                </p>
                <button
                  onClick={() => {
                    const template = "titulo,precio,laboratorio,imagen,descripcion,volumen,drogas,especies\nDardox Konig 5lt,480862,Konig,https://ejemplo.com/img.jpg,Antiparasitario externo,5lt,Eprinomectina 0.5g,bovino,ovino";
                    const blob = new Blob([template], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "plantilla_productos.csv";
                    a.click();
                  }}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Descargar plantilla
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Preview Table */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="font-medium">{parsedData.length} productos encontrados</span>
                  <span className="text-gray-500 ml-2">
                    ({parsedData.filter((p) => p.errores.length > 0).length} con errores)
                  </span>
                </div>
                <button
                  onClick={() => setParsedData([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Seleccionar otro archivo
                </button>
              </div>

              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-3 text-left font-medium text-gray-600">#</th>
                      <th className="p-3 text-left font-medium text-gray-600">Título</th>
                      <th className="p-3 text-left font-medium text-gray-600">Precio</th>
                      <th className="p-3 text-left font-medium text-gray-600">Laboratorio</th>
                      <th className="p-3 text-left font-medium text-gray-600">Especies</th>
                      <th className="p-3 text-left font-medium text-gray-600">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {parsedData.map((product, index) => (
                      <tr key={index} className={product.errores.length > 0 ? "bg-red-50" : ""}>
                        <td className="p-3 text-gray-500">{index + 1}</td>
                        <td className="p-3 font-medium">{product.titulo || "-"}</td>
                        <td className="p-3">{product.precio || "-"}</td>
                        <td className="p-3">{product.laboratorio || "-"}</td>
                        <td className="p-3">{product.especies || "-"}</td>
                        <td className="p-3">
                          {product.errores.length > 0 ? (
                            <span className="flex items-center gap-1 text-red-600">
                              <AlertCircle size={14} />
                              {product.errores.join(", ")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-green-600">
                              <Check size={14} />
                              OK
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          {parsedData.length > 0 && (
            <button
              onClick={handleImport}
              disabled={importResult !== null}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50"
            >
              <Check size={18} />
              Importar {parsedData.length} productos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
