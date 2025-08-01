// Menu.jsx
// Página principal para mostrar el menú de platillos y categorías. Inspirado en las mejores apps de restaurantes.

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
  Fade,
  Paper,
  Divider,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Restaurant, 
  Category, 
  Star, 
  LocalDining, 
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  TrendingUp,
  FlashOn,
  EmojiFoodBeverage,
  LocalPizza,
  LocalCafe,
  Cake,
  RestaurantMenu,
  Search,
  ShoppingCart,
  Person,
  Home,
  FilterList,
  Sort
} from '@mui/icons-material';
import axios from 'axios';
import TarjetaPlatillo from '../componentes/TarjetaPlatillo';
import { usarCarrito } from '../contexto/CarritoContext';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';

// Paleta de colores inspirada en McDonald's y Starbucks
const primaryColor = '#FF6B35'; // Naranja vibrante
const secondaryColor = '#2C3E50'; // Azul oscuro
const accentColor = '#E74C3C'; // Rojo
const successColor = '#27AE60'; // Verde
const warningColor = '#F39C12'; // Amarillo
const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;
const cardGradient = 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)';

export default function Menu() {
  // Estados para platillos, categorías, selección, carga y errores
  const [platillos, setPlatillos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favoritos, setFavoritos] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { agregarAlCarrito, carrito } = usarCarrito();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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
        axios.get(`${BACKEND_URL}/platillos`),
        axios.get(`${BACKEND_URL}/categorias`)
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
        setError(`Error al cargar el menú. Verifica que el backend esté corriendo en ${BACKEND_URL}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Agrega un platillo al carrito
  const handleAgregar = (platillo) => {
    agregarAlCarrito(platillo);
  };

  // Maneja favoritos
  const toggleFavorito = (platilloId) => {
    const newFavoritos = new Set(favoritos);
    if (newFavoritos.has(platilloId)) {
      newFavoritos.delete(platilloId);
    } else {
      newFavoritos.add(platilloId);
    }
    setFavoritos(newFavoritos);
  };

  // Filtra y ordena los platillos
  const platillosFiltrados = platillos
    .filter(p => categoriaSeleccionada === 0 || p.id_categoria === categoriaSeleccionada)
    .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.precio - b.precio;
        case 'price-high':
          return b.precio - a.precio;
        case 'name':
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

  // Obtiene el nombre de la categoría por id
  const getCategoriaNombre = (idCategoria) => {
    const categoria = categorias.find(c => c.id_categoria === idCategoria);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  // Obtiene el icono de la categoría
  const getCategoriaIcon = (nombre) => {
    switch (nombre.toLowerCase()) {
      case 'entradas': return <RestaurantMenu />;
      case 'platos principales': return <LocalDining />;
      case 'postres': return <Cake />;
      case 'bebidas': return <LocalCafe />;
      case 'ensaladas': return <EmojiFoodBeverage />;
      default: return <Restaurant />;
    }
  };

  // Muestra un loader moderno mientras se cargan los datos
  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: gradientBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3
      }}>
        <Box sx={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          p: 4,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <CircularProgress 
            size={80} 
            sx={{ 
              color: primaryColor,
              mb: 2
            }} 
          />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
            Preparando tu experiencia Boom Burger
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cargando menú digital...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Muestra un mensaje de error moderno si ocurre un problema
  if (error) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: gradientBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="md">
          <Paper sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <FlashOn sx={{ fontSize: 80, color: accentColor, mb: 3 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
              ¡Ups! Algo salió mal
            </Typography>
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Verifica que el backend esté corriendo en http://localhost:5000
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                onClick={cargarDatos} 
                sx={{ 
                  fontWeight: 600,
                  background: gradientBg,
                  '&:hover': { transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease'
                }}
              >
                Reintentar
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => window.location.reload()} 
                sx={{ 
                  fontWeight: 600,
                  borderColor: primaryColor,
                  color: primaryColor,
                  '&:hover': { 
                    borderColor: accentColor,
                    color: accentColor,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Recargar página
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Render principal del menú moderno
  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* App Bar inspirado en McDonald's */}
      <AppBar position="sticky" sx={{ 
        background: 'white', 
        color: secondaryColor,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <Toolbar>
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
                Menú Digital
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: secondaryColor }}>
              <Search />
            </IconButton>
            <Badge badgeContent={carrito.length} color="error">
              <IconButton 
                sx={{ color: secondaryColor }}
                onClick={() => navigate('/carrito')}
              >
                <ShoppingCart />
              </IconButton>
            </Badge>
            <IconButton sx={{ color: secondaryColor }}>
              <Person />
            </IconButton>
          </Box>
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
            ¡Bienvenido a Boom Burger!
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            mb: 3
          }}>
            Descubre nuestras deliciosas hamburguesas y comidas rápidas
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Filtros y búsqueda */}
        <Paper sx={{
          p: 2,
          mb: 3,
          background: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
              <Chip 
                label="Todos" 
                onClick={() => setCategoriaSeleccionada(0)} 
                color={categoriaSeleccionada === 0 ? "primary" : "default"} 
                variant={categoriaSeleccionada === 0 ? "filled" : "outlined"} 
                icon={<Restaurant />}
                sx={{ 
                  fontWeight: 600,
                  background: categoriaSeleccionada === 0 ? gradientBg : 'transparent',
                  color: categoriaSeleccionada === 0 ? 'white' : 'inherit'
                }} 
              />
              {categorias.map((categoria) => (
                <Chip 
                  key={categoria.id_categoria} 
                  label={categoria.nombre} 
                  onClick={() => setCategoriaSeleccionada(categoria.id_categoria)} 
                  color={categoriaSeleccionada === categoria.id_categoria ? "primary" : "default"} 
                  variant={categoriaSeleccionada === categoria.id_categoria ? "filled" : "outlined"} 
                  icon={getCategoriaIcon(categoria.nombre)}
                  sx={{ 
                    fontWeight: 600,
                    background: categoriaSeleccionada === categoria.id_categoria ? gradientBg : 'transparent',
                    color: categoriaSeleccionada === categoria.id_categoria ? 'white' : 'inherit'
                  }} 
                />
              ))}
            </Box>
            
            <IconButton sx={{ color: secondaryColor }}>
              <FilterList />
            </IconButton>
            <IconButton sx={{ color: secondaryColor }}>
              <Sort />
            </IconButton>
          </Box>
        </Paper>

        {/* Contador de platillos */}
        <Box sx={{ 
          mb: 3, 
          textAlign: 'center',
          background: 'white',
          borderRadius: 2,
          p: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
            🍔 {platillosFiltrados.length} platillo{platillosFiltrados.length !== 1 ? 's' : ''} 
            {categoriaSeleccionada !== 0 && ` en ${getCategoriaNombre(categoriaSeleccionada)}`}
          </Typography>
        </Box>

        {/* Lista de platillos o mensaje si no hay */}
        {platillosFiltrados.length === 0 ? (
          <Paper sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'white',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <Restaurant sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay platillos disponibles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categoriaSeleccionada !== 0 
                ? `No hay platillos en la categoría "${getCategoriaNombre(categoriaSeleccionada)}"`
                : 'No hay platillos en el menú actualmente'}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {platillosFiltrados.map((platillo, index) => (
              <Zoom in timeout={200 + index * 100} key={platillo.id_platillo}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TarjetaPlatillo 
                    platillo={platillo} 
                    onAgregar={handleAgregar}
                  />
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}
        

      </Container>
    </Box>
  );
}
