-- Migración para corregir RLS de perfiles
-- Ejecutar en Supabase SQL Editor

-- Agregar política INSERT para perfiles (necesaria para upsert)
CREATE POLICY "Users can insert own profile" ON public.perfiles 
FOR INSERT WITH CHECK (auth.uid() = id);

-- Verificar que existe la política UPDATE
-- (ya debería existir según schema.sql, pero la recreamos por seguridad)
DROP POLICY IF EXISTS "Users can update own profile" ON public.perfiles;
CREATE POLICY "Users can update own profile" ON public.perfiles 
FOR UPDATE USING (auth.uid() = id);
