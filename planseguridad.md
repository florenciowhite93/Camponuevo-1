# Plan de Seguridad - Camponuevo

> Documento generado: 2026-04-02  
> Proyecto: E-commerce Camponuevo  
> Stack: Next.js 16 + Supabase + Resend + Vercel

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [FASE 1: Crítico](#fase-1-crítico) - Implementar ASAP
3. [FASE 2: Alto](#fase-2-alto) - Implementar esta semana
4. [FASE 3: Medio](#fase-3-medio) - Implementar este mes
5. [FASE 4: Bajo](#fase-4-bajo) - Implementar cuando sea posible
6. [Checklist de Implementación](#checklist-de-implementación)
7. [Comandos Útiles](#comandos-útiles)
8. [Recursos y Referencias](#recursos-y-referencias)

---

## Resumen Ejecutivo

### Estado Actual

| Aspecto | Estado | Notas |
|---------|--------|-------|
| RLS en Base de Datos | ⚠️ Parcial | Políticas conflicto entre schema.sql y migrate_admin_rls.sql |
| Autenticación | ✅ Básico | Usa Supabase Auth, pero sin 2FA |
| Protección Rutas Admin | ❌ Crítico | Solo verificación client-side |
| Rate Limiting | ❌ Ausente | Vulnerable a ataques de fuerza bruta |
| Validación Inputs | ⚠️ Básica | Solo validación HTML5 nativa |
| Headers Seguridad | ❌ Ausentes | No hay CSP, X-Frame-Options, etc. |
| Logs de Auditoría | ❌ Ausentes | Sin tracking de cambios sensibles |
| Dependencias | ⚠️ Sin auditar | No hay npm audit en CI |

### Puntuación General: 5/10

---

## FASE 1: Crítico

### 1.1 Proteger Rutas Admin a Nivel Servidor

**Nivel de Riesgo:** 🔴 Crítico  
**Archivos involucrados:** `src/middleware.ts` (crear)

#### Problema
El panel admin (`/admin`) verifica `is_admin` solo en el frontend (cliente). Un usuario autenticado malicioso podría:
- Acceder a la UI del admin
- Ver todos los productos, pedidos, clientes
- Ejecutar operaciones via browser si las políticas RLS lo permiten

#### Pasos de Implementación

**Paso 1:** Crear archivo `src/middleware.ts`

```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response.cookies.set(name, value, options as any);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteger rutas /admin/*
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
    }

    // Verificar si es admin
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!perfil?.is_admin) {
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

**Paso 2:** Actualizar `src/app/admin/page.tsx` para mantener la verificación client-side como backup

```typescript
// Mantener el useEffect actual, pero agregar early return
useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/login?redirect=/admin");
      return;
    }

    // Esta verificación es redundante si middleware funciona,
    // pero sirve como backup
    const { data: perfil, error } = await supabase
      .from("perfiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (error || !perfil?.is_admin) {
      router.push("/?error=unauthorized");
      return;
    }

    setIsAdmin(true);
    await fetchAllData();
  } catch (error) {
    console.error("Auth error:", error);
    router.push("/");
  } finally {
    setLoading(false);
  }
};
```

#### Verificación
Después de implementar, probar:
1. Acceder a `/admin` sin estar logueado → debe redirigir a login
2. Acceder a `/admin` con usuario no-admin → debe mostrar error
3. Acceder a `/admin` con admin → debe cargar normalmente

---

### 1.2 Rate Limiting

**Nivel de Riesgo:** 🔴 Crítico  
**Ubicación:** Login, Registro, Checkout  
**Archivos:** `src/app/(auth)/login/page.tsx`, `registro/page.tsx`, `checkout/page.tsx`

#### Problema
Sin rate limiting, un atacante puede:
- Realizar ataques de fuerza bruta en passwords
- Crear múltiples cuentas de spam
- Sobrecargar el sistema con requests

#### Pasos de Implementación

**Opción A: Usar Vercel Edge Functions (Recomendado)**

**Paso 1:** Crear archivo `src/middleware-rate-limit.ts`

```typescript
// src/middleware-rate-limit.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limit store (en producción usar Redis o KV store)
// Para desarrollo, usamos Map simple
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS = 5; // 5 intentos

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Solo aplicar rate limiting a rutas sensibles
  const sensitivePaths = ['/login', '/registro', '/checkout'];
  const isSensitive = sensitivePaths.some(p => path.startsWith(p));

  if (isSensitive) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Usar email + IP como key para login/registro
    const email = request.formData?.get('email')?.toString() || ip;
    const key = `${ip}-${path}`;

    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/registro', '/checkout'],
};
```

**Opción B: Integración con Vercel KV (Producción)**

```typescript
// Para producción, usar @vercel/kv
import { kv } from '@vercel/kv';

async function isRateLimitedVercel(ip: string, path: string): Promise<boolean> {
  const key = `rate_limit:${ip}:${path}`;
  const current = await kv.get<number>(key);
  
  if (!current) {
    await kv.setex(key, 900, 1); // 15 minutos
    return false;
  }
  
  if (current >= MAX_REQUESTS) {
    return true;
  }
  
  await kv.incr(key);
  return false;
}
```

#### Verificación
Después de implementar, probar:
1. Intentar login 6 veces rápido → 6ta vez debe dar error 429
2. Esperar 15 minutos → debe permitir nuevamente

---

### 1.3 Verificar y Corregir Políticas RLS

**Nivel de Riesgo:** 🔴 Crítico  
**Archivos SQL:** `supabase/schema.sql`, `supabase/migrate_admin_rls.sql`

#### Problema
El archivo `schema.sql` tiene políticas que permiten escritura a cualquiera:

```sql
-- ESTO ES PELIGROSO (líneas ~159-161 de schema.sql)
CREATE POLICY "Service role can insert products" ON public.productos FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update products" ON public.productos FOR UPDATE USING (true);
CREATE POLICY "Service role can delete products" ON public.productos FOR DELETE USING (true);
```

El archivo `migrate_admin_rls.sql` las corrige, pero hay conflicto.

#### Pasos de Implementación

**Paso 1:** Verificar en Supabase Dashboard

1. Ir a: https://supabase.com/dashboard/project/qqavybhkwjhkifvlwhcv
2. Ir a **SQL Editor**
3. Ejecutar esta consulta para ver políticas actuales:

```sql
-- Ver todas las políticas actuales
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Paso 2:** Ejecutar el SQL corregido

Eliminar las políticas conflictivas del `schema.sql` y dejar solo las de `migrate_admin_rls.sql`:

```sql
-- Ejecutar en Supabase SQL Editor para limpiar políticas obsoletas

-- Eliminar políticas problemáticas de productos
DROP POLICY IF EXISTS "Service role can insert products" ON public.productos;
DROP POLICY IF EXISTS "Service role can update products" ON public.productos;
DROP POLICY IF EXISTS "Service role can delete products" ON public.productos;

-- Eliminar políticas de pedidos que permitan UPDATE por usuario
DROP POLICY IF EXISTS "Users can update own orders" ON public.pedidos;

-- Verificar que solo queden las políticas correctas
SELECT policyname, cmd, with_check FROM pg_policies 
WHERE tablename IN ('productos', 'pedidos', 'categorias', 'perfiles');
```

**Paso 3:** Agregar columna `is_admin` si no existe

```sql
-- Verificar si existe la columna
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'perfiles' AND column_name = 'is_admin';

-- Si no existe, agregarla
ALTER TABLE public.perfiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Asignar admin al usuario correcto (reemplazar USER_ID con el UUID del admin)
UPDATE public.perfiles SET is_admin = true WHERE id = 'TU_USER_UUID_AQUI';
```

**Paso 4:** Actualizar `supabase/schema.sql` para eliminar políticas conflictivas

Editar `supabase/schema.sql` y eliminar/comentar las líneas de políticas problemáticas (~líneas 145-207).

#### Verificación
Después de implementar:
1. Crear usuario test (no admin)
2. Intentar insertar producto como usuario test → debe fallar
3. Intentar actualizar pedido como usuario test → debe fallar

---

## FASE 2: Alto

### 2.1 Validación de Inputs con Zod

**Nivel de Riesgo:** 🟠 Alto  
**Archivos:** `checkout/page.tsx`, `registro/page.tsx`, `admin/page.tsx`

#### Problema
Los formularios acceptan cualquier input sin validación robusta:
- Emails inválidos podrían causar errores
- Datos maliciosos podrían explotarse
- No hay sanitización de XSS

#### Pasos de Implementación

**Paso 1:** Instalar Zod

```bash
npm install zod
npm install -D @hookform/resolvers
```

**Paso 2:** Crear archivo de esquemas `src/lib/schemas.ts`

```typescript
// src/lib/schemas.ts
import { z } from 'zod';

export const registroSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email muy largo'),
  telefono: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Teléfono inválido')
    .optional()
    .or(z.literal('')),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export const checkoutSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string()
    .min(8, 'Teléfono inválido')
    .max(20, 'Teléfono muy largo'),
  provincia: z.string().min(1, 'Selecciona una provincia'),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  direccion: z.string()
    .min(5, 'Dirección muy corta')
    .max(200, 'Dirección muy larga'),
  codigoPostal: z.string()
    .max(10, 'Código postal inválido')
    .optional()
    .or(z.literal('')),
  notas: z.string().max(500, 'Notas muy largas').optional(),
});

export const productoSchema = z.object({
  titulo: z.string().min(1, 'Título requerido').max(200),
  precio: z.number().min(0, 'Precio no puede ser negativo'),
  laboratorio_id: z.string().uuid().nullable().optional(),
  volumen: z.string().max(50).optional(),
  descripcion: z.string().max(5000).optional(),
  drogas: z.string().max(1000).optional(),
  dosis: z.string().max(500).optional(),
  especies: z.array(z.string()).optional(),
  etiquetas_ids: z.array(z.string().uuid()).optional(),
  subcategorias_ids: z.array(z.string().uuid()).optional(),
  imagen: z.string().url().optional().or(z.literal('')),
  link_externo: z.string().url().optional().or(z.literal('')),
  visible: z.boolean().default(true),
});

export type RegistroForm = z.infer<typeof registroSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type CheckoutForm = z.infer<typeof checkoutSchema>;
export type ProductoForm = z.infer<typeof productoSchema>;
```

**Paso 3:** Actualizar `registro/page.tsx` con validación

```typescript
// En registro/page.tsx, cambiar handleSubmit:

import { registroSchema } from '@/lib/schemas';
import { z } from 'zod';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  // Validar con Zod
  const result = registroSchema.safeParse(formData);
  
  if (!result.success) {
    const firstError = result.error.errors[0];
    setError(firstError.message);
    return;
  }

  if (!acceptedTerms) {
    setError("Debés aceptar los términos y condiciones");
    return;
  }

  setIsLoading(true);

  try {
    // ... resto del código existente
  } finally {
    setIsLoading(false);
  }
};

// Actualizar passwordRequirements para mostrar feedback visual
const passwordRequirements = [
  { met: formData.password.length >= 8, text: "Al menos 8 caracteres" },
  { met: /[A-Z]/.test(formData.password), text: "Una mayúscula" },
  { met: /[a-z]/.test(formData.password), text: "Una minúscula" },
  { met: /[0-9]/.test(formData.password), text: "Un número" },
];
```

**Paso 4:** Actualizar `checkout/page.tsx` con validación

```typescript
import { checkoutSchema } from '@/lib/schemas';

const validateAddressForm = () => {
  const result = checkoutSchema.safeParse(formData);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return { valid: false, error: firstError.message };
  }
  return { valid: true };
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validar antes de enviar
  if (envioOption === "envio") {
    const validation = validateAddressForm();
    if (!validation.valid) {
      alert(validation.error);
      return;
    }
  }

  setIsSubmitting(true);
  // ... resto del código
};
```

#### Verificación
Después de implementar:
1. Intentar registrar con email inválido → debe mostrar error específico
2. Intentar con contraseña débil → debe mostrar qué falta
3. Intentar checkout sin dirección → debe validar antes de enviar

---

### 2.2 Mover ADMIN_EMAIL a Variable de Entorno

**Nivel de Riesgo:** 🟠 Alto  
**Archivos:** `src/lib/email-actions.ts`, `.env`, `.env.example`

#### Problema
El email admin está hardcodeado en el código.

#### Pasos de Implementación

**Paso 1:** Actualizar `.env`

```bash
# Agregar al .env y .env.local
ADMIN_EMAIL=camponuevo@gmail.com
```

**Paso 2:** Actualizar `.env.example`

```bash
# Agregar a .env.example
ADMIN_EMAIL=your-admin-email@domain.com
```

**Paso 3:** Actualizar `src/lib/email-actions.ts`

```typescript
// src/lib/email-actions.ts
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@default.com';
```

**Paso 4:** Actualizar `src/lib/email.ts`

```typescript
// src/lib/email.ts
export const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@camponuevo.com.ar';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@default.com';
```

---

### 2.3 Logs de Auditoría

**Nivel de Riesgo:** 🟠 Alto  
**Archivos SQL:** `supabase/audit_log.sql` (crear)

#### Problema
No hay registro de cambios sensibles. No se puede auditar:
- Quién cambió precios
- Quién actualizó pedidos
- Intentos de acceso fallidos

#### Pasos de Implementación

**Paso 1:** Crear tabla de auditoría

```sql
-- Ejecutar en Supabase SQL Editor
-- Tabla de logs de auditoría

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  table_name TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGIN_FAILED', 'ACCESS_DENIED')),
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.audit_log(created_at);

-- Función para registrar cambios
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
    NULL, -- ip_address se captura desde la aplicación
    NULL, -- user_agent se captura desde la aplicación
    NOW()
  );
  
  INSERT INTO public.audit_log VALUES (audit_record.*);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers para tablas sensibles
DROP TRIGGER IF EXISTS audit_productos ON public.productos;
CREATE TRIGGER audit_productos
  AFTER UPDATE OR DELETE ON public.productos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

DROP TRIGGER IF EXISTS audit_pedidos ON public.pedidos;
CREATE TRIGGER audit_pedidos
  AFTER UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

DROP TRIGGER IF EXISTS audit_perfiles ON public.perfiles;
CREATE TRIGGER audit_perfiles
  AFTER UPDATE ON public.perfiles
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();

-- Habilitar RLS
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Solo admins pueden ver logs
DROP POLICY IF EXISTS "audit_log_admin_read" ON public.audit_log;
CREATE POLICY "audit_log_admin_read" ON public.audit_log
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "audit_log_insert" ON public.audit_log;
CREATE POLICY "audit_log_insert" ON public.audit_log
  FOR INSERT WITH CHECK (true); -- El trigger se ejecuta con SECURITY DEFINER
```

**Paso 2:** Registrar eventos de login desde el frontend

```typescript
// src/lib/audit.ts
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface AuditEvent {
  action: 'LOGIN' | 'LOGIN_FAILED' | 'ACCESS_DENIED';
  user_email?: string;
}

export async function logAuditEvent(event: AuditEvent) {
  try {
    await supabase.from('audit_log').insert({
      action: event.action,
      user_email: event.user_email,
      table_name: 'auth',
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}

// Uso en login/page.tsx
export async function handleSubmit() {
  // ... código de login existente
  
  if (authError) {
    await logAuditEvent({ 
      action: 'LOGIN_FAILED', 
      user_email: email 
    });
    // mostrar error...
  } else if (data.user) {
    await logAuditEvent({ 
      action: 'LOGIN', 
      user_email: data.user.email 
    });
    router.push('/cuenta');
  }
}
```

#### Verificación
Después de implementar:
1. Editar un producto → debe aparecer en audit_log
2. Actualizar estado de pedido → debe aparecer en audit_log
3. Login exitoso → debe aparecer en audit_log

---

### 2.4 Mejorar Seguridad del Carrito

**Nivel de Riesgo:** 🟠 Alto  
**Archivos:** `src/context/CarritoContext.tsx`

#### Problema
El carrito usa localStorage sin sanitización. Si hay XSS en el sitio, el carrito podría ser comprometido.

#### Pasos de Implementación

**Paso 1:** Minimizar datos sensibles en carrito

```typescript
// src/context/CarritoContext.tsx
// Solo almacenar IDs y cantidades, no datos completos del producto

interface CartItem {
  productoId: string;
  cantidad: number;
  precio: number; // Solo precio, no datos completos
}

interface CarritoState {
  items: CartItem[];
  // ... otros estados
}
```

**Paso 2:** Validar datos al leer de localStorage

```typescript
// En la función de hydrate del contexto
const hydrateCart = () => {
  try {
    const stored = localStorage.getItem('camponuevo_cart');
    if (!stored) return defaultState;
    
    const parsed = JSON.parse(stored);
    
    // Validar estructura
    if (!Array.isArray(parsed.items)) {
      return defaultState;
    }
    
    // Sanitizar cada item
    const sanitizedItems = parsed.items
      .filter(item => 
        typeof item.productoId === 'string' &&
        typeof item.cantidad === 'number' &&
        item.cantidad > 0
      )
      .map(item => ({
        productoId: item.productoId,
        cantidad: Math.min(item.cantidad, 99), // Limitar cantidad máxima
      }));
    
    return { ...parsed, items: sanitizedItems };
  } catch {
    return defaultState;
  }
};
```

**Paso 3:** Opcional: Encriptar datos sensibles

```typescript
// Para datos más sensibles, usar encriptación básica
import { encode, decode } from 'base64';

// Simple obfuscation (no es encriptación real, pero dificulta lectura)
const obfuscate = (data: string): string => {
  return encode(data);
};

const deobfuscate = (data: string): string => {
  try {
    return decode(data);
  } catch {
    return data;
  }
};
```

---

## FASE 3: Medio

### 3.1 Fortalecer Requisitos de Contraseña

**Nivel de Riesgo:** 🟡 Medio  
**Archivos:** `src/app/(auth)/registro/page.tsx`

#### Problema
Las contraseñas solo requieren 6 caracteres, lo cual es muy débil.

#### Implementación
Ya cubierto en la sección 2.1 (Validación de Inputs con Zod).

---

### 3.2 Implementar CAPTCHA

**Nivel de Riesgo:** 🟡 Medio  
**Archivos:** `src/app/(auth)/registro/page.tsx`, `src/app/(auth)/login/page.tsx`

#### Pasos de Implementación

**Opción A: Google reCAPTCHA v3 (Recomendado)**

**Paso 1:** Registrar sitio en https://www.google.com/recaptcha/admin

**Paso 2:** Instalar SDK

```bash
npm install react-google-recaptcha-v3
```

**Paso 3:** Crear hook `src/hooks/useGoogleReCaptcha.ts`

```typescript
// src/hooks/useGoogleReCaptcha.ts
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export function useRecaptcha(action: string) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleToken = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha(action);
    // Enviar token al servidor para verificar
    return token;
  };

  return { executeRecaptcha: handleToken };
}
```

**Paso 4:** Agregar al formulario de registro

```typescript
// En registro/page.tsx
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRecaptcha } from '@/hooks/useRecaptcha';

// En el componente:
const { executeRecaptcha } = useRecaptcha('registro');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Obtener token reCAPTCHA
  const recaptchaToken = await executeRecaptcha();
  
  // Verificar en servidor o incluir en signup
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        nombre: formData.nombre,
        recaptcha_token: recaptchaToken,
      },
    },
  });
};
```

**Opción B: hCaptcha (Alternativa con mejor privacidad)**

Similar a reCAPTCHA pero con mejor privacidad para usuarios.

---

### 3.3 Auditoría de Dependencias en CI

**Nivel de Riesgo:** 🟡 Medio  
**Archivos:** `package.json`, crear `.github/workflows/security.yml` (o ajustar existente)

#### Pasos de Implementación

**Paso 1:** Agregar script de audit

```json
// package.json - agregar en scripts
{
  "scripts": {
    "security:audit": "npm audit --audit-level=high",
    "security:fix": "npm audit fix",
    "prebuild": "npm run security:audit"
  }
}
```

**Paso 2:** Crear workflow de GitHub Actions

```yaml
# .github/workflows/security.yml
name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Cada domingo

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run npm audit
        run: npm audit --audit-level=high
        continue-on-error: true
        
      - name: Check for outdated packages
        run: npm outdated --depth=0 || true
        
      - name: Upload audit results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: security-audit-results
          path: |
            npm-audit-results.json
          retention-days: 30
```

**Paso 3:** Generar reporte de auditoría

```bash
npm audit --json > npm-audit-results.json 2>&1 || true
```

---

### 3.4 Content Security Policy (CSP)

**Nivel de Riesgo:** 🟡 Medio  
**Archivos:** `next.config.ts`, `vercel.json`

#### Pasos de Implementación

**Paso 1:** Actualizar `next.config.ts`

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      // ... existing patterns
    ],
  },
};

