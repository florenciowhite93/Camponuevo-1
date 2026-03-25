# Últimos Cambios - Camponuevo 1

## Fecha: 24 de Marzo de 2026

---

## Fixes y Mejoras - 24 de Marzo 2026

### 1. Cálculo de IVA (21%) en Carrito

#### Archivos modificados:
- `src/context/CarritoContext.tsx` - Agregados `totalIva` y `totalConIva`
- `src/components/CarritoSidebar.tsx` - Mostrar IVA y total con IVA en sidebar
- `src/app/checkout/page.tsx` - Mostrar IVA y total con IVA en resumen del pedido

#### Implementación:
- IVA calculado como 21% del subtotal
- Mostrado en CarritoSidebar: "Subtotal", "IVA (21%)", "Envío", "Total"
- Mostrado en Checkout: mismo desglose en el resumen del pedido
- El total guardado en pedidos ahora incluye IVA

### 2. Autocompletar datos de contacto en Checkout

#### Archivos modificados:
- `src/app/checkout/page.tsx` - Al cargar, consulta el perfil del usuario

#### Implementación:
- Si el usuario está autenticado, consulta su perfil en la tabla `perfiles`
- Pre-llena automáticamente: nombre, email, teléfono, dirección, provincia, ciudad, código postal
- Solo sobreescribe campos vacíos del formulario

### 3. Fix Error 403 en perfiles (checkout)

#### Archivos creados:
- `supabase/migrate_perfiles_rls.sql` - Script de migración

#### Problema:
- Error: `POST .../rest/v1/perfiles?on_conflict=id 403 (Forbidden)`
- Causa: Falta política RLS para INSERT en tabla `perfiles`

