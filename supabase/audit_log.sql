-- ================================================
-- MIGRACIÓN: Tabla de Logs de Auditoría
-- Fecha: 2026-04-04
-- ================================================

-- 1. CREAR TABLA audit_log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  table_name TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGIN_FAILED', 'ACCESS_DENIED', 'REGISTER', 'REGISTER_FAILED')),
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREAR ÍNDICES PARA BÚSQUEDAS FRECUENTES
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.audit_log(action);

-- 3. CREAR FUNCIÓN PARA REGISTRAR CAMBIOS
CREATE OR REPLACE FUNCTION public.log_audit()
RETURNS TRIGGER AS $$
DECLARE
  audit_record public.audit_log;
BEGIN
  audit_record := ROW(
    uuid_generate_v4(),
    TG_TABLE_NAME,
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) END,
    auth.uid(),
    (SELECT email FROM auth.users WHERE id = auth.uid()),
    NULL,
    NULL,
    NOW()
  );
  
  INSERT INTO public.audit_log VALUES (audit_record.*);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. CREAR TRIGGERS PARA TABLAS SENSIBLES

-- Trigger para productos (UPDATE y DELETE)
DROP TRIGGER IF EXISTS audit_productos ON public.productos;
CREATE TRIGGER audit_productos
  AFTER UPDATE OR DELETE ON public.productos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

-- Trigger para pedidos (UPDATE)
DROP TRIGGER IF EXISTS audit_pedidos ON public.pedidos;
CREATE TRIGGER audit_pedidos
  AFTER UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

-- Trigger para perfiles (UPDATE)
DROP TRIGGER IF EXISTS audit_perfiles ON public.perfiles;
CREATE TRIGGER audit_perfiles
  AFTER UPDATE ON public.perfiles
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

-- 5. HABILITAR RLS EN LA TABLA audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- 6. CREAR POLÍTICAS RLS PARA audit_log

-- Admin puede ver todos los logs
DROP POLICY IF EXISTS "audit_log_admin_read" ON public.audit_log;
CREATE POLICY "audit_log_admin_read" ON public.audit_log
  FOR SELECT USING (public.is_admin());

-- El trigger inserta con SECURITY DEFINER, así que no necesita política de INSERT

-- 7. FUNCIÓN PARA INSERTAR LOGS DESDE APLICACIÓN (para login, etc.)
CREATE OR REPLACE FUNCTION public.insert_audit_log(
  p_table_name TEXT,
  p_action TEXT,
  p_record_id UUID DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO public.audit_log (
    table_name, action, record_id, user_id, user_email, ip_address, user_agent
  ) VALUES (
    p_table_name, p_action, p_record_id, p_user_id, p_user_email, p_ip_address, p_user_agent
  ) RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- INSTRUCCIONES DE VERIFICACIÓN
-- ================================================

-- Para verificar que la tabla se creó:
-- SELECT * FROM public.audit_log LIMIT 10;

-- Para verificar los triggers:
-- SELECT tgname, tablename FROM pg_trigger WHERE tgname LIKE 'audit%';

-- Para probar manualmente un log:
-- SELECT public.insert_audit_log(
--   'test', 
--   'LOGIN', 
--   NULL, 
--   NULL, 
--   'test@test.com',
--   '127.0.0.1',
--   'Test Agent'
-- );
