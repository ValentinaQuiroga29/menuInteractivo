// Tipos para Platillos
export interface Platillo {
  id_platillo: number;
  nombre: string;
  descripción: string;
  precio: number;
  imagen?: string;
  estado: 'disponible' | 'no disponible';
  id_categoria: number;
}

// Tipos para Categorías
export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
}

// Tipos para Pedidos
export interface Pedido {
  id_pedido: number;
  id_usuario: number;
  fecha_hora: string;
  estado: 'pendiente' | 'en preparación' | 'listo' | 'entregado' | 'cancelado';
  total?: number;
}

// Tipos para Detalles de Pedido
export interface DetallePedido {
  id_detalle: number;
  id_pedido: number;
  id_platillo: number;
  cantidad: number;
  nombre_platillo?: string;
  precio?: number;
  descripción?: string;
}

// Tipos para Usuarios
export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'cliente' | 'admin';
}

// Tipos para Notificaciones
export interface Notificacion {
  id_notificacion: number;
  id_usuario: number;
  titulo: string;
  mensaje: string;
  fecha_hora: string;
  leida: boolean;
  tipo: 'pedido' | 'sistema' | 'promocion';
}

// Tipos para el Carrito
export interface ItemCarrito {
  platillo: Platillo;
  cantidad: number;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Tipos para formularios
export interface FormularioPedido {
  platillos: Array<{
    id_platillo: number;
    cantidad: number;
  }>;
  observaciones?: string;
} 