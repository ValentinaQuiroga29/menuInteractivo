// InicioSesion.jsx
// Página de inicio de sesión para usuarios. Permite autenticarse y redirige según el rol.

import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Restaurant,
  Login,
  ArrowBack
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';

// Paleta de colores inspirada en McDonald's
const primaryColor = '#FF6B35'; // Naranja vibrante
const secondaryColor = '#2C3E50'; // Azul oscuro
const accentColor = '#E74C3C'; // Rojo
const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;

export default function InicioSesion() {
  // Estados para los campos del formulario y mensajes de error
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja el proceso de login
  const handleLogin = async () => {
    if (!correo || !contrasena) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Solicita autenticación al backend
      const res = await axios.post(`${BACKEND_URL}/usuarios/login`, { 
        correo, 
        contraseña: contrasena 
      });

      const { usuario } = res.data;
      // Guarda los datos en localStorage
      localStorage.setItem('usuario_id', usuario.id_usuario);
      localStorage.setItem('rol', usuario.rol);

      // Redirige según el rol del usuario
      if (usuario.rol === 'mesero') navigate('/mesero');
      else if (usuario.rol === 'cocinero') navigate('/cocina');
      else if (usuario.rol === 'administrador') navigate('/admin');
      else navigate('/menu');

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
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
            onClick={() => navigate('/')}
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
                Acceso Staff
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        background: gradientBg,
        py: 4,
        px: 2
      }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ 
            color: 'white',
            fontWeight: 800,
            mb: 1,
            textAlign: 'center'
          }}>
            Acceso al Sistema
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center'
          }}>
            Inicia sesión para acceder al panel de administración
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Zoom in timeout={500}>
          <Paper sx={{
            p: 4,
            background: 'white',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            {/* Header del formulario */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{
                background: gradientBg,
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Login sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: secondaryColor
              }}>
                Iniciar Sesión
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Ingresa tus credenciales para acceder
              </Typography>
            </Box>

            {/* Formulario */}
            <Fade in timeout={800}>
              <Box component="form" sx={{ mt: 3 }}>
                {/* Mensaje de error */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {/* Campo de correo */}
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: primaryColor }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: primaryColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                  }}
                />

                {/* Campo de contraseña */}
                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: primaryColor }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: primaryColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                  }}
                />

                {/* Botón de inicio de sesión */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  disabled={loading}
                  startIcon={loading ? null : <Login />}
                  sx={{
                    py: 2,
                    background: gradientBg,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
                    },
                    '&:disabled': {
                      background: '#ccc'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>

                {/* Información adicional */}
                <Box sx={{ mt: 4, p: 3, background: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                    💡 <strong>Credenciales de prueba:</strong>
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    alignItems: 'center'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Correo:</strong> admin@restaurante.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Contraseña:</strong> admin123
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
}