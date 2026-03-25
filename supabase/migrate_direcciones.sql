-- Tabla de direcciones de usuarios
CREATE TABLE IF NOT EXISTS public.direcciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

-- Index para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_direcciones_usuario ON public.direcciones(usuario_id);

-- Habilitar RLS
ALTER TABLE public.direcciones ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
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

-- Confirmación
SELECT 'Tabla direcciones creada exitosamente' AS status;
