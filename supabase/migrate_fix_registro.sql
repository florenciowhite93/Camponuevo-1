-- ═══════════════════════════════════════════════════════════════
-- FIX REGISTRO DE USUARIOS - Corregir Trigger de Perfiles
-- ═══════════════════════════════════════════════════════════════

-- 1. Eliminar trigger y función existente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Crear función actualizada (solo inserta id, email, nombre)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, email, nombre)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'nombre');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recrear trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Verificar estructura de perfiles
SELECT 'Columnas en perfiles:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'perfiles' 
ORDER BY ordinal_position;

-- 5. Recrear políticas RLS para perfiles
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.perfiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.perfiles;

CREATE POLICY "Users can view own profile" ON public.perfiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.perfiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.perfiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. Verificar trigger
SELECT 'Triggers activos:' as info;
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE event_table_name = 'users';

SELECT '✅ Fix completado' as status;
