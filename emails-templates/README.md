# Email Templates - Camponuevo

Este directorio contiene los templates HTML personalizados para los emails de autenticación de Supabase.

## Templates Disponibles

| Archivo | Descripción | Uso |
|---------|-------------|-----|
| `confirm-signup.html` | Email de confirmación de registro | Se envía al registrarse |
| `reset-password.html` | Email de recuperación de contraseña | Se envía al pedir restablecer |
| `confirm-change.html` | Confirmación de cambio de contraseña | Se envía después de cambiar |

## Cómo configurar en Supabase

### Paso 1: Acceder a Email Templates

1. Ir a https://supabase.com/dashboard/project/qqavybhkwjhkifvlwhcv/auth/templates
2. Verás los 3 templates: Confirm signup, Reset password, Confirm change

### Paso 2: Personalizar cada template

Para cada template, copiá el contenido HTML del archivo correspondiente y pegalo en el campo de Supabase.

**Nota importante**: Supabase usa variables como `{{ .ConfirmationURL }}`. Estas variables se reemplazan automáticamente con los valores correctos.

### Paso 3: Verificar configuración SMTP

Asegurate de que el SMTP de Resend esté configurado en:
- Settings → Authentication → SMTP Settings

## Vista previa de los templates

### Confirm Signup
- Logo de Camponuevo con gradiente verde
- Botón grande "Confirmar mi cuenta"
- Instrucciones claras
- Información de expiración

### Reset Password
- Diseño consistente con la marca
- Botón "Restablecer contraseña"
- Advertencia de seguridad
- Tiempo de expiración

### Confirm Change
- Icono de check verde
- Mensaje de éxito
- Botón "Ir a mi cuenta"
- Advertencia de seguridad

## Variables disponibles en Supabase

| Variable | Descripción |
|----------|-------------|
| `{{ .ConfirmationURL }}` | URL para confirmar la acción |
| `{{ .Email }}` | Email del usuario |
| `{{ .Token }}` | Token de verificación |
| `{{ .TokenHash }}` | Hash del token |
| `{{ .NewEmail }}` | Nuevo email (para cambios) |
| `{{ .SiteURL }}` | URL del sitio |

## Tips

- Los templates son responsive (funcionan en móvil y escritorio)
- Usan colores de la marca Camponuevo (#2d5a27, #1b5e20, #4caf50)
- Incluyen fallbacks para clientes de email que no soportan CSS moderno
