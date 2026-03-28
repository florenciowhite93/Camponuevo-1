-- Camponuevo Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.perfiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  telefono TEXT,
  direccion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de laboratorios
CREATE TABLE IF NOT EXISTS public.laboratorios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de etiquetas
CREATE TABLE IF NOT EXISTS public.etiquetas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#2d5a27',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  icono_svg TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de subcategorías
CREATE TABLE IF NOT EXISTS public.subcategorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  precio DECIMAL(12, 2) DEFAULT 0,
  laboratorio_id UUID REFERENCES public.laboratorios(id) ON DELETE SET NULL,
  imagen TEXT,
  descripcion TEXT,
  volumen TEXT,
  drogas TEXT,
  dosis TEXT,
  especies TEXT[] DEFAULT '{}',
  etiquetas_ids UUID[] DEFAULT '{}',
  subcategorias_ids UUID[] DEFAULT '{}',
  link_externo TEXT,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de secciones de landing
CREATE TABLE IF NOT EXISTS public.secciones_landing (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('hero', 'categorias', 'productos', 'testimonios', 'newsletter')),
  orden INTEGER DEFAULT 0,
  activa BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id TEXT UNIQUE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT,
  provincia TEXT,
  ciudad TEXT,
  direccion TEXT,
  codigo_postal TEXT,
  productos JSONB DEFAULT '[]',
  notas TEXT,
  total DECIMAL(12, 2) DEFAULT 0,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de newsletter subscribers
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_laboratorio ON public.productos(laboratorio_id);
CREATE INDEX IF NOT EXISTS idx_productos_visible ON public.productos(visible);
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario ON public.pedidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON public.pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_order_id ON public.pedidos(order_id);

-- Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, email, nombre)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'nombre');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security (RLS)

-- Habilitar RLS
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratorios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.etiquetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secciones_landing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (usar DROP POLICY IF EXISTS para evitar duplicados)

-- Perfiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.perfiles;
CREATE POLICY "Users can view own profile" ON public.perfiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.perfiles FOR UPDATE USING (auth.uid() = id);

-- Productos
DROP POLICY IF EXISTS "Anyone can view visible products" ON public.productos;
DROP POLICY IF EXISTS "Service role can insert products" ON public.productos;
DROP POLICY IF EXISTS "Service role can update products" ON public.productos;
DROP POLICY IF EXISTS "Service role can delete products" ON public.productos;
CREATE POLICY "Anyone can view visible products" ON public.productos FOR SELECT USING (visible = true);
CREATE POLICY "Service role can insert products" ON public.productos FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update products" ON public.productos FOR UPDATE USING (true);
CREATE POLICY "Service role can delete products" ON public.productos FOR DELETE USING (true);

-- Categorías
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categorias;
DROP POLICY IF EXISTS "Service role can manage categories" ON public.categorias;
CREATE POLICY "Anyone can view categories" ON public.categorias FOR SELECT USING (true);
CREATE POLICY "Service role can manage categories" ON public.categorias FOR ALL USING (true);

-- Subcategorías
DROP POLICY IF EXISTS "Anyone can view subcategories" ON public.subcategorias;
DROP POLICY IF EXISTS "Service role can manage subcategories" ON public.subcategorias;
CREATE POLICY "Anyone can view subcategories" ON public.subcategorias FOR SELECT USING (true);
CREATE POLICY "Service role can manage subcategories" ON public.subcategorias FOR ALL USING (true);

-- Laboratorios
DROP POLICY IF EXISTS "Anyone can view laboratories" ON public.laboratorios;
DROP POLICY IF EXISTS "Service role can manage laboratories" ON public.laboratorios;
CREATE POLICY "Anyone can view laboratories" ON public.laboratorios FOR SELECT USING (true);
CREATE POLICY "Service role can manage laboratories" ON public.laboratorios FOR ALL USING (true);

-- Etiquetas
DROP POLICY IF EXISTS "Anyone can view labels" ON public.etiquetas;
DROP POLICY IF EXISTS "Service role can manage labels" ON public.etiquetas;
CREATE POLICY "Anyone can view labels" ON public.etiquetas FOR SELECT USING (true);
CREATE POLICY "Service role can manage labels" ON public.etiquetas FOR ALL USING (true);

-- Secciones landing
DROP POLICY IF EXISTS "Anyone can view landing sections" ON public.secciones_landing;
DROP POLICY IF EXISTS "Service role can manage landing sections" ON public.secciones_landing;
CREATE POLICY "Anyone can view landing sections" ON public.secciones_landing FOR SELECT USING (true);
CREATE POLICY "Service role can manage landing sections" ON public.secciones_landing FOR ALL USING (true);

-- Pedidos
DROP POLICY IF EXISTS "Anyone can view own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.pedidos;
DROP POLICY IF EXISTS "Users can update own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Service role can manage all orders" ON public.pedidos;
CREATE POLICY "Anyone can view own orders" ON public.pedidos FOR SELECT USING (auth.uid() = usuario_id OR auth.uid() IS NULL);
CREATE POLICY "Anyone can create orders" ON public.pedidos FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own orders" ON public.pedidos FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Service role can manage all orders" ON public.pedidos FOR ALL USING (true);

-- Subscribers
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Service role can manage subscribers" ON public.subscribers;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can manage subscribers" ON public.subscribers FOR ALL USING (true);

-- Insertar datos de ejemplo (solo si no existen)
INSERT INTO public.laboratorios (nombre) VALUES
  ('Konig'),
  ('Boehringer Ingelheim'),
  ('Zoovet'),
  ('Richmond'),
  ('Leon Pharma'),
  ('Over'),
  ('Zoetis'),
  ('Biogenesis Bago'),
  ('MSD'),
  ('Tecnovax')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO public.etiquetas (nombre, color) VALUES
  ('Destacado', '#ef4444'),
  ('Nuevo', '#3b82f6'),
  ('Oferta', '#22c55e'),
  ('Liquidación', '#f97316'),
  ('Próximamente', '#8b5cf6')
ON CONFLICT DO NOTHING;

INSERT INTO public.categorias (nombre, icono_svg, orden) VALUES
  ('Veterinaria', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/></svg>', 1),
  ('Bovinos', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>', 2),
  ('Ovinos', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>', 3),
  ('Equinos', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 4c-1.5 0-2.77 1.12-3.06 2.58-.28-.14-.59-.22-.94-.22-1.12 0-2.05.78-2.27 1.82-.28-.14-.59-.22-.94-.22-.87 0-1.58.71-1.58 1.58 0 .78.57 1.42 1.31 1.55-.03.17-.06.33-.06.51 0 1.1.9 2 2 2h5.04c1.1 0 2-.9 2-2 0-.18-.03-.34-.06-.51.74-.13 1.31-.77 1.31-1.55 0-.87-.71-1.58-1.58-1.58-.35 0-.66.08-.94.22C19.77 5.12 18.5 4 18.5 4z"/></svg>', 4)
ON CONFLICT DO NOTHING;
