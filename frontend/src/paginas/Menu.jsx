// Menu.jsx
// Página principal para mostrar el menú de platillos y categorías. Permite filtrar y agregar platillos al carrito.

import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Chip,
  Container,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Button,
  Zoom,
  Fade
} from '@mui/material';
import { Restaurant, Category, Star, LocalDining } from '@mui/icons-material';
import axios from 'axios';
import TarjetaPlatillo from '../componentes/TarjetaPlatillo';
import { usarCarrito } from '../contexto/CarritoContext';

const fondoUrl = 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1500&q=80';

export default function Menu() {
  // Estados para platillos, categorías, selección, carga y errores
  const [platillos, setPlatillos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { agregarAlCarrito } = usarCarrito();

  // Carga los datos de platillos y categorías al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para obtener datos del backend
  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');
      const [platillosRes, categoriasRes] = await Promise.all([
        axios.get('http://192.168.2.7:5000/platillos'),
        axios.get('http://192.168.2.7:5000/categorias')
      ]);
      setPlatillos(platillosRes.data);
      setCategorias(categoriasRes.data);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('No se puede conectar con el servidor. Verifica que el backend esté corriendo.');
      } else if (err.response?.status === 404) {
        setError('Rutas no encontradas. Verifica que el backend esté configurado correctamente.');
      } else if (err.response?.status === 500) {
        setError('Error interno del servidor. Revisa los logs del backend.');
      } else {
        setError('Error al cargar el menú. Verifica que el backend esté corriendo en http://192.168.2.7:5000');
      }
    } finally {
      setLoading(false);
    }
  };

  // Agrega un platillo al carrito
  const handleAgregar = (platillo) => {
    agregarAlCarrito(platillo);
  };

  // Filtra los platillos por categoría seleccionada
  const platillosFiltrados = categoriaSeleccionada === 0 
    ? platillos 
    : platillos.filter(p => p.id_categoria === categoriaSeleccionada);

  // Obtiene el nombre de la categoría por id
  const getCategoriaNombre = (idCategoria) => {
    const categoria = categorias.find(c => c.id_categoria === idCategoria);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  // Muestra un loader mientras se cargan los datos
  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">Cargando menú...</Typography>
        <Typography variant="body2" color="text.secondary">Conectando con el servidor</Typography>
      </Box>
    );
  }

  // Muestra un mensaje de error si ocurre un problema
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Restaurant sx={{ fontSize: 80, color: 'grey.400', mb: 3 }} />
          <Typography variant="h4" color="text.secondary" gutterBottom>Error al cargar el menú</Typography>
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Verifica que el backend esté corriendo en http://192.168.2.7:5000
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" onClick={cargarDatos} sx={{ fontWeight: 600 }}>Reintentar</Button>
            <Button variant="outlined" onClick={() => window.location.reload()} sx={{ fontWeight: 600 }}>Recargar página</Button>
          </Box>
        </Box>
      </Container>
    );
  }

  // Render principal del menú
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      py: { xs: 4, md: 8 }
    }}>
      {/* Fondo y overlay visual */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundImage: `url(${fondoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px) brightness(0.7)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'linear-gradient(120deg, rgba(255, 183, 94, 0.25) 0%, rgba(255, 255, 255, 0.10) 100%)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          boxShadow: 6,
          py: 4
        }}
      >
        {/* Título y descripción */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LocalDining sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#222' }}>
              Nuestro Menú Estelar
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Disfruta de nuestra mejor selección gourmet
            </Typography>
          </Box>
        </Fade>

        {/* Filtros de categorías */}
        {categorias.length > 0 && (
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
              <Category /> Categorías
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip label="Todos" onClick={() => setCategoriaSeleccionada(0)} color={categoriaSeleccionada === 0 ? "primary" : "default"} variant={categoriaSeleccionada === 0 ? "filled" : "outlined"} sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1, '&:hover': { transform: 'scale(1.08)' }, transition: 'all 0.2s ease' }} />
              {categorias.map((categoria) => (
                <Chip key={categoria.id_categoria} label={categoria.nombre} onClick={() => setCategoriaSeleccionada(categoria.id_categoria)} color={categoriaSeleccionada === categoria.id_categoria ? "primary" : "default"} variant={categoriaSeleccionada === categoria.id_categoria ? "filled" : "outlined"} sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1, '&:hover': { transform: 'scale(1.08)' }, transition: 'all 0.2s ease' }} />
              ))}
            </Box>
          </Box>
        )}

        {/* Contador de platillos */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {platillosFiltrados.length} platillo{platillosFiltrados.length !== 1 ? 's' : ''} 
            {categoriaSeleccionada !== 0 && ` en ${getCategoriaNombre(categoriaSeleccionada)}`}
          </Typography>
        </Box>

        {/* Lista de platillos o mensaje si no hay */}
        {platillosFiltrados.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 6 }}>
            <CardContent>
              <Restaurant sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay platillos disponibles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {categoriaSeleccionada !== 0 
                  ? `No hay platillos en la categoría "${getCategoriaNombre(categoriaSeleccionada)}"`
                  : 'No hay platillos en el menú actualmente'}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {platillosFiltrados.map(p => (
              <Zoom in key={p.id_platillo}>
                <Grid item xs={12} sm={6} md={4}>
                  <TarjetaPlatillo platillo={p} onAgregar={handleAgregar} />
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
