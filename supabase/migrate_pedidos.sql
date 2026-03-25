-- MIGRACIÓN: Agregar columnas a tabla pedidos
-- Ejecutar en Supabase SQL Editor
-- Este script es idempotente - se puede ejecutar varias veces sin problemas

-- 1. Agregar columnas faltantes
ALTER TABLE public.pedidos 
ADD COLUMN IF NOT EXISTS order_id TEXT,
ADD COLUMN IF NOT EXISTS cliente_nombre TEXT,
ADD COLUMN IF NOT EXISTS cliente_email TEXT,
ADD COLUMN IF NOT EXISTS cliente_telefono TEXT,
ADD COLUMN IF NOT EXISTS provincia TEXT,
ADD COLUMN IF NOT EXISTS ciudad TEXT,
ADD COLUMN IF NOT EXISTS direccion TEXT,
ADD COLUMN IF NOT EXISTS codigo_postal TEXT,
ADD COLUMN IF NOT EXISTS notas TEXT;

-- 2. Agregar constraint si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'pedidos_estado_check'
  ) THEN
    ALTER TABLE public.pedidos 
    ADD CONSTRAINT pedidos_estado_check 
    CHECK (estado IN ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'));
  END IF;
END $$;

-- 3. Crear índice si no existe
CREATE INDEX IF NOT EXISTS idx_pedidos_order_id ON public.pedidos(order_id);

-- 4. Actualizar pedidos existentes con order_id (usando id como base)
UPDATE public.pedidos 
SET order_id = 'ORD-' || REPLACE(id::TEXT, '-', '')::UPPER
WHERE order_id IS NULL OR order_id = '';

-- 5. Hacer order_id único (si hay duplicados, solo mantiene el primero)
-- Primero verificamos si hay duplicados
DO $$
BEGIN
  IF EXISTS (
    SELECT order_id FROM public.pedidos 
    WHERE order_id IS NOT NULL 
    GROUP BY order_id 
    HAVING COUNT(*) > 1
  ) THEN
    -- Agregar sufijo único a duplicados
    UPDATE public.pedidos p1
    SET order_id = p1.order_id || '-' || (
      SELECT COUNT(*)::TEXT 
      FROM public.pedidos p2 
      WHERE p2.order_id = p1.order_id AND p2.id < p1.id
    )
    WHERE EXISTS (
      SELECT 1 FROM public.pedidos p3 
      WHERE p3.order_id = p1.order_id 
      HAVING COUNT(*) > 1
    );
  END IF;
END $$;

-- 6. Actualizar políticas RLS para pedidos
DROP POLICY IF EXISTS "Anyone can view own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.pedidos;
DROP POLICY IF EXISTS "Users can update own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Service role can manage all orders" ON public.pedidos;

CREATE POLICY "Anyone can view own orders" ON public.pedidos FOR SELECT USING (auth.uid() = usuario_id OR auth.uid() IS NULL);
CREATE POLICY "Anyone can create orders" ON public.pedidos FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own orders" ON public.pedidos FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Service role can manage all orders" ON public.pedidos FOR ALL USING (true);

-- Confirmación
SELECT 'Migración completada' AS status;
