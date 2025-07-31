// PanelCocina.jsx
// Panel para que el cocinero gestione los pedidos pendientes y en preparación.

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
  Chip
} from '@mui/material';
import { Restaurant, CheckCircle, Schedule } from '@mui/icons-material';
import axios from 'axios';

export default function PanelCocina() {
  // Estados para pedidos y mensajes
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Carga los pedidos pendientes y en preparación al montar y cada 30 segundos
  const cargarPedidos = () => {
    axios.get('http://192.168.2.7:5000/pedidos')
      .then(res => {
        // Filtra los pedidos relevantes para la cocina
        const pedidosCocina = res.data.filter(p => 
          p.estado === 'pendiente' || p.estado === 'en preparación'
        );
        setPedidos(pedidosCocina);
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

  // Cambia el estado de un pedido
  const cambiarEstadoPedido = (idPedido, nuevoEstado) => {
    axios.patch(`http://192.168.2.7:5000/pedidos/${idPedido}/estado`, {
      estado: nuevoEstado
    })
    .then(() => {
      cargarPedidos();
      setMensaje(`Pedido #${idPedido} ${nuevoEstado === 'en preparación' ? 'en preparación' : 'marcado como listo'}`);
    })
    .catch(err => {
      console.error(err);
      setMensaje('Error al actualizar pedido');
    });
  };

  // Helpers para mostrar colores e íconos según el estado
  const getColorEstado = (estado) => {
    switch (estado) {
      case 'pendiente': return 'warning.main';
      case 'en preparación': return 'info.main';
      case 'listo': return 'success.main';
      default: return 'text.secondary';
    }
  };

  const getIconoEstado = (estado) => {
    switch (estado) {
      case 'pendiente': return <Schedule />;
      case 'en preparación': return <Restaurant />;
      case 'listo': return <CheckCircle />;
      default: return <Schedule />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Título principal */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
        🥳 Panel de Cocina
      </Typography>
      
      {/* Mensaje de estado */}
      {mensaje && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      {/* Subtítulo y contador de pedidos */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Pedidos para Preparar ({pedidos.length})
      </Typography>

      {/* Lista de pedidos para la cocina */}
      {pedidos.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6, background: 'rgba(255,255,255,0.9)' }}>
          <CardContent>
            <Restaurant sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay pedidos pendientes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Todos los pedidos están listos o no hay nuevos pedidos
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
                    color={p.estado === 'pendiente' ? 'warning' : 'info'}
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Fecha: {new Date(p.fecha_hora).toLocaleString()}
                </Typography>

                {/* Acciones según el estado del pedido */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {p.estado === 'pendiente' && (
                    <Button 
                      variant="contained" 
                      color="info"
                      startIcon={<Restaurant />}
                      onClick={() => cambiarEstadoPedido(p.id_pedido, 'en preparación')}
                      sx={{ fontWeight: 600 }}
                    >
                      Iniciar Preparación
                    </Button>
                  )}
                  {p.estado === 'en preparación' && (
                    <Button 
                      variant="contained" 
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => cambiarEstadoPedido(p.id_pedido, 'listo')}
                      sx={{ fontWeight: 600 }}
                    >
                      Marcar como Listo
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}