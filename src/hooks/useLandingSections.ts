"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SeccionLanding, Categoria, Subcategoria, CategoriasConfig, ProductosConfig } from "@/types";

const supabase = createClient();

interface UseLandingSectionsReturn {
  secciones: SeccionLanding[];
  loading: boolean;
  error: string | null;
  loadSecciones: () => Promise<void>;
  updateSeccion: (id: string, updates: Partial<SeccionLanding>) => Promise<void>;
  reorderSecciones: (orderedIds: string[]) => Promise<void>;
  getCategoriaConfig: (seccionId: string) => CategoriasConfig | null;
  updateCategoriaConfig: (seccionId: string, config: CategoriasConfig) => Promise<void>;
  getProductosConfig: (seccionId: string) => ProductosConfig | null;
  updateProductosConfig: (seccionId: string, config: ProductosConfig) => Promise<void>;
}

export function useLandingSections(): UseLandingSectionsReturn {
  const [secciones, setSecciones] = useState<SeccionLanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadSecciones = useCallback(async () => {
    if (isInitialized && secciones.length > 0) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("secciones_landing")
        .select("*")
        .order("orden", { ascending: true });

      if (fetchError) throw fetchError;
      setSecciones(data || []);
      setIsInitialized(true);
    } catch (err) {
      console.error("Error loading secciones:", err);
      setError("Error al cargar secciones");
    } finally {
      setLoading(false);
    }
  }, [isInitialized, secciones.length]);

  useEffect(() => {
    loadSecciones();
  }, [loadSecciones]);

  const updateSeccion = useCallback(async (id: string, updates: Partial<SeccionLanding>) => {
    setSecciones((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );

    try {
      const { error: updateError } = await supabase
        .from("secciones_landing")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (updateError) throw updateError;
    } catch (err) {
      console.error("Error updating seccion:", err);
      await loadSecciones();
    }
  }, [loadSecciones]);

  const reorderSecciones = useCallback(async (orderedIds: string[]) => {
    const updatedSecciones: SeccionLanding[] = [];
    
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i];
      const seccion = secciones.find((s) => s.id === id);
      if (seccion) {
        updatedSecciones.push({ ...seccion, orden: i });
      }
    }

    setSecciones(updatedSecciones);

    try {
      for (const seccion of updatedSecciones) {
        await supabase
          .from("secciones_landing")
          .update({ orden: seccion.orden, updated_at: new Date().toISOString() })
          .eq("id", seccion.id);
      }
    } catch (err) {
      console.error("Error reordering secciones:", err);
      await loadSecciones();
    }
  }, [secciones, loadSecciones]);

  const getCategoriaConfig = useCallback((seccionId: string): CategoriasConfig | null => {
    const seccion = secciones.find((s) => s.id === seccionId);
    if (!seccion || seccion.tipo !== "categorias") return null;
    return seccion.config as CategoriasConfig;
  }, [secciones]);

  const updateCategoriaConfig = useCallback(async (seccionId: string, config: CategoriasConfig) => {
    await updateSeccion(seccionId, { config });
  }, [updateSeccion]);

  const getProductosConfig = useCallback((seccionId: string): ProductosConfig | null => {
    const seccion = secciones.find((s) => s.id === seccionId);
    if (!seccion || seccion.tipo !== "productos") return null;
    return seccion.config as ProductosConfig;
  }, [secciones]);

  const updateProductosConfig = useCallback(async (seccionId: string, config: ProductosConfig) => {
    await updateSeccion(seccionId, { config });
  }, [updateSeccion]);

  return {
    secciones,
    loading,
    error,
    loadSecciones,
    updateSeccion,
    reorderSecciones,
    getCategoriaConfig,
    updateCategoriaConfig,
    getProductosConfig,
    updateProductosConfig,
  };
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("*, subcategorias(id, nombre, categoria_id)")
        .order("orden", { ascending: true });

      if (error) throw error;
      setCategorias(data || []);
    } catch (err) {
      console.error("Error loading categorias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { categorias, loading, reload: load };
}

export function useSubcategorias() {
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subcategorias")
        .select("*, categoria:categorias(nombre)")
        .order("nombre", { ascending: true });

      if (error) throw error;
      setSubcategorias(data || []);
    } catch (err) {
      console.error("Error loading subcategorias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { subcategorias, loading, reload: load };
}
