-- Migration: Insert initial landing sections
-- Run this SQL in Supabase SQL Editor to initialize the landing page sections

-- Insertar secciones iniciales solo si no existen
INSERT INTO public.secciones_landing (tipo, titulo, activa, orden, config)
SELECT 
  'hero', 
  'Lo mejor para tu campo', 
  true, 
  1, 
  '{
    "titulo": "Productos Naturales para tu Bienestar",
    "subtitulo": "Encuentra todo lo que necesitas para el cuidado de tus animales",
    "cta_texto": "Ver Catálogo",
    "cta_url": "/catalogo",
    "imagen_fondo": ""
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.secciones_landing WHERE tipo = 'hero');

INSERT INTO public.secciones_landing (tipo, titulo, activa, orden, config)
SELECT 
  'categorias', 
  'Nuestras Categorías', 
  true, 
  2, 
  '{
    "titulo": "Nuestras Categorías",
    "descripcion": "Explora nuestra selección de productos",
    "categorias": []
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.secciones_landing WHERE tipo = 'categorias');

INSERT INTO public.secciones_landing (tipo, titulo, activa, orden, config)
SELECT 
  'productos', 
  'Productos Destacados', 
  true, 
  3, 
  '{
    "titulo": "Productos Destacados",
    "descripcion": "Los más elegidos por nuestros clientes",
    "subcategorias_ids": [],
    "max_productos": 8
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.secciones_landing WHERE tipo = 'productos');

INSERT INTO public.secciones_landing (tipo, titulo, activa, orden, config)
SELECT 
  'testimonios', 
  'Lo que dicen nuestros clientes', 
  true, 
  4, 
  '{
    "titulo": "Lo que dicen nuestros clientes",
    "descripcion": "",
    "testimonios": [
      {
        "texto": "Los productos de veterinaria son de excelente calidad. Mis animales han mejorado mucho su salud general.",
        "autor": "Esteban González",
        "rol": "Productor Ganadero",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
      },
      {
        "texto": "La atención al cliente es increíble. Me explicaron al detalle la dosis exacta que necesitaba.",
        "autor": "María Rodriguez",
        "rol": "Administradora de Estancia",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
      },
      {
        "texto": "Compro todas mis semillas y suplementos equinos en su plataforma. Siempre envían rápido.",
        "autor": "Martín Pinal",
        "rol": "Caballos y Pasturas",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
      }
    ]
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.secciones_landing WHERE tipo = 'testimonios');

INSERT INTO public.secciones_landing (tipo, titulo, activa, orden, config)
SELECT 
  'newsletter', 
  'Newsletter', 
  true, 
  5, 
  '{
    "titulo": "Únete al Boletín del Campo",
    "descripcion": "Recibe ofertas exclusivas, información sobre productos veterinarios y las últimas novedades."
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.secciones_landing WHERE tipo = 'newsletter');

-- Verificar las secciones insertadas
SELECT tipo, titulo, activa, orden FROM public.secciones_landing ORDER BY orden;