export default nextConfig;
```

**Paso 2:** Agregar CSP Header (opcional, más restrictivo)

```typescript
// En el mismo headers() de next.config.ts
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://**.supabase.co https://static.wixstatic.com https://images.unsplash.com https://picsum.photos;
    font-src 'self';
    connect-src 'self' https://**.supabase.co https://resend.com;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `.replace(/\s+/g, ' ').trim(),
}
```

---

## FASE 4: Bajo

### 4.1 Headers de Seguridad Adicionales

**Nivel de Riesgo:** 🟢 Bajo  
**Archivos:** `vercel.json`

#### Pasos de Implementación

**Paso 1:** Actualizar `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        },
        {
          "key": "X-Permitted-Cross-Domain-Policies",
          "value": "none"
        }
      ]
    }
  ]
}
```

---

### 4.2 Crear Páginas Legales

**Nivel de Riesgo:** 🟢 Bajo  
**Archivos:** `src/app/terminos/page.tsx`, `src/app/privacidad/page.tsx`

#### Pasos de Implementación

**Paso 1:** Crear página de Términos y Condiciones

```typescript
// src/app/terminos/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Camponuevo',
  description: 'Términos y condiciones de uso de Camponuevo',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-gray max-w-none">
          <p className="lead">Última actualización: [FECHA]</p>
          
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar este sitio web, usted acepta estar sujeto 
            a los siguientes términos y condiciones...
          </p>
          
          <h2>2. Uso del sitio</h2>
          <p>
            [Contenido de términos...]
          </p>
          
          <h2>3. Compras y pagos</h2>
          <p>
            [Contenido sobre políticas de compra...]
          </p>
          
          <h2>4. Envíos y entregas</h2>
          <p>
            [Política de envíos...]
          </p>
          
          <h2>5. Devoluciones</h2>
          <p>
            [Política de devoluciones...]
          </p>
          
          <h2>6. Propiedad intelectual</h2>
          <p>
            [Contenido...]
          </p>
          
          <h2>7. Limitación de responsabilidad</h2>
          <p>
            [Contenido...]
          </p>
          
          <h2>8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
          </p>
          
          <h2>9. Contacto</h2>
          <p>
            Para consultas sobre estos términos, contactenos a: 
            <a href="mailto:camponuevo@gmail.com">camponuevo@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
