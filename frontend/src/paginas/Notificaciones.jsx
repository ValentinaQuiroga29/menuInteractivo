// Notificaciones.jsx
// Página para mostrar las notificaciones del usuario autenticado.

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Alert } from '@mui/material';
import axios from 'axios';

export default function Notificaciones() {
  // Estado para las notificaciones y mensajes de error/info
  const [notis, setNotis] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Carga las notificaciones del usuario al montar el componente
  useEffect(() => {
    const id_usuario = localStorage.getItem("usuario_id");
    if (!id_usuario) {
      setMensaje("Debes iniciar sesión para ver tus notificaciones.");
      return;
    }

    axios.get(`http://192.168.2.7:5000/notificaciones/usuario/${id_usuario}`)
      .then(res => setNotis(res.data))
      .catch(() => setMensaje("Error al cargar notificaciones."));
  }, []);

  return (
    <>
      {/* Título de la página */}
      <Typography variant="h5" gutterBottom>Notificaciones</Typography>
      {/* Mensaje de error o info */}
      {mensaje && <Alert severity="info" sx={{ mb: 2 }}>{mensaje}</Alert>}

      {/* Lista de notificaciones */}
      <List>
        {notis.map(n => (
          <ListItem key={n.id_notificacion}>
            <ListItemText primary={n.mensaje} secondary={new Date(n.fecha_hora).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </>
  );
}