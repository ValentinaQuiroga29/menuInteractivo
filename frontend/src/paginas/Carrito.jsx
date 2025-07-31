// Carrito.jsx
// Página para mostrar y gestionar el carrito de compras del usuario. Permite enviar el pedido al backend.

import React, { useEffect } from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Alert, 
  Box, 
  Container,
  Paper,
  Divider
} from '@mui/material';
import { usarCarrito } from '../contexto/CarritoContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ArrowBack } from '@mui/icons-material';

export default function Carrito() {
  // Obtiene el estado y métodos del carrito desde el contexto
  const { carrito, quitarDelCarrito, vaciarCarrito } = usarCarrito();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = React.useState("");
  const [enviando, setEnviando] = React.useState(false);

  // Debug: mostrar el carrito en consola cada vez que cambia
  useEffect(() => {
    console.log('🛒 Carrito actual:', carrito);
    console.log('📊 Número de items:', carrito.length);
  }, [carrito]);

  // Función para convertir precio a número de forma segura
  const parsePrecio = (precio) => {
    if (typeof precio === 'number') return precio;
    if (typeof precio === 'string') return parseFloat(precio) || 0;
    return 0;
  };

  // Calcula el total a pagar
  const total = carrito.reduce((sum, item) => {
    const precio = parsePrecio(item.precio);
    return sum + (precio * item.cantidad);
  }, 0);

  // Envía el pedido al backend
  const enviarPedido = async () => {
    if (carrito.length === 0) {
      setMensaje("El carrito está vacío.");
      return;
    }

    setEnviando(true);
    setMensaje("Enviando pedido...");

    try {
      // Prepara los datos del pedido
      const productos = carrito.map(p => ({
        id_platillo: p.id_platillo,
        cantidad: p.cantidad
      }));

      const pedido = {
        id_cliente: 1, // Aquí podrías usar el id real del usuario
        productos
      };

      console.log('📤 Enviando pedido:', pedido);

      const response = await axios.post('http://192.168.2.7:5000/pedidos/nuevo_pedido', pedido);

      console.log('✅ Respuesta del servidor:', response.data);

      setMensaje("✅ ¡Pedido enviado con éxito! Tu pedido está siendo preparado.");
      vaciarCarrito();
      setTimeout(() => {
        navigate("/menu");
        setMensaje("");
      }, 3000);

    } catch (error) {
      console.error('❌ Error al enviar pedido:', error);
      setMensaje("❌ Error al enviar el pedido. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Header de la página */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShoppingCart sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Tu Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Revisa tu pedido antes de confirmarlo
        </Typography>
      </Box>

      {/* Mensajes de estado (éxito, error, info) */}
      {mensaje && (
        <Alert 
          severity={mensaje.includes("✅") ? "success" : "info"} 
          sx={{ mb: 3 }}
          icon={mensaje.includes("✅") ? <CheckCircle /> : undefined}
        >
          {mensaje}
        </Alert>
      )}

      {/* Carrito vacío */}
      {carrito.length === 0 ? (
        <Paper sx={{ textAlign: 'center', py: 8, px: 4 }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'grey.400', mb: 3 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Agrega algunos platillos deliciosos para comenzar
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/menu")}
            sx={{ fontWeight: 600, px: 4, py: 1.5 }}
          >
            Ir al Menú
          </Button>
        </Paper>
      ) : (
        // Carrito con productos
        <Box>
          {/* Lista de productos en el carrito */}
          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 3, backgroundColor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Productos en tu carrito ({carrito.length})
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {carrito.map((item, index) => {
                const precio = parsePrecio(item.precio);
                const subtotal = precio * item.cantidad;
                
                return (
                  <React.Fragment key={item.id_platillo}>
                    <ListItem sx={{ py: 3, px: 3 }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {item.nombre}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Cantidad: {item.cantidad} | Precio unitario: ${precio.toFixed(2)}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          ${subtotal.toFixed(2)}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          color="error"
                          size="small"
                          onClick={() => quitarDelCarrito(item.id_platillo)}
                          sx={{ fontWeight: 600 }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    </ListItem>
                    {index < carrito.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>

          {/* Total a pagar */}
          <Paper sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            p: 4, 
            mb: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Total a Pagar
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              ${total.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              💳 Pago en efectivo al momento de la entrega
            </Typography>
          </Paper>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={enviarPedido}
              disabled={enviando}
              sx={{ fontWeight: 600, px: 4, py: 1.5 }}
            >
              Confirmar Pedido
            </Button>
            <Button 
              variant="outlined" 
              color="error"
              size="large"
              onClick={vaciarCarrito}
              disabled={enviando}
              sx={{ fontWeight: 600, px: 4, py: 1.5 }}
            >
              Vaciar Carrito
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}