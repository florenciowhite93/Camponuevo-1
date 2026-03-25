-- ═══════════════════════════════════════════════════════════════
-- LIMPIEZA DE BASE DE DATOS - CAMPO NUEVO
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PASO 1: LIMPIAR TABLA PERFILES
-- Quitar campos duplicados de dirección (ya existen en direcciones)
-- ═══════════════════════════════════════════════════════════════

-- Verificar estado actual
SELECT 'Estado actual de perfiles:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'perfiles' 
ORDER BY ordinal_position;

-- Eliminar columnas de dirección de perfiles (si existen)
ALTER TABLE public.perfiles DROP COLUMN IF EXISTS provincia;
ALTER TABLE public.perfiles DROP COLUMN IF EXISTS ciudad;
ALTER TABLE public.perfiles DROP COLUMN IF EXISTS direccion;
ALTER TABLE public.perfiles DROP COLUMN IF EXISTS codigo_postal;

-- Verificar estructura limpia
SELECT 'Estructura limpia de perfiles:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'perfiles' 
ORDER BY ordinal_position;

-- ═══════════════════════════════════════════════════════════════
-- PASO 2: ASEGURAR TABLA DIRECCIONES
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.direcciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nombre TEXT,
  provincia TEXT,
  ciudad TEXT,
  direccion TEXT NOT NULL,
  codigo_postal TEXT,
  es_predeterminada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- PASO 3: RLS POLICIES
-- ═══════════════════════════════════════════════════════════════

-- Perfiles
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.perfiles;

CREATE POLICY "Users can view own profile" ON public.perfiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.perfiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.perfiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Direcciones
ALTER TABLE public.direcciones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own addresses" ON public.direcciones;
DROP POLICY IF EXISTS "Users can insert own addresses" ON public.direcciones;
DROP POLICY IF EXISTS "Users can update own addresses" ON public.direcciones;
DROP POLICY IF EXISTS "Users can delete own addresses" ON public.direcciones;

CREATE POLICY "Users can view own addresses" ON public.direcciones 
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert own addresses" ON public.direcciones 
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update own addresses" ON public.direcciones 
  FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete own addresses" ON public.direcciones 
  FOR DELETE USING (auth.uid() = usuario_id);

-- ═══════════════════════════════════════════════════════════════
-- PASO 4: VERIFICACIÓN FINAL
-- ═══════════════════════════════════════════════════════════════

SELECT '✅ Migración completada' as status;
SELECT 'Columnas de perfiles:' as info;
SELECT column_name FROM information_schema.columns WHERE table_name = 'perfiles' ORDER BY ordinal_position;
SELECT 'Políticas de perfiles:' as info;
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'perfiles';
SELECT 'Políticas de direcciones:' as info;
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'direcciones';
