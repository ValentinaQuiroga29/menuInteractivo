// PanelAdministracion.jsx
// Panel de administración para gestionar platillos, usuarios, categorías y ver estadísticas.

import React, { useEffect, useState } from 'react';
import { 
  TextField, Button, List, ListItem, ListItemText, Typography, Box, IconButton, Alert,
  Tabs, Tab, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Delete, Edit, Add, People, Restaurant, Assessment } from '@mui/icons-material';
import axios from 'axios';
import BACKEND_URL from '../config';

export default function PanelAdministracion() {
  // Estados para pestaña activa, datos y formularios
  const [activeTab, setActiveTab] = useState(0);
  const [platillos, setPlatillos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', precio: '', descripcion: '', id_categoria: 1 });
  const [formularioUsuario, setFormularioUsuario] = useState({ nombre: '', correo: '', contraseña: '', rol: 'cliente' });
  const [formularioCategoria, setFormularioCategoria] = useState({ nombre: '' });
  const [editando, setEditando] = useState(null);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [editandoCategoria, setEditandoCategoria] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Carga todos los datos al montar
  const cargarDatos = () => {
    cargarPlatillos();
    cargarUsuarios();
    cargarCategorias();
    cargarPedidos();
  };

  // Carga platillos desde el backend
  const cargarPlatillos = () => {
    axios.get(`${BACKEND_URL}/platillos`)
      .then(res => setPlatillos(res.data))
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar platillos');
      });
  };

  // Carga usuarios desde el backend
  const cargarUsuarios = () => {
    axios.get(`${BACKEND_URL}/usuarios`)
      .then(res => setUsuarios(res.data))
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar usuarios');
      });
  };

  // Carga categorías desde el backend
  const cargarCategorias = () => {
    axios.get(`${BACKEND_URL}/categorias`)
      .then(res => setCategorias(res.data))
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar categorías');
      });
  };

  // Carga pedidos desde el backend
  const cargarPedidos = () => {
    axios.get(`${BACKEND_URL}/pedidos`)
      .then(res => setPedidos(res.data))
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar pedidos');
      });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Funciones para CRUD de platillos
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarPlatillo = () => {
    if (!formulario.nombre || !formulario.precio) {
      setMensaje('Nombre y precio son requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', formulario.nombre);
    formData.append('precio', formulario.precio);
    formData.append('descripcion', formulario.descripcion || '');
    formData.append('id_categoria', formulario.id_categoria);
    if (imagen) formData.append('imagen', imagen);

    const url = editando
      ? `${BACKEND_URL}/platillos/${editando}`
      : `${BACKEND_URL}/platillos`;

    const metodo = editando ? axios.put : axios.post;

    metodo(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      console.log('Respuesta del servidor:', response.data);
      cargarPlatillos();
      setFormulario({ nombre: '', precio: '', descripcion: '', id_categoria: 1 });
      setImagen(null);
      setEditando(null);
      setMensaje(editando ? 'Platillo actualizado exitosamente' : 'Platillo creado exitosamente');
      setOpenDialog(false);
      setDialogType('');
    }).catch(err => {
      console.error('Error completo:', err);
      console.error('Respuesta del servidor:', err.response?.data);
      setMensaje(`Error al guardar platillo: ${err.response?.data?.mensaje || err.message}`);
    });
  };

  const editarPlatillo = (p) => {
    setFormulario({
      nombre: p.nombre,
      precio: p.precio,
      descripcion: p.descripcion || '',
      id_categoria: p.id_categoria || 1
    });
    setEditando(p.id_platillo);
    setMensaje('');
    setDialogType('platillo');
    setOpenDialog(true);
  };

  const eliminarPlatillo = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este platillo?')) {
      axios.delete(`${BACKEND_URL}/platillos/${id}`)
        .then(() => {
          cargarPlatillos();
          setMensaje('Platillo eliminado exitosamente');
        })
        .catch(err => {
          console.error(err);
          setMensaje('Error al eliminar platillo');
        });
    }
  };

  // Funciones para CRUD de usuarios
  const manejarCambioUsuario = (e) => {
    setFormularioUsuario({ ...formularioUsuario, [e.target.name]: e.target.value });
  };

  const guardarUsuario = () => {
    if (!formularioUsuario.nombre || !formularioUsuario.correo) {
      setMensaje('Nombre y correo son requeridos');
      return;
    }

    // Para edición, no requerimos contraseña si está vacía
    if (!editandoUsuario && !formularioUsuario.contraseña) {
      setMensaje('Contraseña es requerida para nuevos usuarios');
      return;
    }

    const datosUsuario = {
      nombre: formularioUsuario.nombre,
      correo: formularioUsuario.correo,
      rol: formularioUsuario.rol
    };

    // Solo incluir contraseña si no está vacía
    if (formularioUsuario.contraseña) {
      datosUsuario.contraseña = formularioUsuario.contraseña;
    }

    const url = editandoUsuario
      ? `${BACKEND_URL}/usuarios/${editandoUsuario}`
      : `${BACKEND_URL}/usuarios`;

    const metodo = editandoUsuario ? axios.put : axios.post;

    metodo(url, datosUsuario)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        cargarUsuarios();
        setFormularioUsuario({ nombre: '', correo: '', contraseña: '', rol: 'cliente' });
        setEditandoUsuario(null);
        setMensaje(editandoUsuario ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente');
        setOpenDialog(false);
        setDialogType('');
      })
      .catch(err => {
        console.error('Error completo:', err);
        console.error('Respuesta del servidor:', err.response?.data);
        setMensaje(`Error al guardar usuario: ${err.response?.data?.mensaje || err.message}`);
      });
  };

  const editarUsuario = (u) => {
    setFormularioUsuario({
      nombre: u.nombre,
      correo: u.correo,
      contraseña: '',
      rol: u.rol
    });
    setEditandoUsuario(u.id_usuario);
    setMensaje('');
    setDialogType('usuario');
    setOpenDialog(true);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      axios.delete(`${BACKEND_URL}/usuarios/${id}`)
        .then(() => {
          cargarUsuarios();
          setMensaje('Usuario eliminado exitosamente');
        })
        .catch(err => {
          console.error(err);
          setMensaje('Error al eliminar usuario');
        });
    }
  };

  // Funciones para CRUD de categorías
  const manejarCambioCategoria = (e) => {
    setFormularioCategoria({ ...formularioCategoria, [e.target.name]: e.target.value });
  };

  const guardarCategoria = () => {
    if (!formularioCategoria.nombre) {
      setMensaje('Nombre es requerido');
      return;
    }

    const url = editandoCategoria
      ? `${BACKEND_URL}/categorias/${editandoCategoria}`
      : `${BACKEND_URL}/categorias`;

    const metodo = editandoCategoria ? axios.put : axios.post;

    metodo(url, formularioCategoria)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        cargarCategorias();
        setFormularioCategoria({ nombre: '' });
        setEditandoCategoria(null);
        setMensaje(editandoCategoria ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente');
        setOpenDialog(false);
        setDialogType('');
      })
      .catch(err => {
        console.error('Error completo:', err);
        console.error('Respuesta del servidor:', err.response?.data);
        setMensaje(`Error al guardar categoría: ${err.response?.data?.mensaje || err.message}`);
      });
  };

  const editarCategoria = (c) => {
    setFormularioCategoria({ nombre: c.nombre });
    setEditandoCategoria(c.id_categoria);
    setMensaje('');
    setDialogType('categoria');
    setOpenDialog(true);
  };

  const eliminarCategoria = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      axios.delete(`${BACKEND_URL}/categorias/${id}`)
        .then(() => {
          cargarCategorias();
          setMensaje('Categoría eliminada exitosamente');
        })
        .catch(err => {
          console.error(err);
          setMensaje('Error al eliminar categoría');
        });
    }
  };

  // Estadísticas generales y por rol
  const estadisticas = {
    totalPlatillos: platillos.length,
    totalUsuarios: usuarios.length,
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    pedidosEnPreparacion: pedidos.filter(p => p.estado === 'en preparación').length,
    pedidosCompletados: pedidos.filter(p => p.estado === 'listo').length,
    usuariosPorRol: {
      administradores: usuarios.filter(u => u.rol === 'administrador').length,
      meseros: usuarios.filter(u => u.rol === 'mesero').length,
      cocineros: usuarios.filter(u => u.rol === 'cocinero').length,
      clientes: usuarios.filter(u => u.rol === 'cliente').length
    }
  };

  // Cancela la edición y limpia formularios
  const cancelarEdicion = () => {
    setFormulario({ nombre: '', precio: '', descripcion: '', id_categoria: 1 });
    setFormularioUsuario({ nombre: '', correo: '', contraseña: '', rol: 'cliente' });
    setFormularioCategoria({ nombre: '' });
    setImagen(null);
    setEditando(null);
    setEditandoUsuario(null);
    setEditandoCategoria(null);
    setMensaje('');
    setDialogType('');
  };

  // Abre/cierra diálogos de formularios
  const abrirDialog = (tipo) => {
    setDialogType(tipo);
    setOpenDialog(true);
  };

  const cerrarDialog = () => {
    setOpenDialog(false);
    cancelarEdicion();
    setDialogType('');
  };

  // Render principal del panel de administración
  return (
    <Box>
      {/* Título principal */}
      <Typography variant="h5" gutterBottom>Panel de Administración</Typography>
      
      {/* Mensaje de estado */}
      {mensaje && (
        <Alert severity="info" sx={{ mb: 2 }} onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      {/* Tabs de navegación */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<Assessment />} label="Estadísticas" />
        <Tab icon={<Restaurant />} label="Platillos" />
        <Tab icon={<People />} label="Usuarios" />
        <Tab label="Categorías" />
      </Tabs>

      {/* Tab de estadísticas */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Resumen General</Typography>
                <Typography>Total Platillos: {estadisticas.totalPlatillos}</Typography>
                <Typography>Total Usuarios: {estadisticas.totalUsuarios}</Typography>
                <Typography>Total Pedidos: {estadisticas.totalPedidos}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Estado de Pedidos</Typography>
                <Typography>Pendientes: {estadisticas.pedidosPendientes}</Typography>
                <Typography>En Preparación: {estadisticas.pedidosEnPreparacion}</Typography>
                <Typography>Completados: {estadisticas.pedidosCompletados}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Usuarios por Rol</Typography>
                <Typography>Administradores: {estadisticas.usuariosPorRol.administradores}</Typography>
                <Typography>Meseros: {estadisticas.usuariosPorRol.meseros}</Typography>
                <Typography>Cocineros: {estadisticas.usuariosPorRol.cocineros}</Typography>
                <Typography>Clientes: {estadisticas.usuariosPorRol.clientes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab de gestión de platillos */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Gestión de Platillos</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => abrirDialog('platillo')}>
              Agregar Platillo
            </Button>
          </Box>
          
          <List>
            {platillos.map((p) => (
              <ListItem 
                key={p.id_platillo} 
                sx={{ border: '1px solid #eee', mb: 1, borderRadius: 1 }}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => editarPlatillo(p)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => eliminarPlatillo(p.id_platillo)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={`${p.nombre} - $${p.precio}`}
                  secondary={p.descripcion || 'Sin descripción'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Tab de gestión de usuarios */}
      {activeTab === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Gestión de Usuarios</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => abrirDialog('usuario')}>
              Agregar Usuario
            </Button>
          </Box>
          
          <List>
            {usuarios.map((u) => (
              <ListItem 
                key={u.id_usuario} 
                sx={{ border: '1px solid #eee', mb: 1, borderRadius: 1 }}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => editarUsuario(u)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => eliminarUsuario(u.id_usuario)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={`${u.nombre} (${u.rol})`}
                  secondary={u.correo}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Tab de gestión de categorías */}
      {activeTab === 3 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Gestión de Categorías</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => abrirDialog('categoria')}>
              Agregar Categoría
            </Button>
          </Box>
          
          <List>
            {categorias.map((c) => (
              <ListItem 
                key={c.id_categoria} 
                sx={{ border: '1px solid #eee', mb: 1, borderRadius: 1 }}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => editarCategoria(c)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => eliminarCategoria(c.id_categoria)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={c.nombre} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Diálogo para formularios de alta/edición */}
      <Dialog open={openDialog} onClose={cerrarDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'platillo' && (editando ? 'Editar Platillo' : 'Agregar Platillo')}
          {dialogType === 'usuario' && (editandoUsuario ? 'Editar Usuario' : 'Agregar Usuario')}
          {dialogType === 'categoria' && (editandoCategoria ? 'Editar Categoría' : 'Agregar Categoría')}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'platillo' && (
            <Box sx={{ pt: 2 }}>
              <TextField 
                fullWidth label="Nombre" name="nombre" value={formulario.nombre} 
                onChange={manejarCambio} margin="normal" required
              />
              <TextField 
                fullWidth label="Precio" name="precio" type="number" value={formulario.precio} 
                onChange={manejarCambio} margin="normal" required
              />
              <TextField 
                fullWidth label="Descripción" name="descripcion" value={formulario.descripcion} 
                onChange={manejarCambio} margin="normal" multiline rows={3}
              />
              <TextField 
                fullWidth label="Categoría" name="id_categoria" type="number" value={formulario.id_categoria} 
                onChange={manejarCambio} margin="normal" required
                helperText="1: Hamburguesas, 2: Bebidas, 3: Postres, etc."
              />
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Imagen (opcional): PNG, JPG, JPEG, GIF, WEBP - Máximo 10MB
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      // Validar tamaño
                      if (file.size > 10 * 1024 * 1024) {
                        setMensaje('La imagen es demasiado grande. Máximo 10MB');
                        e.target.value = '';
                        return;
                      }
                      setImagen(file);
                      setMensaje('');
                    }
                  }}
                  style={{ marginTop: '8px' }}
                />
                {imagen && (
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Archivo seleccionado: {imagen.name}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          
          {dialogType === 'usuario' && (
            <Box sx={{ pt: 2 }}>
              <TextField 
                fullWidth label="Nombre" name="nombre" value={formularioUsuario.nombre} 
                onChange={manejarCambioUsuario} margin="normal" required
              />
              <TextField 
                fullWidth label="Correo" name="correo" type="email" value={formularioUsuario.correo} 
                onChange={manejarCambioUsuario} margin="normal" required
              />
              <TextField 
                fullWidth label="Contraseña" name="contraseña" type="password" value={formularioUsuario.contraseña} 
                onChange={manejarCambioUsuario} margin="normal" required
              />
              <TextField 
                fullWidth label="Rol" name="rol" value={formularioUsuario.rol} 
                onChange={manejarCambioUsuario} margin="normal" 
                select SelectProps={{ native: true }}
              >
                <option value="cliente">Cliente</option>
                <option value="mesero">Mesero</option>
                <option value="cocinero">Cocinero</option>
                <option value="administrador">Administrador</option>
              </TextField>
            </Box>
          )}
          
          {dialogType === 'categoria' && (
            <Box sx={{ pt: 2 }}>
              <TextField 
                fullWidth label="Nombre" name="nombre" value={formularioCategoria.nombre} 
                onChange={manejarCambioCategoria} margin="normal" required
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialog}>Cancelar</Button>
          <Button 
            onClick={() => {
              if (dialogType === 'platillo') guardarPlatillo();
              else if (dialogType === 'usuario') guardarUsuario();
              else if (dialogType === 'categoria') guardarCategoria();
            }} 
            variant="contained"
          >
            {editando || editandoUsuario || editandoCategoria ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
