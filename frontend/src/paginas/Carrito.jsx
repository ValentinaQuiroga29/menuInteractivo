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
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Badge,
  Chip
} from '@mui/material';
import { usarCarrito } from '../contexto/CarritoContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';
import { 
  ShoppingCart, 
  CheckCircle, 
  ArrowBack,
  Restaurant,
  Add,
  Remove,
  Delete,
  LocalShipping,
  Payment
} from '@mui/icons-material';

// Paleta de colores inspirada en McDonald's
const primaryColor = '#FF6B35'; // Naranja vibrante
const secondaryColor = '#2C3E50'; // Azul oscuro
const accentColor = '#E74C3C'; // Rojo
const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;

export default function Carrito() {
  // Obtiene el estado y métodos del carrito desde el contexto
  const { carrito, quitarDelCarrito, vaciarCarrito, actualizarCantidad } = usarCarrito();
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
        id: p.id_platillo,
        cantidad: p.cantidad,
        precio: p.precio
      }));

      const pedido = {
        id_cliente: 1, // Aquí podrías usar el id real del usuario
        productos
      };

      console.log('📤 Enviando pedido:', pedido);

      const response = await axios.post(`${BACKEND_URL}/pedidos/nuevo_pedido`, pedido);

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
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ 
        background: 'white', 
        color: secondaryColor,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate('/menu')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Avatar sx={{ 
              background: gradientBg,
              width: 40,
              height: 40
            }}>
              <Restaurant />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 800,
                color: primaryColor,
                fontSize: '1.2rem'
              }}>
                BOOM BURGER
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tu Carrito
              </Typography>
            </Box>
          </Box>
          
          <Badge badgeContent={carrito.length} color="error">
            <ShoppingCart sx={{ color: secondaryColor }} />
          </Badge>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        background: gradientBg,
        py: 4,
        px: 2
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ 
            color: 'white',
            fontWeight: 800,
            mb: 1,
            textAlign: 'center'
          }}>
            Tu Carrito de Compras
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center'
          }}>
            Revisa tu pedido antes de confirmarlo
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
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
          <Paper sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 4,
            background: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <ShoppingCart sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
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
              sx={{ 
                fontWeight: 700,
                px: 4, 
                py: 2,
                background: gradientBg,
                color: 'white',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Ir al Menú
            </Button>
          </Paper>
        ) : (
          // Carrito con productos
          <Box>
            {/* Lista de productos en el carrito */}
            <Paper sx={{ 
              mb: 3, 
              overflow: 'hidden',
              background: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <Box sx={{ 
                p: 3, 
                background: gradientBg, 
                color: 'white' 
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {item.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Precio unitario: ${precio.toFixed(2)}
                          </Typography>
                          
                          {/* Controles de cantidad */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Chip 
                              label={`Cantidad: ${item.cantidad}`}
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            />
                            <IconButton 
                              size="small"
                              onClick={() => actualizarCantidad(item.id_platillo, item.cantidad - 1)}
                              disabled={item.cantidad <= 1}
                              sx={{ color: primaryColor }}
                            >
                              <Remove />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => actualizarCantidad(item.id_platillo, item.cantidad + 1)}
                              sx={{ color: primaryColor }}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                            ${subtotal.toFixed(2)}
                          </Typography>
                          <IconButton 
                            color="error"
                            onClick={() => quitarDelCarrito(item.id_platillo)}
                            sx={{ 
                              background: '#ffebee',
                              '&:hover': { background: '#ffcdd2' }
                            }}
                          >
                            <Delete />
                          </IconButton>
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
              background: gradientBg, 
              color: 'white',
              p: 4, 
              mb: 4,
              textAlign: 'center',
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(255, 107, 53, 0.3)'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Total a Pagar
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                ${total.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Payment sx={{ fontSize: 20 }} />
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Pago en efectivo al momento de la entrega
                </Typography>
              </Box>
            </Paper>

            {/* Botones de acción */}
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={enviarPedido}
                disabled={enviando}
                startIcon={<LocalShipping />}
                sx={{ 
                  fontWeight: 700, 
                  px: 5, 
                  py: 2,
                  background: gradientBg,
                  color: 'white',
                  fontSize: '1.1rem',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(255, 107, 53, 0.3)',
                  },
                  '&:disabled': {
                    background: '#ccc'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {enviando ? 'Enviando...' : 'Confirmar Pedido'}
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={vaciarCarrito}
                disabled={enviando}
                sx={{ 
                  fontWeight: 600, 
                  px: 5, 
                  py: 2,
                  borderColor: accentColor,
                  color: accentColor,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: accentColor,
                    background: `${accentColor}10`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Vaciar Carrito
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}