```

**Paso 2:** Crear página de Política de Privacidad

```typescript
// src/app/privacidad/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Camponuevo',
  description: 'Política de privacidad y protección de datos de Camponuevo',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-gray max-w-none">
          <p className="lead">Última actualización: [FECHA]</p>
          
          <h2>1. Información que recopilamos</h2>
          <p>Recopilamos la siguiente información:</p>
          <ul>
            <li>Datos de registro (nombre, email, teléfono)</li>
            <li>Datos de direcciones de envío</li>
            <li>Historial de pedidos</li>
            <li>Información de navegación</li>
          </ul>
          
          <h2>2. Uso de la información</h2>
          <p>
            Utilizamos la información recopilada para:
          </p>
          <ul>
            <li>Procesar pedidos y entregas</li>
            <li>Comunicarnos con usted sobre sus pedidos</li>
            <li>Mejorar nuestros servicios</li>
            <li>Enviar promociones (solo si acepta)</li>
          </ul>
          
          <h2>3. Protección de datos</h2>
          <p>
            Implementamos medidas de seguridad para proteger sus datos...
          </p>
          
          <h2>4. Sus derechos</h2>
          <p>
            Usted tiene derecho a:
          </p>
          <ul>
            <li>Acceder a sus datos personales</li>
            <li>Rectificar datos inexactos</li>
            <li>Solicitar eliminación de sus datos</li>
            <li>Oponerse al tratamiento</li>
          </ul>
          
          <h2>5. Cookies</h2>
          <p>
            Utilizamos cookies para mejorar su experiencia...
          </p>
          
          <h2>6. Contacto</h2>
          <p>
            Responsable: Camponuevo  
            Email: <a href="mailto:camponuevo@gmail.com">camponuevo@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
