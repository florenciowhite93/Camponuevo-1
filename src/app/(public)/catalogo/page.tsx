"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import type { Producto } from "@/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const PAGE_SIZE = 20;

const especies = [
  { value: "bovino", label: "Bovino", icon: "/svg/Bovino.svg" },
  { value: "ovino", label: "Ovino", icon: "/svg/Ovino.svg" },
  { value: "equino", label: "Equino", icon: "/svg/Equino.svg" },
  { value: "porcino", label: "Porcino", icon: "/svg/Porcino.svg" },
  { value: "canino", label: "Caninos", icon: "/svg/Canino.svg" },
  { value: "felino", label: "Felinos", icon: "/svg/Felino.svg" },
];



export default function CatalogoPage() {
  const [allProductos, setAllProductos] = useState<Producto[]>([]);
  const [displayedProductos, setDisplayedProductos] = useState<Producto[]>([]);
  const [laboratorios, setLaboratorios] = useState<{id: string, nombre: string}[]>([]);
  const [categorias, setCategorias] = useState<{id: string, nombre: string}[]>([]);
  const [subcategorias, setSubcategorias] = useState<{id: string, nombre: string, categoria_id: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabs, setSelectedLabs] = useState<string>("");
  const [selectedEspecies, setSelectedEspecies] = useState<string[]>([]);
  const [selectedCategorias, setSelectedCategorias] = useState<string>("");
  const [selectedSubcategorias, setSelectedSubcategorias] = useState<string>("");
  const [sortBy, setSortBy] = useState("newest");

  const [breedDropdownOpen, setBreedDropdownOpen] = useState(false);
  const breedDropdownRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [breedDropdownOpen2, setBreedDropdownOpen2] = useState(false);
  const breedDropdownRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        
        const [labRes, catRes, subcatRes] = await Promise.all([
          supabase.from("laboratorios").select("id, nombre").order("nombre"),
          supabase.from("categorias").select("id, nombre").order("nombre"),
          supabase.from("subcategorias").select("id, nombre, categoria_id").order("nombre"),
        ]);
        
        setLaboratorios(labRes.data || []);
        setCategorias(catRes.data || []);
        setSubcategorias(subcatRes.data || []);
        
        const categoria = params.get("categoria");
        const subcategoria = params.get("subcategoria");
        
        if (search) {
          setSearchTerm(search);
        }
        
        if (categoria) {
          setSelectedCategorias(categoria);
        }
        
        if (subcategoria) {
          setSelectedSubcategorias(subcategoria);
        }
        
        if (!search && !categoria && !subcategoria) {
          fetchInitialData();
        }
      } catch (error) {
        console.error("Error loading metadata:", error);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm && subcategorias.length > 0) {
      loadFilteredProducts(true);
    }
  }, [searchTerm, subcategorias.length]);

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const urlSearch = params.get("search") || "";
      setSearchTerm(urlSearch);
    };

    handleUrlChange();
    
    window.addEventListener("popstate", handleUrlChange);
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };
    
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (breedDropdownRef.current && !breedDropdownRef.current.contains(event.target as Node)) {
        setBreedDropdownOpen(false);
      }
      if (breedDropdownRef2.current && !breedDropdownRef2.current.contains(event.target as Node)) {
        setBreedDropdownOpen2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentSearch = url.searchParams.get("search") || "";
    
    if (searchTerm !== currentSearch) {
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      } else {
        url.searchParams.delete("search");
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          if (hasActiveFilters()) {
            loadMoreFilteredProducts();
          } else {
            loadMoreProducts();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, displayedProductos.length]);

  const hasActiveFilters = () => {
    return searchTerm !== "" || selectedLabs !== "" || selectedEspecies.length > 0 || selectedCategorias !== "" || selectedSubcategorias !== "";
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      const [prodRes, labRes, catRes, subcatRes] = await Promise.all([
        supabase
          .from("productos")
          .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
          .eq("visible", true)
          .order("created_at", { ascending: false })
          .range(0, PAGE_SIZE - 1),
        supabase.from("laboratorios").select("id, nombre").order("nombre"),
        supabase.from("categorias").select("id, nombre").order("nombre"),
        supabase.from("subcategorias").select("id, nombre, categoria_id").order("nombre"),
      ]);

      const productosConLab = (prodRes.data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
        ...p,
        laboratorio_nombre: p.laboratorio?.nombre,
      }));

      setAllProductos(productosConLab);
      setDisplayedProductos(productosConLab);
      setTotalCount(prodRes.count || 0);
      setHasMore((prodRes.data?.length || 0) < (prodRes.count || 0));
      setLaboratorios(labRes.data || []);
      setCategorias(catRes.data || []);
      setSubcategorias(subcatRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;
    
    try {
      setLoadingMore(true);
      const from = displayedProductos.length;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true);

      if (sortBy === "name_asc") {
        query = query.order("titulo", { ascending: true });
      } else if (sortBy === "price_asc") {
        query = query.order("precio", { ascending: true });
      } else if (sortBy === "price_desc") {
        query = query.order("precio", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error, count } = await query.range(from, to);

      if (data) {
        const productosConLab = data.map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));

        setAllProductos(prev => [...prev, ...productosConLab]);
        setDisplayedProductos(prev => [...prev, ...productosConLab]);
        setHasMore(data.length === PAGE_SIZE && displayedProductos.length + data.length < (count || 0));
        setTotalCount(count || 0);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

const loadFilteredProducts = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
      }
      let query = supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true);

      let labIds: string[] = [];
      if (searchTerm) {
        const { data: labs } = await supabase
          .from('laboratorios')
          .select('id')
          .ilike('nombre', `%${searchTerm}%`);
        if (labs && labs.length > 0) {
          labIds = labs.map(l => l.id);
        }
        query = query.or(`titulo.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%,drogas.ilike.%${searchTerm}%${labIds.length > 0 ? `,laboratorio_id.in.(${labIds.join(',')})` : ''}`);
      }
      if (selectedLabs) {
        query = query.eq("laboratorio_id", selectedLabs);
      }
      if (selectedEspecies.length > 0) {
        query = query.contains("especies", selectedEspecies);
      }
      if (selectedCategorias) {
        const subcatIds = subcategorias.filter(s => s.categoria_id === selectedCategorias).map(s => s.id);
        query = query.overlaps("subcategorias_ids", subcatIds);
      }
      if (selectedSubcategorias) {
        query = query.contains("subcategorias_ids", [selectedSubcategorias]);
      }

      let productosConLab: Producto[];
      let count = 0;

      if (sortBy === "name_asc") {
        query = query.order("titulo", { ascending: true });
        const { data, error } = await query;
        if (error) {
          console.error("Error fetching filtered products:", error);
          return;
        }
        productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        count = productosConLab.length;
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab.slice(0, PAGE_SIZE));
        setTotalCount(count);
        setFilteredCount(count);
        setHasMore(productosConLab.length > PAGE_SIZE);
      } else if (sortBy === "price_asc" || sortBy === "price_desc") {
        const ascending = sortBy === "price_asc";
        query = query.order("precio", { ascending });
        const { data, error } = await query;
        if (error) {
          console.error("Error fetching filtered products:", error);
          return;
        }
        productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        count = productosConLab.length;
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab.slice(0, PAGE_SIZE));
        setTotalCount(count);
        setFilteredCount(count);
        setHasMore(productosConLab.length > PAGE_SIZE);
      } else {
        query = query.order("created_at", { ascending: false });
        const from = 0;
        const to = PAGE_SIZE - 1;
        const { data, error, count: totalCount } = await query.range(from, to);

        if (error) {
          console.error("Error fetching filtered products:", error);
          return;
        }

        productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        count = totalCount || productosConLab.length;
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab);
        setTotalCount(count);
        setFilteredCount(count);
        setHasMore((data?.length || 0) < count);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreFilteredProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const from = displayedProductos.length;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true);

      let labIds: string[] = [];
      if (searchTerm) {
        const { data: labs } = await supabase
          .from('laboratorios')
          .select('id')
          .ilike('nombre', `%${searchTerm}%`);
        if (labs && labs.length > 0) {
          labIds = labs.map(l => l.id);
        }
        query = query.or(`titulo.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%,drogas.ilike.%${searchTerm}%${labIds.length > 0 ? `,laboratorio_id.in.(${labIds.join(',')})` : ''}`);
      }
      if (selectedLabs) {
        query = query.eq("laboratorio_id", selectedLabs);
      }
      if (selectedEspecies.length > 0) {
        query = query.contains("especies", selectedEspecies);
      }
      if (selectedCategorias) {
        const subcatIds = subcategorias.filter(s => s.categoria_id === selectedCategorias).map(s => s.id);
        query = query.overlaps("subcategorias_ids", subcatIds);
      }
      if (selectedSubcategorias) {
        query = query.contains("subcategorias_ids", [selectedSubcategorias]);
      }

      if (sortBy === "name_asc") {
        query = query.order("titulo", { ascending: true });
      } else if (sortBy === "price_asc") {
        query = query.order("precio", { ascending: true });
      } else if (sortBy === "price_desc") {
        query = query.order("precio", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, count, error } = await query.range(from, to);

      if (error) {
        console.error("Error loading more filtered products:", error);
        return;
      }

      if (data) {
        const productosConLab = data.map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(prev => [...prev, ...productosConLab]);
        setDisplayedProductos(prev => [...prev, ...productosConLab]);
        setHasMore(data.length === PAGE_SIZE && displayedProductos.length + data.length < (count || 0));
        setFilteredCount(count || 0);
      }
    } catch (error) {
      console.error("Error loading more filtered products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadProductsSorted = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true);

      if (sortBy === "name_asc") {
        query = query.order("titulo", { ascending: true });
        const { data, count } = await query;
        const productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab.slice(0, PAGE_SIZE));
        setTotalCount(count || 0);
        setHasMore(productosConLab.length > PAGE_SIZE);
      } else if (sortBy === "price_asc") {
        query = query.order("precio", { ascending: true });
        const { data, count } = await query;
        const productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab.slice(0, PAGE_SIZE));
        setTotalCount(count || 0);
        setHasMore(productosConLab.length > PAGE_SIZE);
      } else if (sortBy === "price_desc") {
        query = query.order("precio", { ascending: false });
        const { data, count } = await query;
        const productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab.slice(0, PAGE_SIZE));
        setTotalCount(count || 0);
        setHasMore(productosConLab.length > PAGE_SIZE);
      } else {
        query = query.order("created_at", { ascending: false });
        const { data, count } = await query.range(0, PAGE_SIZE - 1);
        const productosConLab = (data || []).map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab);
        setTotalCount(count || 0);
        setHasMore((data?.length || 0) < (count || 0));
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasActiveFilters()) {
      loadFilteredProducts(true);
    } else {
      loadProductsSorted();
    }
  }, [searchTerm, selectedLabs, selectedEspecies, selectedCategorias, selectedSubcategorias, sortBy]);

  const filteredProducts = displayedProductos;

  const toggleEspecie = (especie: string) => {
    setSelectedEspecies(prev =>
      prev.includes(especie) ? prev.filter(e => e !== especie) : [...prev, especie]
    );
  };

  const clearFilters = () => {
    setSelectedLabs("");
    setSelectedEspecies([]);
    setSelectedCategorias("");
    setSelectedSubcategorias("");
    setSearchTerm("");
    setSortBy("newest");
    setFilteredCount(0);
    fetchInitialData();
  };

  const getSelectedEspeciesText = () => {
    if (selectedEspecies.length === 0) return "Todas las especies";
    if (selectedEspecies.length === 1) return especies.find(e => e.value === selectedEspecies[0])?.label || "Seleccionado";
    return `${selectedEspecies.length} especies`;
  };

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
      <motion.div 
        className="bg-[#2d5a27] py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] to-[#2d5a27] opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Catálogo de Productos
          </motion.h1>
          <motion.p 
            className="text-green-100 text-lg max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Encuentra los mejores insumos agrícolas y veterinarios para tu campo, filtrando por especies o laboratorio.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-20 pt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <motion.aside 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 sticky top-28 border border-gray-100">
              <motion.div 
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-800">
                  <i className="fas fa-filter text-[#2d5a27] mr-2"></i> Filtros
                </h2>
                <motion.button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-[#2d5a27] underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Limpiar
                </motion.button>
              </motion.div>

              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="searchInput"
                    placeholder="Ej. Ivermectina..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition"
                  />
                  <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        const url = new URL(window.location.href);
                        url.searchParams.delete("search");
                        window.history.pushState({}, "", url.toString());
                        loadProductsSorted();
                      }}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </motion.div>

              <hr className="border-gray-100 my-6" />

              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">Laboratorio</label>
                <motion.select 
                  id="labFilter"
                  value={selectedLabs}
                  onChange={(e) => setSelectedLabs(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none cursor-pointer"
                  whileFocus={{ borderColor: "#2d5a27", boxShadow: "0 0 0 2px rgba(45, 90, 39, 0.1)" }}
                >
                  <option value="">Todos los laboratorios</option>
                  {laboratorios.map((lab) => (
                    <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                  ))}
                </motion.select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </motion.div>

              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">Categoría</label>
                <motion.select 
                  id="catFilter"
                  value={selectedCategorias}
                  onChange={(e) => {
                    setSelectedCategorias(e.target.value);
                    setSelectedSubcategorias("");
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none cursor-pointer"
                  whileFocus={{ borderColor: "#2d5a27", boxShadow: "0 0 0 2px rgba(45, 90, 39, 0.1)" }}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </motion.select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </motion.div>

              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sub-Categoría</label>
                <motion.select 
                  id="subCatFilter"
                  value={selectedSubcategorias}
                  onChange={(e) => setSelectedSubcategorias(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none cursor-pointer"
                  whileFocus={{ borderColor: "#2d5a27", boxShadow: "0 0 0 2px rgba(45, 90, 39, 0.1)" }}
                >
                  <option value="">Todas las sub-categorías</option>
                  {subcategorias
                    .filter(s => !selectedCategorias || s.categoria_id === selectedCategorias)
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                    ))}
                </motion.select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </motion.div>

              <hr className="border-gray-100 my-6" />

              <motion.div 
                className="mb-6" 
                id="breedFilterContainer" 
                ref={breedDropdownRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">Especie Animal</label>
                <div className="relative">
                  <motion.button 
                    type="button" 
                    onClick={() => setBreedDropdownOpen(!breedDropdownOpen)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition text-left flex justify-between items-center"
                    whileHover={{ borderColor: "#2d5a27" }}
                  >
                    <span>{getSelectedEspeciesText()}</span>
                    <motion.i 
                      className={`fas fa-chevron-down text-gray-400 transition-transform ${breedDropdownOpen ? 'rotate-180' : ''}`}
                      animate={{ rotate: breedDropdownOpen ? 180 : 0 }}
                    ></motion.i>
                  </motion.button>
                  <motion.div 
                    className={`absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto ${breedDropdownOpen ? '' : 'hidden'}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: breedDropdownOpen ? 1 : 0, y: breedDropdownOpen ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2 space-y-1">
                      {especies.map((esp) => (
                        <label 
                          key={esp.value} 
                          className="flex items-center cursor-pointer group p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <input 
                            type="checkbox" 
                            value={esp.value}
                            checked={selectedEspecies.includes(esp.value)}
                            onChange={() => toggleEspecie(esp.value)}
                            className="w-5 h-5 rounded border-gray-300 text-[#2d5a27] focus:ring-[#2d5a27] mr-3"
                          />
                          <Image src={esp.icon} alt={esp.label} width={24} height={24} className="w-6 h-6 object-contain mr-2" />
                          <span className="text-gray-600 group-hover:text-[#2d5a27] transition flex-grow">{esp.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.aside>

          <section className="lg:w-3/4">
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="mb-2 sm:mb-0">
                {loading ? (
                  <span>Cargando...</span>
                ) : (
                  <>Mostrando <span className="font-bold text-gray-800">{totalCount}</span> productos</>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span>Ordenar por:</span>
                <motion.select 
                  id="sortFilter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2d5a27] cursor-pointer"
                  whileFocus={{ borderColor: "#2d5a27", boxShadow: "0 0 0 2px rgba(45, 90, 39, 0.1)" }}
                >
                  <option value="newest">Más recientes</option>
                  <option value="price_asc">Precio: Menor a Mayor</option>
                  <option value="price_desc">Precio: Mayor a Menor</option>
                  <option value="name_asc">Nombre: A-Z</option>
                </motion.select>
              </div>
            </motion.div>

            {loading ? (
              <motion.div 
                className="flex items-center justify-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-circle-notch fa-spin text-4xl text-[#2d5a27]"></i>
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  key={searchTerm + selectedLabs + selectedEspecies.join() + selectedCategorias + selectedSubcategorias + sortBy}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((producto, index) => (
                      <motion.div
                        key={producto.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                      >
                        <ProductCard producto={producto} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                {hasMore && (
                  <motion.div 
                    ref={loadMoreRef} 
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loadingMore ? 1 : 0.5 }}
                  >
                    {loadingMore ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Cargando más productos...</span>
                      </div>
                    ) : (
                      <div className="h-10"></div>
                    )}
                  </motion.div>
                )}

                {hasMore && !loadingMore && (
                  <motion.div 
                    className="mt-4 text-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>Scroll para cargar más productos</span>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <i className="fas fa-box-open text-6xl text-gray-200 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-6">Intenta modificar tus filtros de búsqueda.</p>
                <motion.button 
                  onClick={clearFilters}
                  className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-2 rounded-full font-medium transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Limpiar filtros
                </motion.button>
              </motion.div>
            )}
          </section>
        </div>
      </div>
      </main>

      <Footer />
    </>
  );
}
