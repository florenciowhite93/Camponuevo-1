import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Img,
} from '@react-email/components';

interface OrderItem {
  id: string;
  titulo: string;
  cantidad: number;
  precio: number;
  imagen?: string;
}

interface OrderConfirmationEmailProps {
  orderId: string;
  clienteNombre: string;
  clienteEmail: string;
  items: OrderItem[];
  total: number;
  datosEnvio: {
    provincia: string;
    ciudad: string;
    direccion: string;
    telefono?: string;
  };
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
};

const provinciaMap: Record<string, string> = {
  buenos_aires: 'Buenos Aires',
  cordoba: 'Córdoba',
  santa_fe: 'Santa Fe',
  mendendoza: 'Mendoza',
  tucuman: 'Tucumán',
  entre_rios: 'Entre Ríos',
  corrientes: 'Corrientes',
  misiones: 'Misiones',
  chaco: 'Chaco',
  formosa: 'Formosa',
  santiago: 'Santiago del Estero',
  salta: 'Salta',
  jujuy: 'Jujuy',
  catamarca: 'Catamarca',
  la_rioja: 'La Rioja',
  san_luis: 'San Luis',
  san_juan: 'San Juan',
};

export function OrderConfirmationEmail({
  orderId,
  clienteNombre,
  items,
  total,
  datosEnvio,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>Camponuevo</Text>
            <Text style={styles.subtitle}>Veterinaria y Productos Rurales</Text>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.greeting}>¡Gracias por tu compra, {clienteNombre}!</Text>
            <Text style={styles.text}>
              Tu pedido ha sido recibido correctamente. A continuación encontrás el resumen:
            </Text>

            <Section style={styles.orderBox}>
              <Text style={styles.orderId}>Pedido #{orderId}</Text>
              <Hr style={styles.divider} />
              
              <Text style={styles.sectionTitle}>Productos</Text>
              {items.map((item) => (
                <Section key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemName}>
                    {item.cantidad}x {item.titulo}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.precio * item.cantidad)}
                  </Text>
                </Section>
              ))}
              
              <Hr style={styles.divider} />
              
              <Section style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </Section>
            </Section>

            <Section style={styles.shippingBox}>
              <Text style={styles.sectionTitle}>Datos de Envío</Text>
              <Text style={styles.shippingText}>
                <strong>Provincia:</strong> {provinciaMap[datosEnvio.provincia] || datosEnvio.provincia}
              </Text>
              <Text style={styles.shippingText}>
                <strong>Ciudad:</strong> {datosEnvio.ciudad}
              </Text>
              <Text style={styles.shippingText}>
                <strong>Dirección:</strong> {datosEnvio.direccion}
              </Text>
              {datosEnvio.telefono && (
                <Text style={styles.shippingText}>
                  <strong>Teléfono:</strong> {datosEnvio.telefono}
                </Text>
              )}
            </Section>

            <Section style={styles.notice}>
              <Text style={styles.noticeText}>
                Nos comunicaremos a la brevedad para coordinar el envío y confirmar la disponibilidad de los productos.
              </Text>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Tenés alguna consulta? Escribinos a camponuevo@gmail.com
            </Text>
            <Text style={styles.footerText}>
              © 2024 Camponuevo. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    color: '#2d5a27',
    margin: '0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666666',
    margin: '5px 0 0 0',
  },
  content: {
    padding: '0 10px',
  },
  greeting: {
    fontSize: '20px',
    color: '#333333',
    marginBottom: '15px',
  },
  text: {
    fontSize: '14px',
    color: '#555555',
    lineHeight: '1.6' as const,
    marginBottom: '20px',
  },
  orderBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  orderId: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#2d5a27',
    margin: '0 0 15px 0',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: '15px 0',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 'bold' as const,
    color: '#333333',
    margin: '0 0 10px 0',
    textTransform: 'uppercase' as const,
  },
  itemRow: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    marginBottom: '8px',
  },
  itemName: {
    fontSize: '14px',
    color: '#333333',
    margin: '0',
  },
  itemPrice: {
    fontSize: '14px',
    color: '#333333',
    margin: '0',
  },
  totalRow: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#333333',
    margin: '0',
  },
  totalValue: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#2d5a27',
    margin: '0',
  },
  shippingBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  shippingText: {
    fontSize: '14px',
    color: '#555555',
    margin: '5px 0',
  },
  notice: {
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    padding: '15px',
    marginTop: '20px',
  },
  noticeText: {
    fontSize: '14px',
    color: '#2d5a27',
    margin: '0',
    textAlign: 'center' as const,
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    color: '#999999',
    margin: '5px 0',
  },
};