```

**Paso 3:** Actualizar links en checkout y registro

```typescript
// En checkout/page.tsx y registro/page.tsx, cambiar:
<a href="#" className="text-[#2d5a27] hover:underline">
  Términos y Condiciones
</a>

// Por:
<Link href="/terminos" className="text-[#2d5a27] hover:underline">
  Términos y Condiciones
</Link>

<a href="#" className="text-[#2d5a27] hover:underline">
  Política de Privacidad
</a>

// Por:
<Link href="/privacidad" className="text-[#2d5a27] hover:underline">
  Política de Privacidad
</Link>
```

---

### 4.3 Auditar Storage de Supabase

**Nivel de Riesgo:** 🟢 Bajo  
**Ubicación:** Supabase Dashboard > Storage

#### Pasos de Implementación

**Paso 1:** Verificar buckets en Supabase Dashboard

1. Ir a: https://supabase.com/dashboard/project/qqavybhkwjhkifvlwhcv/storage
2. Revisar cada bucket

**Paso 2:** Configurar políticas de Storage

Para el bucket de productos, asegurar:

```sql
-- En Supabase SQL Editor
-- Políticas para bucket 'productos'

-- Solo lectura pública
CREATE POLICY "productos_storage_public_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'productos'
  );

-- Solo admins pueden subir
CREATE POLICY "productos_storage_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'productos' AND
    (SELECT is_admin FROM public.perfiles WHERE id = auth.uid())
  );