#### Solución:
```sql
CREATE POLICY "Users can insert own profile" ON public.perfiles 
FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. Productos Destacados desde Supabase

#### Archivos modificados:
- `src/app/page.tsx` - Ahora carga productos desde Supabase dinámicamente

#### Implementación:
- Productos destacados ahora se cargan de la base de datos
- Ya no usa IDs hardcodeados que no existen en Supabase
- Muestra estado de carga y mensaje si no hay productos

### 5. Configuración de Variables de Entorno en Vercel

#### Variables necesarias para emails (Resend):
- `RESEND_API_KEY` - API key de Resend (obtener de https://resend.com)
- `ADMIN_EMAIL` - Email del administrador
- `EMAIL_FROM` - Email emisor

#### Configurar en Vercel:
1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto `camponuevo-1`
3. Settings → Environment Variables
4. Agregar las variables mencionadas

> ⚠️ **IMPORTANTE**: Las variables de entorno de Vercel se configuran desde el Dashboard, NO desde .env.local. El archivo .env.local es solo para desarrollo local.

---

## Funcionalidades Implementadas

### 1. Sistema de Emails con Resend

#### Archivos creados:
- `src/lib/email.ts` - Cliente de Resend (inicialización lazy)
- `src/lib/email-actions.ts` - Helper con retry automático
- `src/emails/OrderConfirmationEmail.tsx` - Plantilla email confirmación cliente
- `src/emails/AdminNewOrderEmail.tsx` - Plantilla notificación admin
- `supabase/migrate_pedidos.sql` - Script de migración tabla pedidos

#### Configuración:
- API Key de Resend configurada en Vercel (RESEND_API_KEY)
- Variables de entorno necesarias:
  - `RESEND_API_KEY`
  - `EMAIL_FROM=noreply@resend.dev`
  - `ADMIN_EMAIL=camponuevo@gmail.com`

#### Flujos de email:
- Confirmación de pedido → Cliente
- Notificación nuevo pedido → Admin
- Recuperación de contraseña → Supabase Auth (ya implementado)

---

### 2. Checkout - Guardar Pedidos

#### Cambios en `src/app/checkout/page.tsx`:
- Guarda pedido completo en tabla `pedidos` de Supabase
- Asocia pedido al usuario logueado (usuario_id)
- Pre-carga email del usuario si está autenticado
- Guarda dirección de entrega en perfil del usuario

#### Campos guardados en tabla `pedidos`:
- order_id (ej: ORD-ABC123)
- usuario_id
- cliente_nombre, cliente_email, cliente_telefono
- provincia, ciudad, direccion, codigo_postal
- productos (JSONB array)
- notas
- total
- estado

---

### 3. Historial de Pedidos en Mi Cuenta

#### Cambios en `src/app/cuenta/page.tsx`:
- Pestaña de pedidos accesible desde `/cuenta?tab=pedidos`
- Muestra todos los pedidos del usuario autenticado
- Modal con detalles del pedido (productos, total, fecha, estado)
- order_id visible en lugar de solo UUID

---

### 4. Campos de Dirección Extendidos

#### Migración SQL necesaria:
```sql
ALTER TABLE public.perfiles 
ADD COLUMN IF NOT EXISTS provincia TEXT,
ADD COLUMN IF NOT EXISTS ciudad TEXT,
ADD COLUMN IF NOT EXISTS codigo_postal TEXT;
```

#### Archivos relacionados:
- `supabase/migrate_perfiles_direccion.sql` - Script de migración

---

### 5. Indicador "+ IVA" en Precios

#### Archivos modificados:
- `src/components/ProductCard.tsx` - Product cards del catálogo
- `src/app/catalogo/[id]/page.tsx` - Página de detalle de producto

#### Implementación:
- Se muestra "+ IVA" junto al precio cuando precio > 0
- Solo visible cuando el producto tiene precio definido

---

### 6. Navegación a Pestaña de Pedidos

#### Cambios en `src/components/layout/Header.tsx`:
- Link "Historial de Pedidos" ahora lleva a `/cuenta?tab=pedidos`

---

## Migraciones de Base de Datos

### Ejecutar en Supabase SQL Editor:

#### 1. Migración de pedidos (ya ejecutada):
```sql
-- Migración para agregar columnas a tabla pedidos
-- Ya ejecutada previamente
```

#### 2. Migración de perfiles - dirección (pendiente):
```sql
ALTER TABLE public.perfiles 
ADD COLUMN IF NOT EXISTS provincia TEXT,
ADD COLUMN IF NOT EXISTS ciudad TEXT,
ADD COLUMN IF NOT EXISTS codigo_postal TEXT;
```

#### 3. Migración de perfiles - RLS INSERT (nuevo - ejecutar ahora):
```sql
-- Arregla error 403 en checkout
CREATE POLICY "Users can insert own profile" ON public.perfiles 
FOR INSERT WITH CHECK (auth.uid() = id);
```

#### Archivos de migración disponibles:
- `supabase/migrate_perfiles_rls.sql` - Fix RLS para INSERT
- `supabase/migrate_perfiles_direccion.sql` - Campos de dirección

---

## Verificación de Dominio en Supabase

### Para que funcione el email de verificación de registro:

1. Ir a Supabase Dashboard → Authentication → Domains
2. Agregar dominio: `camponuevo.com.ar`
3. Agregar registros DNS que indica Supabase
4. Esperar verificación (hasta 48h)

### Alternativa temporal:
- Authentication → Providers → Email
- Desactivar "Confirm email" (no recomendado para producción)

---

## URLs Importantes

- **Sitio Producción**: https://camponuevo-1.vercel.app
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Resend Dashboard**: https://resend.com

---

## Comandos Útiles

### Deploy a producción:
```bash
cd "Camponuevo 1"
npx vercel --prod
```

### Commit y push:
```bash
git add -A
git commit -m "mensaje"
git push
```

---

## Pendientes / Mejoras Futuras

1. [ ] Verificar dominio @camponuevo.com.ar en Resend para emails profesionales
2. [ ] Crear página de cambio de contraseña (`/cuenta/cambiar-contrasena`)
3. [ ] Email de bienvenida al registrarse
4. [ ] Dashboard admin para gestión de pedidos
5. [x] Agregar campos provincia/ciudad a la dirección en perfil
6. [ ] Sistema de direcciones múltiples
7. [ ] Notificaciones push/web
8. [ ] Paginación en catálogo de productos
9. [ ] Filtros avanzados en catálogo
10. [ ] Configurar variable RESEND_API_KEY en Vercel Dashboard
