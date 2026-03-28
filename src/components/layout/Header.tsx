"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { cn, createSlug } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useCarrito } from "@/context/CarritoContext";
import type { Producto } from "@/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const supabase = createClient();

export function Header() {
  const router = useRouter();
  const { totalItems, toggleCart } = useCarrito();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Producto[]>([]);
  const [searchResults, setSearchResults] = useState<Producto[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await supabase
          .from("productos")
          .select("id, titulo, laboratorio_id, laboratorio:laboratorios(nombre), imagen, precio, descripcion, drogas")
          .eq("visible", true);
        if (data) {
          const productosConLab = data.map((p: any) => ({
            id: p.id,
            titulo: p.titulo,
            precio: p.precio,
            laboratorio_id: p.laboratorio_id,
            laboratorio_nombre: p.laboratorio?.nombre,
            imagen: p.imagen,
            descripcion: p.descripcion || "",
            volumen: "",
            drogas: p.drogas || "",
            dosis: "",
            indicaciones: "",
            especies: [],
            etiquetas_ids: [],
            subcategorias_ids: [],
            link_externo: "",
            visible: true,
          }));
          setProducts(productosConLab);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const query = value.toLowerCase().trim();

    if (query.length < 2) {
      showSuggestions(query);
      setSearchResults([]);
      return;
    }

    const matches = products.filter((p) => {
      const searchText = [
        p.titulo || "",
        p.laboratorio_nombre || "",
        p.descripcion || "",
        p.drogas || "",
      ].join(" ").toLowerCase();
      return searchText.includes(query);
    });

    if (matches.length > 0) {
      setSearchResults(matches.slice(0, 5));
      setSuggestions([]);
    } else {
      setSearchResults([]);
      showSuggestions(query);
    }
  };

  const showSuggestions = (query: string) => {
    const words = new Set<string>();
    products.forEach((p) => {
      if (p.titulo) {
        p.titulo.split(" ").forEach((word) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z0-9áéíóúñü]/g, "");
          if (cleanWord.length >= 3) {
            words.add(cleanWord);
          }
        });
      }
      if (p.laboratorio_nombre) {
        p.laboratorio_nombre.split(" ").forEach((word) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z0-9áéíóúñü]/g, "");
          if (cleanWord.length >= 3) {
            words.add(cleanWord);
          }
        });
      }
    });

    const filtered = Array.from(words)
      .filter((word) => word.includes(query.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (word: string) => {
    setSearchTerm(word);
    handleSearch(word);
    searchInputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/85"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10">
                <svg viewBox="0 0 82.99 82.99" className="w-full h-full">
                  <defs>
                    <style>
                      {`.cls-1 { fill: #0a92cf; } .cls-2 { fill: #03a84d; }`}
                    </style>
                  </defs>
                  <g>
                    <path className="cls-1" d="M82.99,41.49c0,3.01-.32,5.95-.93,8.77-8.39-13.6-23.44-22.69-40.56-22.69S9.32,36.66.93,50.27c-.61-2.83-.93-5.76-.93-8.78C0,18.58,18.58,0,41.5,0s41.49,18.58,41.49,41.49Z"/>
                    <path className="cls-2" d="M80.49,55.64c-5.77,15.96-21.05,27.35-38.99,27.35S8.28,71.59,2.49,55.65c7.18-14.27,21.97-24.08,39.01-24.08s31.81,9.81,38.99,24.07Z"/>
                  </g>
                </svg>
              </div>
              <span className="flex flex-col items-center text-xl font-bold font-serif bg-gradient-to-r from-[#03a84d] to-[#038C41] bg-clip-text text-transparent uppercase leading-none gap-0">
                CAMPO
                <span>NUEVO</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#2d5a27] font-medium transition"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="text-gray-700 hover:text-[#2d5a27] font-medium transition"
              >
                Catálogo
              </Link>
              <Link
                href="/nosotros"
                onClick={(e) => {
                  if (window.location.pathname === '/nosotros') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-[#2d5a27] font-medium transition"
              >
                Nosotros
              </Link>
              <Link
                href="/nosotros#contacto"
                onClick={(e) => {
                  if (window.location.pathname === '/nosotros') {
                    e.preventDefault();
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-[#2d5a27] font-medium transition"
              >
                Contacto
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-[#2d5a27] transition hover:bg-gray-100 rounded-full"
                >
                  <Search size={22} />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[100]">
                    {/* Search Input */}
                    <form onSubmit={handleSubmit}>
                      <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                          <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setIsSearchOpen(true)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent text-sm"
                            autoFocus
                          />
                          <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>
                      </div>
                    </form>

                    {/* Search Results */}
                    <div className="max-h-64 overflow-y-auto">
                      {searchTerm.length < 2 ? (
                        suggestions.length > 0 ? (
                          <>
                            <div className="p-3 border-b border-gray-100 bg-gray-50">
                              <p className="text-xs text-gray-500">Sugerencias:</p>
                            </div>
                            {suggestions.map((word) => (
                              <button
                                key={word}
                                onClick={() => handleSuggestionClick(word)}
                                className="w-full p-3 hover:bg-gray-50 cursor-pointer transition flex items-center gap-2 border-b border-gray-50 last:border-0 text-left"
                              >
                                <i className="fas fa-search text-gray-400 text-xs"></i>
                                <span className="text-sm text-gray-700">
                                  {searchTerm}<strong>{word.substring(searchTerm.length)}</strong>
                                </span>
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm italic">
                            Escribe al menos 2 caracteres para buscar
                          </div>
                        )
                      ) : searchResults.length > 0 ? (
                        searchResults.map((product) => {
                          const productSlug = `${createSlug(product.titulo)}`;
                          return (
                          <Link
                            key={product.id}
                            href={`/catalogo/${productSlug}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchTerm("");
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                          >
                            <div className="w-10 h-10 flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden p-1">
                              {product.imagen ? (
                                <Image
                                  src={product.imagen}
                                  alt={product.titulo}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <i className="fas fa-image text-gray-300 text-xs"></i>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-800 truncate">{product.titulo}</h4>
                              <p className="text-[11px] text-gray-400 uppercase font-bold">
                                {product.laboratorio_nombre || "Varios"}
                              </p>
                            </div>
                            <div className="text-xs font-black text-[#2d5a27]">
                              {product.precio > 0 ? formatPrice(product.precio) : "Consultar"}
                            </div>
                          </Link>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm italic">
                          No se encontraron productos para &quot;{searchTerm}&quot;
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                      <Link
                        href={`/catalogo${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchTerm("");
                        }}
                        className="text-xs font-bold text-[#2d5a27] hover:underline"
                      >
                        Ver todos los resultados
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-[#2d5a27] transition hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div ref={userMenuRef} className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#2d5a27] transition p-2 rounded-full hover:bg-gray-100"
                    >
                      <div className="w-8 h-8 bg-[#2d5a27] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="hidden md:inline text-sm font-medium">{user.email?.split("@")[0]}</span>
                      <i className="fas fa-chevron-down text-xs"></i>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[1000]">
                        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                          <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/cuenta"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <i className="fas fa-user-circle w-6 text-[#2d5a27]"></i>
                          <span className="ml-2">Mi Cuenta</span>
                        </Link>
                        <Link
                          href="/cuenta?tab=pedidos"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <i className="fas fa-box w-6 text-[#2d5a27]"></i>
                          <span className="ml-2">Historial de Pedidos</span>
                        </Link>
                        <Link
                          href="/cuenta?tab=direcciones"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <i className="fas fa-map-marker-alt w-6 text-[#2d5a27]"></i>
                          <span className="ml-2">Mis Direcciones</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition rounded-b-xl"
                        >
                          <i className="fas fa-sign-out-alt w-6"></i>
                          <span className="ml-2">Cerrar Sesión</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#2d5a27] to-[#1b5e20] hover:from-[#1b5e20] hover:to-black text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-md"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Iniciar sesión</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
              >
                Catálogo
              </Link>
              <Link
                href="/nosotros"
                onClick={(e) => {
                  if (window.location.pathname === '/nosotros') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
              >
                Nosotros
              </Link>
              <Link
                href="/nosotros#contacto"
                onClick={(e) => {
                  if (window.location.pathname === '/nosotros') {
                    e.preventDefault();
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
              >
                Contacto
              </Link>
              {user ? (
                <>
                  <Link
                    href="/cuenta"
                    className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
                  >
                    Mi Cuenta
                  </Link>
                  <Link
                    href="/cuenta?tab=pedidos"
                    className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
                  >
                    Mis Pedidos
                  </Link>
                  <Link
                    href="/cuenta?tab=direcciones"
                    className="text-gray-700 hover:text-[#2d5a27] font-medium py-2"
                  >
                    Mis Direcciones
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium py-2 text-left"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-[#2d5a27] to-[#1b5e20] hover:from-[#1b5e20] hover:to-black text-white px-5 py-3 rounded-full font-bold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Iniciar sesión
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}