-- Solo admins pueden eliminar
CREATE POLICY "productos_storage_admin_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'productos' AND
    (SELECT is_admin FROM public.perfiles WHERE id = auth.uid())
  );
```

---

## Checklist de Implementación

### FASE 1: Crítico 🔴

```
[ ] 1.1 middleware.ts creado
      [ ] Verificar redirección de /admin sin login
      [ ] Verificar redirección de /admin con usuario no-admin
      [ ] Verificar acceso normal con admin

[ ] 1.2 Rate limiting implementado
      [ ] Probar 6 logins rápidos → debe bloquear en 6to
      [ ] Verificar mensaje de error 429
      [ ] Confirmar que liberan después de 15 min

[ ] 1.3 Políticas RLS verificadas
      [ ] Ejecutar query de verificación de políticas
      [ ] Eliminar políticas conflictivas
      [ ] Verificar columna is_admin existe
      [ ] Probar que usuario normal NO puede insertar productos
```

### FASE 2: Alto 🟠

```
[ ] 2.1 Zod instalado y configurado
      [ ] npm install zod
      [ ] schemas.ts creado
      [ ] Validación en registro funcionando
      [ ] Validación en checkout funcionando
      [ ] Validación en admin productos funcionando

[ ] 2.2 ADMIN_EMAIL en variable de entorno
      [ ] Agregado a .env
      [ ] Agregado a .env.example
      [ ] Código actualizado

