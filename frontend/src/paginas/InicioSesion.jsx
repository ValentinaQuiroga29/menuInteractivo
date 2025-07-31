// InicioSesion.jsx
// Página de inicio de sesión para usuarios. Permite autenticarse y redirige según el rol.

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InicioSesion() {
  // Estados para los campos del formulario y mensajes de error
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Maneja el proceso de login
  const handleLogin = async () => {
    try {
      // Solicita autenticación al backend
      const res = await axios.post('http://192.168.2.7:5000/usuarios/login', { correo, contrasena });

      const { id_usuario, rol } = res.data;
      // Guarda los datos en localStorage
      localStorage.setItem('usuario_id', id_usuario);
      localStorage.setItem('rol', rol);

      // Redirige según el rol del usuario
      if (rol === 'mesero') navigate('/mesero');
      else if (rol === 'cocinero') navigate('/cocina');
      else if (rol === 'administrador') navigate('/admin');
      else navigate('/menu');

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      {/* Título de la página */}
      <Typography variant="h5" gutterBottom>Inicio de Sesión</Typography>
      {/* Mensaje de error si las credenciales son incorrectas */}
      {error && <Alert severity="error">{error}</Alert>}
      {/* Campo de correo electrónico */}
      <TextField fullWidth label="Correo" margin="normal" value={correo} onChange={e => setCorreo(e.target.value)} />
      {/* Campo de contraseña */}
      <TextField fullWidth label="Contraseña" type="password" margin="normal" value={contrasena} onChange={e => setContrasena(e.target.value)} />
      {/* Botón para enviar el formulario */}
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Ingresar</Button>
    </Box>
  );
}