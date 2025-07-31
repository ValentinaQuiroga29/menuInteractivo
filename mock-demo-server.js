const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://192.168.2.7:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Mock de platillos
app.get('/platillos', (req, res) => {
  res.json([
    {
      id_platillo: 1,
      nombre: "Hamburguesa Gourmet",
      descripcion: "Deliciosa hamburguesa con carne premium, lechuga fresca, tomate y queso cheddar fundido. Served with papas fritas crujientes.",
      precio: 15.99,
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
      id_categoria: 1
    },
    {
      id_platillo: 2,
      nombre: "Pizza Margherita",
      descripcion: "Pizza tradicional italiana con salsa de tomate, mozzarella fresca y albahaca. Masa artesanal horneada en horno de piedra.",
      precio: 18.50,
      imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
      id_categoria: 2
    },
    {
      id_platillo: 3,
      nombre: "Ensalada César",
      descripcion: "Ensalada fresca con lechuga romana, crutones, parmesano y aderezo César casero. Perfecta como entrada o plato principal.",
      precio: 12.99,
      imagen: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
      id_categoria: 3
    },
    {
      id_platillo: 4,
      nombre: "Pasta Carbonara",
      descripcion: "Pasta italiana con salsa cremosa de huevo, queso parmesano, panceta crujiente y pimienta negra recién molida.",
      precio: 16.99,
      imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80",
      id_categoria: 4
    },
    {
      id_platillo: 5,
      nombre: "Salmón a la Parrilla",
      descripcion: "Filete de salmón fresco a la parrilla con hierbas aromáticas, acompañado de vegetales de temporada y arroz salvaje.",
      precio: 24.99,
      imagen: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
      id_categoria: 5
    },
    {
      id_platillo: 6,
      nombre: "Tiramisú",
      descripcion: "Postre italiano clásico con capas de bizcocho empapado en café, crema de mascarpone y cacao en polvo.",
      precio: 8.99,
      imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80",
      id_categoria: 6
    }
  ]);
});

// Mock de categorías
app.get('/categorias', (req, res) => {
  res.json([
    { id_categoria: 1, nombre: "Hamburguesas" },
    { id_categoria: 2, nombre: "Pizzas" },
    { id_categoria: 3, nombre: "Ensaladas" },
    { id_categoria: 4, nombre: "Pastas" },
    { id_categoria: 5, nombre: "Pescados" },
    { id_categoria: 6, nombre: "Postres" }
  ]);
});

// Mock de usuarios para login
app.post('/usuarios/login', (req, res) => {
  const { correo, contrasena } = req.body;
  
  if (correo === 'admin@restaurante.com' && contrasena === 'admin123') {
    res.json({ id_usuario: 1, rol: 'administrador' });
  } else if (correo === 'mesero@restaurante.com' && contrasena === 'mesero123') {
    res.json({ id_usuario: 2, rol: 'mesero' });
  } else if (correo === 'cocinero@restaurante.com' && contrasena === 'cocinero123') {
    res.json({ id_usuario: 3, rol: 'cocinero' });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Mock de pedidos
app.get('/pedidos', (req, res) => {
  res.json([
    {
      id_pedido: 1,
      fecha: "2024-06-24",
      estado: "pendiente",
      total: 45.50,
      mesa: 5
    },
    {
      id_pedido: 2,
      fecha: "2024-06-24", 
      estado: "en_preparacion",
      total: 32.99,
      mesa: 3
    }
  ]);
});

// Mock de notificaciones
app.get('/notificaciones/usuario/:id', (req, res) => {
  res.json([
    {
      id_notificacion: 1,
      mensaje: "Nuevo pedido recibido - Mesa 5",
      fecha: "2024-06-24 18:30:00",
      leida: false
    }
  ]);
});

// Mock para crear pedidos
app.post('/pedidos/nuevo_pedido', (req, res) => {
  res.json({ 
    mensaje: "Pedido creado exitosamente",
    id_pedido: Math.floor(Math.random() * 1000) + 1
  });
});

// Mock para actualizar estado de pedidos
app.patch('/pedidos/:id/estado', (req, res) => {
  res.json({ mensaje: "Estado actualizado correctamente" });
});

// Mock para transacciones
app.post('/pedidos/transacciones', (req, res) => {
  res.json({ mensaje: "Pago registrado correctamente" });
});

// Mock para CRUD de platillos
app.post('/platillos', (req, res) => {
  res.json({ mensaje: "Platillo creado correctamente" });
});

app.put('/platillos/:id', (req, res) => {
  res.json({ mensaje: "Platillo actualizado correctamente" });
});

app.delete('/platillos/:id', (req, res) => {
  res.json({ mensaje: "Platillo eliminado correctamente" });
});

// Mock para CRUD de usuarios
app.get('/usuarios', (req, res) => {
  res.json([
    { id_usuario: 1, nombre: "Administrador", correo: "admin@restaurante.com", rol: "administrador" },
    { id_usuario: 2, nombre: "Mesero", correo: "mesero@restaurante.com", rol: "mesero" },
    { id_usuario: 3, nombre: "Cocinero", correo: "cocinero@restaurante.com", rol: "cocinero" }
  ]);
});

app.post('/usuarios', (req, res) => {
  res.json({ mensaje: "Usuario creado correctamente" });
});

app.put('/usuarios/:id', (req, res) => {
  res.json({ mensaje: "Usuario actualizado correctamente" });
});

app.delete('/usuarios/:id', (req, res) => {
  res.json({ mensaje: "Usuario eliminado correctamente" });
});

// Mock para CRUD de categorías
app.post('/categorias', (req, res) => {
  res.json({ mensaje: "Categoría creada correctamente" });
});

app.put('/categorias/:id', (req, res) => {
  res.json({ mensaje: "Categoría actualizada correctamente" });
});

app.delete('/categorias/:id', (req, res) => {
  res.json({ mensaje: "Categoría eliminada correctamente" });
});

// Ruta de prueba
app.get('/test-cors', (req, res) => {
  res.json({ message: "Mock server funcionando correctamente" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🎭 Mock server corriendo en http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🌐 Red local: http://192.168.2.7:5173`);
  console.log(`\n🔑 Credenciales de prueba:`);
  console.log(`   Admin: admin@restaurante.com / admin123`);
  console.log(`   Mesero: mesero@restaurante.com / mesero123`);
  console.log(`   Cocinero: cocinero@restaurante.com / cocinero123`);
}); 