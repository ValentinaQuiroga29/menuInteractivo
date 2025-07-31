// Bienvenida.jsx
// Página de bienvenida del menú interactivo. Muestra información introductoria y acceso al menú digital.

import React, { useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Paper
} from '@mui/material';
import { 
  Link, 
  useNavigate 
} from 'react-router-dom';
import { 
  Restaurant, 
  LocalShipping, 
  Star, 
  TrendingUp 
} from '@mui/icons-material';

// Imagen de fondo elegante (Unsplash, libre uso)
const fondoUrl = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1500&q=80';

export default function Bienvenida() {
  const navigate = useNavigate();

  // Redirección automática según el rol guardado en localStorage
  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol === 'mesero') navigate('/mesero');
    else if (rol === 'cocinero') navigate('/cocina');
    else if (rol === 'administrador') navigate('/admin');
    // Si no hay rol, se queda en bienvenida
  }, [navigate]);

  // Características destacadas del sistema
  const features = [
    {
      icon: <Restaurant sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Menú Digital',
      description: 'Explora nuestra amplia variedad de platillos con fotos y descripciones detalladas'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Pedidos Rápidos',
      description: 'Realiza tu pedido de forma rápida y eficiente desde tu mesa'
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Calidad Premium',
      description: 'Ingredientes frescos y preparación artesanal en cada platillo'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Experiencia Única',
      description: 'Disfruta de una experiencia gastronómica moderna y tecnológica'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Fondo con imagen y overlay */}
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
      {/* Overlay de color cálido */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'linear-gradient(120deg, rgba(255, 183, 94, 0.35) 0%, rgba(255, 255, 255, 0.15) 100%)',
        }}
      />
      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header principal con título y descripción */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#fff',
              fontWeight: 800,
              mb: 2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
            }}
          >
            ¡Bienvenido a Boom! Burger
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.95)',
              mb: 4,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 6px rgba(0,0,0,0.25)'
            }}
          >
            Descubre una nueva forma de disfrutar la gastronomía con nuestro menú digital interactivo
          </Typography>
          {/* Botón para ir al menú digital */}
          <Button 
            component={Link} 
            to="/menu" 
            variant="contained" 
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              background: 'linear-gradient(90deg, #ffb75e 0%, #ed8f03 100%)',
              color: '#fff',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                background: 'linear-gradient(90deg, #ed8f03 0%, #ffb75e 100%)',
              }
            }}
          >
            Ver Menú Digital
          </Button>
        </Box>

        {/* Características del sistema */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                background: 'rgba(255,255,255,0.92)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Sección de acción para acceder al menú */}
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center',
          borderRadius: 4,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'text.primary'
            }}
          >
            ¿Listo para comenzar?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Escanea el código QR en tu mesa o haz clic en el botón para acceder a nuestro menú digital
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              component={Link} 
              to="/menu" 
              variant="contained" 
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #ffb75e 0%, #ed8f03 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ed8f03 0%, #ffb75e 100%)',
                }
              }}
            >
              Ver Menú Completo
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}