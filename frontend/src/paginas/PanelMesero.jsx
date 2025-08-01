// PanelMesero.jsx
// Panel para que el mesero gestione los pedidos activos, reciba pagos y actualice estados.

import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Typography, 
  Box, 
  Alert,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  Restaurant, 
  CheckCircle, 
  Schedule, 
  LocalShipping,
  Payment,
  AttachMoney
} from '@mui/icons-material';
import axios from 'axios';

export default function PanelMesero() {
  // Estados para pedidos, mensajes y diálogo de pago
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [dialogPago, setDialogPago] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [montoRecibido, setMontoRecibido] = useState('');

  // Carga los pedidos activos al montar y cada 30 segundos
  const cargarPedidos = () => {
    axios.get('http://192.168.2.7:5000/pedidos')
      .then(res => {
        // Filtra los pedidos relevantes para el mesero
        const pedidosActivos = res.data.filter(p => 
          p.estado === 'esperando_pago' || p.estado === 'pendiente' || 
          p.estado === 'en_preparacion' || p.estado === 'listo'
        );
        setPedidos(pedidosActivos);
      })
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar pedidos');
      });
  };

  useEffect(() => {
    cargarPedidos();
    // Recarga periódica
    const interval = setInterval(cargarPedidos, 30000);
    return () => clearInterval(interval);
  }, []);

  // Actualiza el estado de un pedido
  const actualizarEstadoPedido = (idPedido, nuevoEstado) => {
    axios.patch(`http://192.168.2.7:5000/pedidos/${idPedido}/estado`, {
      estado: nuevoEstado
    })
    .then(() => {
      cargarPedidos();
      setMensaje(`Pedido #${idPedido} actualizado a ${nuevoEstado}`);
    })
    .catch(err => {
      console.error(err);
      setMensaje('Error al actualizar pedido');
    });
  };

  // Registra el pago de un pedido y envía a cocina
  const registrarPago = (idPedido) => {
    const idMesero = parseInt(localStorage.getItem('usuario_id'));
    
    // Primero registra el pago
    axios.post(`http://192.168.2.7:5000/pedidos/transacciones`, {
      id_pedido: idPedido,
      metodo_pago: 'efectivo',
      id_mesero: idMesero
    })
    .then(() => {
      // Luego envía el pedido a cocina
      return axios.patch(`http://192.168.2.7:5000/pedidos/${idPedido}/estado`, {
        estado: 'enviado_a_cocina'
      });
    })
    .then(() => {
      cargarPedidos();
      setMensaje(`✅ Pago registrado y pedido #${idPedido} enviado a cocina`);
      setDialogPago(false);
      setPedidoSeleccionado(null);
      setMontoRecibido('');
    })
    .catch(err => {
      console.error(err);
      setMensaje('Error al procesar pago y enviar a cocina');
    });
  };

  // Abre el diálogo para registrar pago
  const abrirDialogPago = (pedido) => {
    setPedidoSeleccionado(pedido);
    setDialogPago(true);
  };

  // Helpers para mostrar colores e íconos según el estado
  const getColorEstado = (estado) => {
    switch (estado) {
      case 'esperando_pago': return 'error.main'; // Rojo para esperando pago
      case 'pendiente': return 'warning.main';
      case 'pagado': return 'info.main';
      case 'en_preparacion': return 'primary.main';
      case 'listo': return 'success.main';
      case 'entregado': return 'secondary.main';
      default: return 'text.secondary';
    }
  };

  const getIconoEstado = (estado) => {
    switch (estado) {
      case 'esperando_pago': return <AttachMoney />; // Ícono de dinero para esperando pago
      case 'pendiente': return <Schedule />;
      case 'pagado': return <Payment />;
      case 'en_preparacion': return <Restaurant />;
      case 'listo': return <CheckCircle />;
      case 'entregado': return <LocalShipping />;
      default: return <Schedule />;
    }
  };

  const getChipColor = (estado) => {
    switch (estado) {
      case 'esperando_pago': return 'error'; // Rojo para esperando pago
      case 'pendiente': return 'warning';
      case 'pagado': return 'info';
      case 'en_preparacion': return 'primary';
      case 'listo': return 'success';
      case 'entregado': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Título principal */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
        👨‍💼 Panel de Mesero - Gestión de Pedidos
      </Typography>
      
      {/* Mensaje de estado */}
      {mensaje && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      {/* Subtítulo y contador de pedidos */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Pedidos Activos ({pedidos.length})
      </Typography>

      {/* Lista de pedidos activos */}
      {pedidos.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6, background: 'rgba(255,255,255,0.9)' }}>
          <CardContent>
            <Restaurant sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay pedidos activos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Todos los pedidos han sido entregados o no hay nuevos pedidos
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {pedidos.map(p => (
            <Card key={p.id_pedido} sx={{ 
              border: '2px solid',
              borderColor: getColorEstado(p.estado),
              borderRadius: 2,
              background: 'rgba(255,255,255,0.95)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Pedido #{p.id_pedido}
                  </Typography>
                  <Chip
                    icon={getIconoEstado(p.estado)}
                    label={p.estado}
                    color={getChipColor(p.estado)}
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Fecha: {new Date(p.fecha_hora).toLocaleString()}
                </Typography>

                {/* Acciones según el estado del pedido */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {p.estado === 'esperando_pago' && (
                    <Button 
                      variant="contained" 
                      color="error"
                      startIcon={<AttachMoney />}
                      onClick={() => abrirDialogPago(p)}
                      sx={{ fontWeight: 600 }}
                    >
                      Recibir Pago y Enviar a Cocina
                    </Button>
                  )}
                  {p.estado === 'pendiente' && (
                    <Button 
                      variant="contained" 
                      color="info"
                      startIcon={<AttachMoney />}
                      onClick={() => abrirDialogPago(p)}
                      sx={{ fontWeight: 600 }}
                    >
                      Recibir Pago
                    </Button>
                  )}
                  {p.estado === 'pagado' && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<Restaurant />}
                      onClick={() => actualizarEstadoPedido(p.id_pedido, 'en preparación')}
                      sx={{ fontWeight: 600 }}
                    >
                      Enviar a Cocina
                    </Button>
                  )}
                  {p.estado === 'en preparación' && (
                    <Button 
                      variant="contained" 
                      color="warning"
                      startIcon={<Schedule />}
                      disabled
                      sx={{ fontWeight: 600 }}
                    >
                      En Preparación
                    </Button>
                  )}
                  {p.estado === 'listo' && (
                    <Button 
                      variant="contained" 
                      color="success"
                      startIcon={<LocalShipping />}
                      onClick={() => actualizarEstadoPedido(p.id_pedido, 'entregado')}
                      sx={{ fontWeight: 600 }}
                    >
                      Entregar al Cliente
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}

      {/* Diálogo para registrar pago en efectivo */}
      <Dialog open={dialogPago} onClose={() => setDialogPago(false)}>
        <DialogTitle>
          {pedidoSeleccionado?.estado === 'esperando_pago' 
            ? 'Recibir Pago y Enviar a Cocina' 
            : 'Recibir Pago en Efectivo'
          }
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Pedido #{pedidoSeleccionado?.id_pedido}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Monto recibido"
            type="number"
            fullWidth
            variant="outlined"
            value={montoRecibido}
            onChange={(e) => setMontoRecibido(e.target.value)}
            InputProps={{
              startAdornment: <AttachMoney />
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogPago(false)}>Cancelar</Button>
          <Button 
            onClick={() => registrarPago(pedidoSeleccionado?.id_pedido)}
            variant="contained"
            disabled={!montoRecibido || parseFloat(montoRecibido) <= 0}
          >
            {pedidoSeleccionado?.estado === 'esperando_pago' 
              ? 'Confirmar Pago y Enviar a Cocina' 
              : 'Confirmar Pago'
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}