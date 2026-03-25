"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
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
    fetchInitialData();
    
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !hasActiveFilters()) {
          loadMoreProducts();
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

      const { data, error, count } = await supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true)
        .order("created_at", { ascending: false })
        .range(from, to);

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

  const loadFilteredProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("productos")
        .select(`*, laboratorio:laboratorios(nombre)`, { count: 'exact' })
        .eq("visible", true)
        .order("created_at", { ascending: false });

      const { data, count } = await query;

      if (data) {
        const productosConLab = data.map((p: { laboratorio?: { nombre: string } } & Producto) => ({
          ...p,
          laboratorio_nombre: p.laboratorio?.nombre,
        }));
        setAllProductos(productosConLab);
        setDisplayedProductos(productosConLab);
        setTotalCount(count || 0);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasActiveFilters()) {
      loadFilteredProducts();
    } else {
      if (allProductos.length === 0) {
        fetchInitialData();
      } else {
        setDisplayedProductos(allProductos);
        setHasMore(allProductos.length < totalCount);
      }
    }
  }, [searchTerm, selectedLabs, selectedEspecies, selectedCategorias, selectedSubcategorias]);

  const filteredProducts = displayedProductos
    .filter((p) => {
      const matchesSearch = searchTerm === "" || 
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.drogas && p.drogas.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLab = !selectedLabs || p.laboratorio_id === selectedLabs;
      const matchesEspecie = selectedEspecies.length === 0 || p.especies?.some((e) => selectedEspecies.includes(e));
      
      let matchesCategoria = true;
      if (selectedCategorias) {
        matchesCategoria = p.subcategorias_ids?.some((s) => {
          const sub = subcategorias.find(sub => sub.id === s);
          return sub?.categoria_id === selectedCategorias;
        });
      }

      let matchesSubcategoria = true;
      if (selectedSubcategorias) {
        matchesSubcategoria = p.subcategorias_ids?.includes(selectedSubcategorias);
      }

      return matchesSearch && matchesLab && matchesEspecie && matchesCategoria && matchesSubcategoria;
    })
    .sort((a, b) => {
      if (sortBy === "name_asc") return a.titulo.localeCompare(b.titulo);
      if (sortBy === "price_asc") return a.precio - b.precio;
      if (sortBy === "price_desc") return b.precio - a.precio;
      return 0;
    });

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
  };

  const getSelectedEspeciesText = () => {
    if (selectedEspecies.length === 0) return "Todas las especies";
    if (selectedEspecies.length === 1) return especies.find(e => e.value === selectedEspecies[0])?.label || "Seleccionado";
    return `${selectedEspecies.length} especies`;
  };

  return (
    <>
      <Header cartCount={0} />

      <main className="flex-1 pt-20">
      <div className="bg-[#2d5a27] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] to-[#2d5a27] opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Catálogo de Productos</h1>
          <p className="text-green-100 text-lg max-w-3xl">Encuentra los mejores insumos agrícolas y veterinarios para tu campo, filtrando por especies o laboratorio.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-20 pt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 sticky top-28 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  <i className="fas fa-filter text-[#2d5a27] mr-2"></i> Filtros
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-[#2d5a27] underline"
                >
                  Limpiar
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="searchInput"
                    placeholder="Ej. Ivermectina..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition"
                  />
                  <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              <div className="mb-6" id="breedFilterContainer" ref={breedDropdownRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Especie Animal</label>
                <div className="relative">
                  <button 
                    type="button" 
                    onClick={() => setBreedDropdownOpen(!breedDropdownOpen)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition text-left flex justify-between items-center"
                  >
                    <span>{getSelectedEspeciesText()}</span>
                    <i className={`fas fa-chevron-down text-gray-400 transition-transform ${breedDropdownOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto ${breedDropdownOpen ? '' : 'hidden'}`}>
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
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Laboratorio</label>
                <select 
                  id="labFilter"
                  value={selectedLabs}
                  onChange={(e) => setSelectedLabs(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none"
                >
                  <option value="">Todos los laboratorios</option>
                  {laboratorios.map((lab) => (
                    <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                  ))}
                </select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Categoría</label>
                <select 
                  id="catFilter"
                  value={selectedCategorias}
                  onChange={(e) => {
                    setSelectedCategorias(e.target.value);
                    setSelectedSubcategorias("");
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none"
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sub-Categoría</label>
                <select 
                  id="subCatFilter"
                  value={selectedSubcategorias}
                  onChange={(e) => setSelectedSubcategorias(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent transition appearance-none"
                >
                  <option value="">Todas las sub-categorías</option>
                  {subcategorias
                    .filter(s => !selectedCategorias || s.categoria_id === selectedCategorias)
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                    ))}
                </select>
                <div className="relative pointer-events-none">
                  <i className="fas fa-chevron-down absolute bottom-3.5 right-4 text-gray-400"></i>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div className="mb-2 sm:mb-0">
                {loading ? (
                  <span>Cargando...</span>
                ) : (
                  <>Mostrando <span className="font-bold text-gray-800">{filteredProducts.length}</span> productos</>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span>Ordenar por:</span>
                <select 
                  id="sortFilter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]"
                >
                  <option value="newest">Más recientes</option>
                  <option value="price_asc">Precio: Menor a Mayor</option>
                  <option value="price_desc">Precio: Mayor a Menor</option>
                  <option value="name_asc">Nombre: A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-[#2d5a27]"></i>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                  ))}
                </div>
                
                {hasMore && !hasActiveFilters() && (
                  <div ref={loadMoreRef} className="mt-8 flex justify-center">
                    {loadingMore ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Cargando más productos...</span>
                      </div>
                    ) : (
                      <div className="h-10"></div>
                    )}
                  </div>
                )}

                {hasMore && !hasActiveFilters() && !loadingMore && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <span>Scroll para cargar más productos</span>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                <i className="fas fa-box-open text-6xl text-gray-200 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-6">Intenta modificar tus filtros de búsqueda.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-[#2d5a27] hover:bg-[#1b5e20] text-white px-6 py-2 rounded-full font-medium transition"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      </main>

      <footer className="bg-[#1b5e20] text-white pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fas fa-seedling text-[#2d5a27] text-xl"></i>
                </div>
                <span className="ml-2 text-2xl font-bold">Camponuevo</span>
              </div>
              <p className="text-gray-400 mb-6 font-light">Tu tienda agropecuaria de confianza para productos naturales, veterinarios y agrícolas.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Menú Principal</h3>
              <ul className="space-y-3 font-light text-gray-300">
                <li><Link href="/" className="hover:text-[#8bc34a] transition flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Inicio</Link></li>
                <li><Link href="/catalogo" className="hover:text-[#8bc34a] transition flex items-center text-[#8bc34a]"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Catálogo</Link></li>
                <li><Link href="/nosotros" className="hover:text-[#8bc34a] transition flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Nosotros</Link></li>
                <li><Link href="/nosotros#contacto" className="hover:text-[#8bc34a] transition flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#2d5a27]"></i> Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Camponuevo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
