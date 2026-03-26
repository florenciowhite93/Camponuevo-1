-- Políticas RLS para proteger tablas administrativas
-- Ejecutar en Supabase SQL Editor

-- ============================================
-- Helper function para verificar si es admin
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.perfiles
    WHERE id = auth.uid()
    AND is_admin = true
  );
$$ LANGUAGE sql STABLE;

-- ============================================
-- PRODUCTOS
-- ============================================
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "productos_public_read" ON public.productos;
CREATE POLICY "productos_public_read" ON public.productos
  FOR SELECT USING (visible = true);

DROP POLICY IF EXISTS "productos_admin_all" ON public.productos;
CREATE POLICY "productos_admin_all" ON public.productos
  FOR ALL USING (public.is_admin());

-- ============================================
-- CATEGORÍAS
-- ============================================
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categorias_public_read" ON public.categorias;
CREATE POLICY "categorias_public_read" ON public.categorias
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "categorias_admin_all" ON public.categorias;
CREATE POLICY "categorias_admin_all" ON public.categorias
  FOR ALL USING (public.is_admin());

-- ============================================
-- SUBCATEGORÍAS
-- ============================================
ALTER TABLE public.subcategorias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subcategorias_public_read" ON public.subcategorias;
CREATE POLICY "subcategorias_public_read" ON public.subcategorias
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "subcategorias_admin_all" ON public.subcategorias;
CREATE POLICY "subcategorias_admin_all" ON public.subcategorias
  FOR ALL USING (public.is_admin());

-- ============================================
-- LABORATORIOS
-- ============================================
ALTER TABLE public.laboratorios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "laboratorios_public_read" ON public.laboratorios;
CREATE POLICY "laboratorios_public_read" ON public.laboratorios
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "laboratorios_admin_all" ON public.laboratorios;
CREATE POLICY "laboratorios_admin_all" ON public.laboratorios
  FOR ALL USING (public.is_admin());

-- ============================================
-- ETIQUETAS
-- ============================================
ALTER TABLE public.etiquetas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "etiquetas_public_read" ON public.etiquetas;
CREATE POLICY "etiquetas_public_read" ON public.etiquetas
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "etiquetas_admin_all" ON public.etiquetas;
CREATE POLICY "etiquetas_admin_all" ON public.etiquetas
  FOR ALL USING (public.is_admin());

-- ============================================
-- PEDIDOS
-- ============================================
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

-- Lectura: solo el propio usuario puede ver sus pedidos, admins ven todos
DROP POLICY IF EXISTS "pedidos_read" ON public.pedidos;
CREATE POLICY "pedidos_read" ON public.pedidos
  FOR SELECT USING (
    auth.uid() = cliente_id OR public.is_admin()
  );

DROP POLICY IF EXISTS "pedidos_insert" ON public.pedidos;
CREATE POLICY "pedidos_insert" ON public.pedidos
  FOR INSERT WITH CHECK (auth.uid() = cliente_id);

DROP POLICY IF EXISTS "pedidos_update" ON public.pedidos;
CREATE POLICY "pedidos_update" ON public.pedidos
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- PERFILES (datos de usuarios)
-- ============================================
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

-- Lectura: cada usuario puede ver su propio perfil, admins ven todos
DROP POLICY IF EXISTS "perfiles_read" ON public.perfiles;
CREATE POLICY "perfiles_read" ON public.perfiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin()
  );

-- Actualización: cada usuario puede editar su propio perfil
DROP POLICY IF EXISTS "perfiles_update_own" ON public.perfiles;
CREATE POLICY "perfiles_update_own" ON public.perfiles
  FOR UPDATE USING (auth.uid() = id);

-- Los admins pueden editar cualquier perfil
DROP POLICY IF EXISTS "perfiles_admin_update" ON public.perfiles;
CREATE POLICY "perfiles_admin_update" ON public.perfiles
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- DIRECCIONES
-- ============================================
ALTER TABLE public.direcciones ENABLE ROW LEVEL SECURITY;

-- Lectura: solo el propio usuario puede ver sus direcciones
DROP POLICY IF EXISTS "direcciones_read" ON public.direcciones;
CREATE POLICY "direcciones_read" ON public.direcciones
  FOR SELECT USING (auth.uid() = usuario_id);

-- Inserción: solo el propio usuario puede agregar direcciones
DROP POLICY IF EXISTS "direcciones_insert" ON public.direcciones;
CREATE POLICY "direcciones_insert" ON public.direcciones
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Actualización: solo el propio usuario puede editar
DROP POLICY IF EXISTS "direcciones_update" ON public.direcciones;
CREATE POLICY "direcciones_update" ON public.direcciones
  FOR UPDATE USING (auth.uid() = usuario_id);

-- Eliminación: solo el propio usuario puede eliminar
DROP POLICY IF EXISTS "direcciones_delete" ON public.direcciones;
CREATE POLICY "direcciones_delete" ON public.direcciones
  FOR DELETE USING (auth.uid() = usuario_id);

-- ============================================
-- LANDING SECCIONES (contenido público)
-- ============================================
ALTER TABLE public.landing_secciones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "landing_secciones_public_read" ON public.landing_secciones;
CREATE POLICY "landing_secciones_public_read" ON public.landing_secciones
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "landing_secciones_admin_all" ON public.landing_secciones;
CREATE POLICY "landing_secciones_admin_all" ON public.landing_secciones
  FOR ALL USING (public.is_admin());