[ ] 2.3 Logs de auditoría
      [ ] Tabla audit_log creada
      [ ] Triggers configurados
      [ ] Verificar que productos UPDATE genera log
      [ ] Verificar que pedidos UPDATE genera log

[ ] 2.4 Seguridad carrito
      [ ] Validación de estructura al leer localStorage
      [ ] Cantidades limitadas a máximo 99
      [ ] Limpieza de datos inválidos
```

### FASE 3: Medio 🟡

```
[ ] 3.1 Contraseñas fortalezidas
      [ ] Mínimo 8 caracteres
      [ ] Requerir mayúscula, minúscula, número
      [ ] UI muestra feedback visual

[ ] 3.2 CAPTCHA implementado
      [ ] Registrar sitio en reCAPTCHA/hCaptcha
      [ ] SDK instalado
      [ ] Integración en registro
      [ ] Integración en login (opcional)

[ ] 3.3 npm audit en CI/CD
      [ ] Script agregado a package.json
      [ ] GitHub Action creada
      [ ] Prueba de ejecución exitosa

[ ] 3.4 CSP y headers configurados
      [ ] next.config.ts actualizado
      [ ] Headers visibles en respuesta
      [ ] Funcionalidad del sitio no afectada
```

### FASE 4: Bajo 🟢

```
[ ] 4.1 Headers adicionales
      [ ] vercel.json actualizado

