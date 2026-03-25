# Camponuevo - E-commerce de Productos Ganaderos y Rurales

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Nombre del proyecto** | Camponuevo |
| **Descripción** | Tienda online de productos veterinarios y rurales para el cuidado de animales de campo |
| **Cliente** | Camponuevo (Empresa de productos veterinarios) |
| **Stack principal** | Next.js 16 + TypeScript + Tailwind CSS |
| **Backend/DB** | Supabase |
| **Auth** | Supabase Auth (email + validación) |
| **Deploy** | Vercel |

---

## 🔗 Links Importantes

| Recurso | URL |
|---------|-----|
| **Sitio producción** | https://camponuevo-1.vercel.app |
| **Repositorio GitHub** | https://github.com/florenciowhite93/Camponuevo-1 |
| **Proyecto Supabase** | https://supabase.com/dashboard/project/qqavybhkwjhkifvlwhcv |

---

## 🛠️ Stack Tecnológico

```
Frontend:    Next.js 16.2.1 + TypeScript
Estilos:     Tailwind CSS 4
DB:          Supabase
Auth:        Supabase Auth (validación por email)
Drag & Drop: @dnd-kit/core, @dnd-kit/sortable
Icons:       Lucide React + Font Awesome 6.4.0
Deploy:      Vercel
```

---

## 📁 Estructura del Proyecto

```
Camponuevo 1/
├── src/
│   ├── app/                          # Rutas de Next.js (App Router)
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Layout principal
│   │   ├── globals.css              # Estilos globales
│   │   ├── (public)/
│   │   │   ├── catalogo/page.tsx   # Catálogo con filtros
│   │   │   └── nosotros/page.tsx    # Nosotros + Contacto
│   │   ├── catalogo/
│   │   │   └── [id]/page.tsx       # Detalle de producto
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx       # Login
│   │   │   ├── registro/page.tsx     # Registro
│   │   │   └── recupera/page.tsx     # Recuperar contraseña
│   │   ├── checkout/page.tsx         # Checkout
│   │   ├── cuenta/page.tsx          # Cuenta del cliente
│   │   └── admin/page.tsx           # Panel de administración
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Header con carrito
│   │   │   └── Footer.tsx           # Footer
│   │   ├── admin/
│   │   │   ├── ImportCSV.tsx        # Importar productos CSV
│   │   │   └── LandingEditor.tsx     # Editor de secciones landing
│   │   ├── ProductCard.tsx          # Tarjeta de producto
│   │   ├── CarritoSidebar.tsx       # Sidebar del carrito
│   │   └── ClientLayout.tsx         # Provider del carrito
│   ├── context/
│   │   └── CarritoContext.tsx       # Context del carrito
│   ├── hooks/
│   │   └── useSupabase.ts           # Hooks de Supabase
│   ├── lib/
│   │   ├── supabase/client.ts       # Cliente Supabase
│   │   └── utils.ts                 # Utilidades (cn)
│   └── types/
│       └── index.ts                 # Tipos TypeScript
├── supabase/
│   └── schema.sql                   # Schema de la base de datos
├── .env.local                      # Variables de entorno locales
├── .env.example                     # Template de variables
├── package.json
├── next.config.ts
└── README.md
```

---

## 🗄️ Base de Datos (Supabase)

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `perfiles` | Perfiles de usuarios (extiende auth.users) |
| `productos` | Catálogo de productos |
| `categorias` | Categorías principales |
| `subcategorias` | Subcategorías vinculadas a categorías |
| `laboratorios` | Laboratorios farmacéuticos |
| `etiquetas` | Etiquetas con colores |
| `pedidos` | Pedidos de clientes |
| `secciones_landing` | Configuración de secciones de la landing |
| `subscribers` | Suscriptores del newsletter |

### Campos de `productos`

```typescript
interface Producto {
  id: string;
  titulo: string;
  precio: number;
  laboratorio_id: string;
  laboratorio_nombre?: string; // Join
  imagen: string;
  descripcion: string;
  volumen: string;
  drogas: string;
  dosis: string;
  especies: Especie[]; // 'bovino' | 'ovino' | 'porcino' | 'equino' | 'felino' | 'canino'
  etiquetas_ids: string[];
  subcategorias_ids: string[];
  link_externo: string;
  visible: boolean;
}
```

---

## 🔐 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Anon Key** segura para frontend (expuesta intencionalmente)
- **Service Role Key** solo en backend (nunca expuesta)
- Validación de inputs en cliente y servidor
- Autenticación con validación por email

