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
    .max(100, 'La contraseña es muy larga'),
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
    .min(8, 'Teléfono demasiado corto')
    .max(20, 'Teléfono muy largo'),
  provincia: z.string().min(1, 'Selecciona una provincia'),
  ciudad: z.string()
    .min(2, 'Ciudad requerida')
    .max(100, 'Ciudad muy larga'),
  direccion: z.string()
    .min(5, 'Dirección muy corta')
    .max(200, 'Dirección muy larga'),
  codigoPostal: z.string()
    .max(10, 'Código postal inválido')
    .optional()
    .or(z.literal('')),
  notas: z.string().max(500, 'Notas muy largas').optional().or(z.literal('')),
});

export const productoSchema = z.object({
  titulo: z.string()
    .min(1, 'Título requerido')
    .max(200, 'Título muy largo'),
  precio: z.string()
    .min(1, 'Precio requerido')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Precio debe ser un número válido mayor o igual a 0',
    }),
  laboratorio_id: z.string().nullable().optional(),
  volumen: z.string().max(50).optional().or(z.literal('')),
  descripcion: z.string().max(5000).optional().or(z.literal('')),
  drogas: z.string().max(1000).optional().or(z.literal('')),
  dosis: z.string().max(500).optional().or(z.literal('')),
  especies: z.array(z.string()).optional().default([]),
  etiquetas_ids: z.array(z.string()).optional().default([]),
  subcategorias_ids: z.array(z.string()).optional().default([]),
  imagen: z.string().optional().or(z.literal('')),
  link_externo: z.string().url('Link externo debe ser una URL válida').optional().or(z.literal('')),
  visible: z.boolean().default(true),
});

export type RegistroForm = z.infer<typeof registroSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type CheckoutForm = z.infer<typeof checkoutSchema>;
export type ProductoForm = z.infer<typeof productoSchema>;