[ ] 4.2 Páginas legales
      [ ] /terminos creada
      [ ] /privacidad creada
      [ ] Links actualizados en checkout
      [ ] Links actualizados en registro

[ ] 4.3 Storage auditado
      [ ] Políticas de storage revisadas
      [ ] Solo lectura pública para productos
      [ ] Solo admins pueden subir/eliminar
```

---

## Comandos Útiles

### Verificación de Políticas RLS

```bash
# Ejecutar en Supabase SQL Editor
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Verificar Columnas de una Tabla

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'perfiles'
ORDER BY ordinal_position;
```

### Verificar Users con Rol Admin

```sql
SELECT id, email, is_admin 
FROM public.perfiles 
WHERE is_admin = true;
```

### Audit de Dependencias

```bash
# Local
npm audit
npm audit --audit-level=high
npm audit --json > audit-report.json

# Fix automático
npm audit fix
```

### Verificar Headers de Seguridad

```bash
# Usando curl
curl -I https://camponuevo-1.vercel.app

# Verificar CSP específicamente
curl -I https://camponuevo-1.vercel.app | grep -i content-security-policy
```

### Build y Verificación Local

```bash
# Instalar dependencias
npm install

# Verificar tipos TypeScript
npm run build

# Verificar lint
npm run lint

# Desarrollo local
npm run dev
```

---

## Recursos y Referencias

### Documentación Oficial

- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Zod Validation](https://zod.dev/)
- [OWASP Top 10](https://owasp.org/Top10/)
- [MDN Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)

### Herramientas de Testing

- [Security Headers](https://securityheaders.com/) - Verificar headers
- [Sucuri SiteCheck](https://sitecheck.sucuri.net/) - Scanner de vulnerabilidades
- [Mozilla Observatory](https://observatory.mozilla.org/) - Análisis de seguridad

### Contacto de Emergencia

Si detectas una vulnerabilidad crítica:
1. Documentar con steps de reproducción
2. No compartir públicamente hasta que esté resuelta
3. Notificar a: camponuevo@gmail.com

---

## Historial de Cambios

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2026-04-02 | 1.0 | Versión inicial del plan |

---

*Este documento es confidencial y solo para uso interno del equipo de Camponuevo.*
