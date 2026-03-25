import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Button,
} from '@react-email/components';

interface OrderItem {
  id: string;
  titulo: string;
  cantidad: number;
  precio: number;
}

interface AdminNewOrderEmailProps {
  orderId: string;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono?: string;
  items: OrderItem[];
  total: number;
  datosEnvio: {
    provincia: string;
    ciudad: string;
    direccion: string;
    codigoPostal?: string;
  };
  notas?: string;
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

export function AdminNewOrderEmail({
  orderId,
  clienteNombre,
  clienteEmail,
  clienteTelefono,
  items,
  total,
  datosEnvio,
  notas,
}: AdminNewOrderEmailProps) {
  const adminUrl = 'https://camponuevo.com.ar/admin';

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>Nuevo Pedido</Text>
            <Text style={styles.orderId}>Pedido #{orderId}</Text>
          </Section>

          <Section style={styles.alert}>
            <Text style={styles.alertText}>
              Se ha registrado un nuevo pedido en Camponuevo
            </Text>
          </Section>

          <Section style={styles.content}>
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Datos del Cliente</Text>
              <Text style={styles.data}><strong>Nombre:</strong> {clienteNombre}</Text>
              <Text style={styles.data}><strong>Email:</strong> {clienteEmail}</Text>
              {clienteTelefono && (
                <Text style={styles.data}><strong>Teléfono:</strong> {clienteTelefono}</Text>
              )}
            </Section>

            <Hr style={styles.divider} />

            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Datos de Envío</Text>
              <Text style={styles.data}>
                <strong>Provincia:</strong> {provinciaMap[datosEnvio.provincia] || datosEnvio.provincia}
              </Text>
              <Text style={styles.data}><strong>Ciudad:</strong> {datosEnvio.ciudad}</Text>
              <Text style={styles.data}><strong>Dirección:</strong> {datosEnvio.direccion}</Text>
              {datosEnvio.codigoPostal && (
                <Text style={styles.data}><strong>Código Postal:</strong> {datosEnvio.codigoPostal}</Text>
              )}
            </Section>

            {notas && (
              <>
                <Hr style={styles.divider} />
                <Section style={styles.section}>
                  <Text style={styles.sectionTitle}>Notas del Pedido</Text>
                  <Text style={styles.data}>{notas}</Text>
                </Section>
              </>
            )}

            <Hr style={styles.divider} />

            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Productos ({items.length})</Text>
              <Section style={styles.itemsBox}>
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
              </Section>
            </Section>

            <Section style={styles.totalSection}>
              <Text style={styles.totalLabel}>TOTAL DEL PEDIDO</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </Section>

            <Section style={styles.ctaSection}>
              <Button href={adminUrl} style={styles.button}>
                Ver en Panel Admin
              </Button>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Este es un email automático generado por Camponuevo
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '30px',
    maxWidth: '600px',
  },
  header: {
    backgroundColor: '#2d5a27',
    padding: '20px',
    borderRadius: '8px 8px 0 0',
    textAlign: 'center' as const,
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#ffffff',
    margin: '0',
  },
  orderId: {
    fontSize: '14px',
    color: '#ffffff',
    opacity: 0.9,
    margin: '5px 0 0 0',
  },
  alert: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '0 0 8px 8px',
    marginBottom: '20px',
  },
  alertText: {
    fontSize: '14px',
    color: '#856404',
    margin: '0',
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
  },
  content: {
    padding: '20px 0',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 'bold' as const,
    color: '#666666',
    textTransform: 'uppercase' as const,
    marginBottom: '10px',
  },
  data: {
    fontSize: '14px',
    color: '#333333',
    margin: '5px 0',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: '20px 0',
  },
  itemsBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    padding: '15px',
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
    fontWeight: 'bold' as const,
    margin: '0',
  },
  totalSection: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: '#2d5a27',
    padding: '15px 20px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  totalLabel: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: 'bold' as const,
    margin: '0',
  },
  totalValue: {
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: 'bold' as const,
    margin: '0',
  },
  ctaSection: {
    textAlign: 'center' as const,
    marginTop: '25px',
  },
  button: {
    backgroundColor: '#2d5a27',
    color: '#ffffff',
    padding: '12px 30px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold' as const,
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '11px',
    color: '#999999',
    margin: '0',
  },
};
