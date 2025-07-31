import axios from 'axios';
import { 
  Platillo, 
  Categoria, 
  Pedido, 
  DetallePedido, 
  Usuario, 
  Notificacion,
  ApiResponse 
} from '../tipos';

// Configuración base de axios
const API_BASE_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Platillos
export const platillosService = {
  obtenerTodos: async (): Promise<Platillo[]> => {
    const response = await api.get('/platillos/');
    return response.data;
  },

  obtenerDisponibles: async (): Promise<Platillo[]> => {
    const response = await api.get('/platillos/disponibles');
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Platillo> => {
    const response = await api.get(`/platillos/${id}`);
    return response.data;
  },

  crear: async (platillo: Omit<Platillo, 'id_platillo'>): Promise<Platillo> => {
    const response = await api.post('/platillos/', platillo);
    return response.data;
  },

  actualizar: async (id: number, platillo: Partial<Platillo>): Promise<Platillo> => {
    const response = await api.put(`/platillos/${id}`, platillo);
    return response.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/platillos/${id}`);
  },

  cambiarEstado: async (id: number, estado: string): Promise<void> => {
    await api.patch(`/platillos/${id}/estado`, { estado });
  }
};

// Servicios para Categorías
export const categoriasService = {
  obtenerTodas: async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias/');
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  obtenerPlatillos: async (id: number): Promise<Platillo[]> => {
    const response = await api.get(`/categorias/${id}/platillos`);
    return response.data;
  },

  crear: async (categoria: Omit<Categoria, 'id_categoria'>): Promise<Categoria> => {
    const response = await api.post('/categorias/', categoria);
    return response.data;
  },

  actualizar: async (id: number, categoria: Partial<Categoria>): Promise<Categoria> => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
  }
};

// Servicios para Pedidos
export const pedidosService = {
  obtenerTodos: async (): Promise<Pedido[]> => {
    const response = await api.get('/pedidos/');
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Pedido> => {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },

  crear: async (pedido: Omit<Pedido, 'id_pedido' | 'fecha_hora'>): Promise<Pedido> => {
    const response = await api.post('/pedidos/', pedido);
    return response.data;
  },

  actualizar: async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
    const response = await api.put(`/pedidos/${id}`, pedido);
    return response.data;
  },

  cambiarEstado: async (id: number, estado: string): Promise<void> => {
    await api.patch(`/pedidos/${id}/estado`, { estado });
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/pedidos/${id}`);
  }
};

// Servicios para Detalles de Pedido
export const detallesPedidoService = {
  obtenerTodos: async (): Promise<DetallePedido[]> => {
    const response = await api.get('/detalles-pedido/');
    return response.data;
  },

  obtenerPorPedido: async (idPedido: number): Promise<DetallePedido[]> => {
    const response = await api.get(`/detalles-pedido/pedido/${idPedido}`);
    return response.data;
  },

  obtenerTotal: async (idPedido: number): Promise<number> => {
    const response = await api.get(`/detalles-pedido/pedido/${idPedido}/total`);
    return response.data.total;
  },

  crear: async (detalle: Omit<DetallePedido, 'id_detalle'>): Promise<DetallePedido> => {
    const response = await api.post('/detalles-pedido/', detalle);
    return response.data;
  },

  actualizar: async (id: number, detalle: Partial<DetallePedido>): Promise<DetallePedido> => {
    const response = await api.put(`/detalles-pedido/${id}`, detalle);
    return response.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/detalles-pedido/${id}`);
  }
};

// Servicios para Notificaciones
export const notificacionesService = {
  obtenerTodas: async (): Promise<Notificacion[]> => {
    const response = await api.get('/notificaciones/');
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Notificacion> => {
    const response = await api.get(`/notificaciones/${id}`);
    return response.data;
  },

  crear: async (notificacion: Omit<Notificacion, 'id_notificacion' | 'fecha_hora'>): Promise<Notificacion> => {
    const response = await api.post('/notificaciones/', notificacion);
    return response.data;
  },

  marcarComoLeida: async (id: number): Promise<void> => {
    await api.patch(`/notificaciones/${id}/leer`);
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/notificaciones/${id}`);
  }
};

// Servicios para Usuarios
export const usuariosService = {
  obtenerTodos: async (): Promise<Usuario[]> => {
    const response = await api.get('/usuarios/');
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Usuario> => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  crear: async (usuario: Omit<Usuario, 'id_usuario'>): Promise<Usuario> => {
    const response = await api.post('/usuarios/', usuario);
    return response.data;
  },

  actualizar: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  }
};

export default api; 