### Políticas RLS principales

```sql
-- Productos: todos ven los visibles
CREATE POLICY "Anyone can view visible products" ON productos 
  FOR SELECT USING (visible = true);

-- Pedidos: usuarios ven solo sus pedidos
CREATE POLICY "Users can view own orders" ON pedidos 
  FOR SELECT USING (auth.uid() = usuario_id);
```

---

## 🔑 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://qqavybhkwjhkifvlwhcv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (solo backend/servidor)
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=camponuevo@gmail.com
EMAIL_FROM=noreply@camponuevo.com.ar
```

> ⚠️ **Nota**: Las variables `NEXT_PUBLIC_` son visibles en el navegador (es intencional y seguro).
> Las variables de Resend deben configurarse solo en Vercel (no exponer en frontend).

---

## 🚀 Deployment

### Vercel

```bash
# Login
vercel login

# Deploy producción
vercel --prod

# Ver logs
vercel logs camponuevo-1
```

### Configurar en Vercel Dashboard

1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto `camponuevo-1`
3. **Settings** → **Environment Variables**
4. Agregar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🏗️ Ejecución Local

```bash
# Instalar dependencias
npm install

# Variables de entorno
# Crear .env.local con las credenciales de Supabase

# Desarrollo
npm run dev

# Build producción
npm run build

# Start producción
npm start
```

---

## 📝 Workflow de Desarrollo

1. **Crear branch**: `git checkout -b feature/nueva-funcion`
2. **Desarrollar** en la rama
3. **Testear** localmente con `npm run dev`
4. **Commit**: `git add . && git commit -m "feat: nueva función"`
5. **Push**: `git push origin feature/nueva-funcion`
6. **Crear PR** en GitHub
7. **Merge** a master → deploy automático a Vercel

---

## 🎨 Paleta de Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| `primary` | #2d5a27 | Botones, enlaces principales |
| `secondary` | #4caf50 | Acentos, hover |
| `accent` | #8bc34a | Iconos, badges |
| `light` | #f1f8e9 | Fondos claros |
| `dark` | #1b5e20 | Footer, headers |

---

## 📱 Funcionalidades Implementadas

### Sitio Público
- [x] Landing page con hero, categorías, productos destacados, testimonios, newsletter
- [x] Catálogo con filtros (laboratorio, categoría, especie, búsqueda)
- [x] Detalle de producto con imagen, especificaciones, dosis, principios activos
- [x] Carrito de compras (sidebar deslizable)
- [x] Checkout completo con formulario de envío
- [x] Página Nosotros + Contacto

### Autenticación
- [x] Registro con validación por email
- [x] Login
- [x] Recuperación de contraseña
- [x] Recordar sesión

### Cuenta Cliente
- [x] Perfil editable
- [x] Historial de pedidos
- [x] Gestión de direcciones

### Panel Admin
- [x] Dashboard con estadísticas
- [x] CRUD Productos (modal con preview)
- [x] CRUD Categorías
- [x] CRUD Subcategorías
- [x] CRUD Laboratorios
- [x] CRUD Etiquetas (10 colores predefinidos)
- [x] Gestión de Clientes
- [x] Gestión de Pedidos
- [x] Editor Landing (CRUD + drag & drop)
- [x] Importación de productos por CSV

---

## 🔧 Configuración de Supabase

### Ejecutar Schema

1. Ir a https://supabase.com/dashboard/project/qqavybhkwjhkifvlwhcv
2. **SQL Editor**
3. Copiar contenido de `supabase/schema.sql`
4. **Run**

### Verificar Tablas

1. **Table Editor** en el menú izquierdo
2. Deberían aparecer: perfiles, productos, categorias, subcategorias, laboratorios, etiquetas, pedidos, secciones_landing, subscribers

---

## 🐛 Troubleshooting

### Error 404 en Vercel
- Verificar que las variables de entorno están configuradas en Vercel Dashboard
- Verificar que las tablas de Supabase están creadas

### Error de conexión a Supabase
- Verificar `.env.local` existe y tiene valores correctos
- Verificar que las tablas existen en Supabase

### Build fallido
- `rm -rf .next && npm run build`
- Verificar TypeScript errors

---

## 📞 Contactos

| Rol | Nombre |
|-----|--------|
| Desarrollador | OpenCode Assistant |
| Cliente | Camponuevo |

---

## 📄 Licencia

Proyecto privado para Camponuevo. Todos los derechos reservados.
