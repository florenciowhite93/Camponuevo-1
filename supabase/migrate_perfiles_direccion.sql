-- Migración: Agregar campos de dirección extendidos a perfiles
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columnas faltantes a perfiles
ALTER TABLE public.perfiles 
ADD COLUMN IF NOT EXISTS provincia TEXT,
ADD COLUMN IF NOT EXISTS ciudad TEXT,
ADD COLUMN IF NOT EXISTS codigo_postal TEXT;

-- 2. Verificar que existe la tabla direcciones si quieres分开 guardar múltiples direcciones
-- (opcional, para guardar múltiples direcciones por usuario)

-- Confirmación
SELECT 'Migración de direcciones completada' AS status;
