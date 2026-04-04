-- ================================================
-- MIGRACIÓN: Agregar columna is_admin y limpiar RLS
-- Fecha: 2026-04-04
-- ================================================

-- 1. AGREGAR COLUMNA is_admin A PERFILES
-- Esta columna es necesaria para las políticas RLS de admin
ALTER TABLE public.perfiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. LIMPIAR POLÍTICAS CONFLICTIVAS EN PRODUCTOS
-- Eliminar políticas basadas en "Service role" que dan acceso total
DROP POLICY IF EXISTS "Service role can insert products" ON public.productos;
DROP POLICY IF EXISTS "Service role can update products" ON public.productos;
DROP POLICY IF EXISTS "Service role can delete products" ON public.productos;

-- 3. LIMPIAR POLÍTICAS CONFLICTIVAS EN PEDIDOS (si existen)
DROP POLICY IF EXISTS "Users can update own orders" ON public.pedidos;

-- 4. CREAR FUNCIÓN is_admin() PARA RLS
-- Función helper para verificar si el usuario actual es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.perfiles
    WHERE id = auth.uid()
    AND is_admin = true
  );
$$ LANGUAGE sql STABLE;

-- 5. CREAR POLÍTICAS RLS CORRECTAS PARA PRODUCTOS
-- Lectura pública solo de productos visibles
DROP POLICY IF EXISTS "Allow public read visible products" ON public.productos;
CREATE POLICY "Allow public read visible products" ON public.productos
  FOR SELECT USING (visible = true);

-- Admin puede hacer CRUD completo
DROP POLICY IF EXISTS "Allow admin full access products" ON public.productos;
CREATE POLICY "Allow admin full access products" ON public.productos
  FOR ALL USING (public.is_admin());

-- 6. CREAR POLÍTICAS RLS PARA PEDIDOS
-- Usuarios ven solo sus pedidos
DROP POLICY IF EXISTS "Users can view own orders" ON public.pedidos;
CREATE POLICY "Users can view own orders" ON public.pedidos
  FOR SELECT USING (auth.uid() = usuario_id);

-- Admin puede ver todos los pedidos
DROP POLICY IF EXISTS "Admin can view all orders" ON public.pedidos;
CREATE POLICY "Admin can view all orders" ON public.pedidos
  FOR SELECT USING (public.is_admin());

-- 7. CREAR POLÍTICAS RLS PARA PERFILES
-- Usuarios ven solo su perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.perfiles;
CREATE POLICY "Users can view own profile" ON public.perfiles
  FOR SELECT USING (auth.uid() = id);

-- ================================================
-- INSTRUCCIONES IMPORTANTES
-- ================================================

-- Para asignar admin a un usuario específico, ejecutar:
-- (Reemplazar 'TU_USER_UUID' con el UUID del usuario)
--
-- UPDATE public.perfiles 
-- SET is_admin = true 
-- WHERE id = 'TU_USER_UUID';

-- Para verificar qué usuarios son admins:
-- SELECT id, email, is_admin FROM public.perfiles WHERE is_admin = true;

-- Para verificar el estado de las políticas:
-- SELECT policyname, tablename, cmd, permissive 
-- FROM pg_policies 
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
