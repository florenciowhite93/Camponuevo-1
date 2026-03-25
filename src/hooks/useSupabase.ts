"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Producto, Categoria, Laboratorio, Etiqueta } from "@/types";

const supabase = createClient();

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select(`
            *,
            laboratorio:laboratorios(nombre)
          `)
          .eq("visible", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const productosConLaboratorio = (data || []).map((p: any) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));

        setProductos(productosConLaboratorio);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  return { productos, loading, error };
}

export function useProducto(id: string) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducto() {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("productos")
          .select(`
            *,
            laboratorio:laboratorios(nombre)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setProducto({
            ...data,
            laboratorio_nombre: data.laboratorio?.nombre,
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducto();
  }, [id]);

  return { producto, loading, error };
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const { data, error } = await supabase
          .from("categorias")
          .select(`
            *,
            subcategorias:subcategorias(id, nombre)
          `)
          .order("orden");

        if (error) throw error;
        setCategorias(data || []);
      } catch (err) {
        console.error("Error fetching categorias:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  return { categorias, loading };
}

export function useLaboratorios() {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLaboratorios() {
      try {
        const { data, error } = await supabase
          .from("laboratorios")
          .select("id, nombre")
          .order("nombre");

        if (error) throw error;
        setLaboratorios(data || []);
      } catch (err) {
        console.error("Error fetching laboratorios:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLaboratorios();
  }, []);

  return { laboratorios, loading };
}

export function useEtiquetas() {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEtiquetas() {
      try {
        const { data, error } = await supabase
          .from("etiquetas")
          .select("id, nombre, color")
          .order("nombre");

        if (error) throw error;
        setEtiquetas(data || []);
      } catch (err) {
        console.error("Error fetching etiquetas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEtiquetas();
  }, []);

  return { etiquetas, loading };
}
