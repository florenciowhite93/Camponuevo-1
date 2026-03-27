export type Especie = 'bovino' | 'ovino' | 'porcino' | 'equino' | 'felino' | 'canino';

export interface Producto {
  id: string;
  titulo: string;
  precio: number;
  laboratorio_id: string;
  laboratorio_nombre?: string;
  imagen: string;
  descripcion: string;
  volumen: string;
  drogas: string;
  dosis: string;
  indicaciones: string;
  especies: Especie[];
  etiquetas_ids: string[];
  subcategorias_ids: string[];
  link_externo: string;
  visible: boolean;
  created_at?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono_svg: string;
  orden: number;
  subcategorias?: Subcategoria[];
}

export interface Subcategoria {
  id: string;
  nombre: string;
  categoria_id: string;
}

export interface Laboratorio {
  id: string;
  nombre: string;
}

export interface Etiqueta {
  id: string;
  nombre: string;
  color: string;
}

export interface Pedido {
  id: string;
  usuario_id: string;
  productos: { producto_id: string; cantidad: number; precio: number }[];
  total: number;
  estado: 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado';
  created_at: string;
  cliente?: Perfil;
}

export interface Perfil {
  id: string;
  email: string;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface SeccionLanding {
  id: string;
  tipo: 'hero' | 'categorias' | 'productos' | 'testimonios' | 'newsletter';
  orden: number;
  activa: boolean;
  config: HeroConfig | CategoriasConfig | ProductosConfig | TestimoniosConfig | NewsletterConfig;
}

export interface HeroConfig {
  titulo: string;
  subtitulo: string;
  cta_texto: string;
  cta_url: string;
  imagen_fondo: string;
}

export interface CategoriasConfig {
  titulo: string;
  descripcion: string;
  categorias: {
    categoria_id: string;
    nombre: string;
    icono_svg: string;
  }[];
}

export interface ProductosConfig {
  titulo: string;
  descripcion: string;
  subcategorias_ids: string[];
  max_productos: number;
}

export interface TestimoniosConfig {
  titulo: string;
  testimonios: {
    texto: string;
    autor: string;
    rol: string;
    avatar: string;
  }[];
}

export interface NewsletterConfig {
  titulo: string;
  descripcion: string;
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

export const ESPECIES: { value: Especie; label: string }[] = [
  { value: 'bovino', label: 'Bovino' },
  { value: 'ovino', label: 'Ovino' },
  { value: 'porcino', label: 'Porcino' },
  { value: 'equino', label: 'Equino' },
  { value: 'felino', label: 'Felino' },
  { value: 'canino', label: 'Canino' },
];

export const ETIQUETA_COLORES = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#1b5e20',
];
