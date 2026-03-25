# Camponuevo - E-commerce de Productos Ganaderos y Rurales

Tienda online de productos veterinarios y rurales para el cuidado de animales de campo.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 16 + TypeScript
- **Estilos**: Tailwind CSS 4
- **Backend/DB**: Supabase
- **Auth**: Supabase Auth (con validación por email)
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React + Font Awesome
- **Deploy**: Vercel

## 📁 Estructura del Proyecto

```
camponuevo/
├── src/
│   ├── app/                    # Rutas de Next.js (App Router)
│   │   ├── (public)/          # Páginas públicas
│   │   │   ├── catalogo/      # Catálogo con filtros
│   │   │   │   └── [id]/     # Detalle de producto
│   │   │   └── nosotros/      # Nosotros + Contacto
│   │   ├── (auth)/           # Rutas de autenticación
│   │   │   ├── login/
│   │   │   ├── registro/
│   │   │   └── recupera/
│   │   ├── checkout/         # Checkout
│   │   ├── cuenta/           # Perfil y pedidos del cliente
│   │   └── admin/           # Panel de administración
│   ├── components/           # Componentes reutilizables
│   │   ├── layout/          # Header, Footer
│   │   ├── admin/           # Componentes del admin
│   │   │   ├── ImportCSV.tsx
│   │   │   └── LandingEditor.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CarritoSidebar.tsx
│   │   └── ClientLayout.tsx
│   ├── context/              # Contextos de React
│   │   └── CarritoContext.tsx
│   ├── hooks/               # Custom hooks
│   │   └── useSupabase.ts
│   ├── lib/                 # Utilidades
│   │   └── supabase/       # Configuración de Supabase
│   └── types/              # Tipos TypeScript
├── supabase/
│   └── schema.sql          # Schema de la base de datos
└── public/                 # Archivos estáticos
```

## 🛠️ Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Base de Datos

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Abre el **SQL Editor**
3. Copia y pega el contenido de `supabase/schema.sql`
4. Ejecuta el SQL

### 3. Deploy

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# O conectar con GitHub y deploy automático
```

## 📱 Funcionalidades

### Sitio Público
- [x] Landing page con secciones dinámicas
- [x] Catálogo con filtros (laboratorio, categoría, especie)
- [x] Búsqueda de productos
- [x] Página de detalle de producto (similar a Wix)
- [x] Página Nosotros + Contacto
- [x] Newsletter
- [x] Carrito de compras (sidebar deslizable)
- [x] Checkout completo

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
- [x] CRUD Productos (con modal de preview)
- [x] CRUD Categorías
- [x] CRUD Subcategorías
- [x] CRUD Laboratorios
- [x] CRUD Etiquetas (10 colores)
- [x] Gestión de Clientes
- [x] Gestión de Pedidos
- [x] Editor de Landing (CRUD + drag & drop)
- [x] Importación de productos por CSV

## 🎨 Personalización

### Colores (Tailwind)

| Variable | Valor | Uso |
|----------|-------|-----|
| primary | #2d5a27 | Botones, enlaces principales |
| secondary | #4caf50 | Acentos, hover |
| accent | #8bc34a | Iconos, badges |
| light | #f1f8e9 | Fondos claros |
| dark | #1b5e20 | Footer, headers |

## 📝 Scripts

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🔐 Seguridad

- Row Level Security (RLS) habilitado en todas las tablas
- API keys en variables de entorno (nunca en código)
- Validación de inputs en cliente y servidor
- Autenticación con email validation

## 📄 Licencia

Este proyecto es privado y propiedad de Camponuevo.
