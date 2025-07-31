// Datos de ejemplo
const platillos = [
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
];

const categorias = [
    { id_categoria: 1, nombre: "Hamburguesas" },
    { id_categoria: 2, nombre: "Pizzas" },
    { id_categoria: 3, nombre: "Ensaladas" },
    { id_categoria: 4, nombre: "Pastas" },
    { id_categoria: 5, nombre: "Pescados" },
    { id_categoria: 6, nombre: "Postres" }
];

// Variables globales
let carrito = [];
let categoriaSeleccionada = 'all';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarMenu();
    configurarEventos();
    actualizarCarrito();
});

// Configurar eventos
function configurarEventos() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filtros de categorías
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            categoriaSeleccionada = this.dataset.category;
            filtrarMenu();
        });
    });

    // Modal de login
    document.querySelector('.login-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginModal').style.display = 'block';
    });

    // Cerrar modales
    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Formulario de login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        realizarLogin(email, password);
    });

    // Menú hamburguesa
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

// Cargar menú
function cargarMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    platillos.forEach(platillo => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${platillo.imagen}" alt="${platillo.nombre}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${platillo.nombre}</h3>
                <p class="menu-item-description">${platillo.descripcion}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${platillo.precio.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="agregarAlCarrito(${platillo.id_platillo})">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Filtrar menú por categoría
function filtrarMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const platillosFiltrados = categoriaSeleccionada === 'all' 
        ? platillos 
        : platillos.filter(p => p.id_categoria == categoriaSeleccionada);

    platillosFiltrados.forEach(platillo => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${platillo.imagen}" alt="${platillo.nombre}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${platillo.nombre}</h3>
                <p class="menu-item-description">${platillo.descripcion}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${platillo.precio.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="agregarAlCarrito(${platillo.id_platillo})">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Agregar al carrito
function agregarAlCarrito(idPlatillo) {
    const platillo = platillos.find(p => p.id_platillo === idPlatillo);
    if (!platillo) return;

    const itemExistente = carrito.find(item => item.id_platillo === idPlatillo);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...platillo,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${platillo.nombre} agregado al carrito`);
}

// Actualizar carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;

    // Actualizar lista de items
    cartItems.innerHTML = '';
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.nombre}</h4>
                    <p class="cart-item-price">$${item.precio.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id_platillo}, -1)">-</button>
                    <span class="quantity-display">${item.cantidad}</span>
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id_platillo}, 1)">+</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Actualizar resumen
    actualizarResumen();
}

// Cambiar cantidad
function cambiarCantidad(idPlatillo, cambio) {
    const item = carrito.find(item => item.id_platillo === idPlatillo);
    if (!item) return;

    item.cantidad += cambio;
    
    if (item.cantidad <= 0) {
        carrito = carrito.filter(item => item.id_platillo !== idPlatillo);
    }

    actualizarCarrito();
}

// Actualizar resumen
function actualizarResumen() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('iva').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Realizar pedido
function realizarPedido() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }

    const numeroPedido = Math.floor(Math.random() * 1000) + 1;
    document.getElementById('orderNumber').textContent = `#${numeroPedido}`;
    document.getElementById('confirmModal').style.display = 'block';

    // Limpiar carrito
    carrito = [];
    actualizarCarrito();
}

// Cerrar modal de confirmación
function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Realizar login
function realizarLogin(email, password) {
    // Simulación de login
    const usuarios = [
        { email: 'admin@restaurante.com', password: 'admin123', rol: 'administrador' },
        { email: 'mesero@restaurante.com', password: 'mesero123', rol: 'mesero' },
        { email: 'cocinero@restaurante.com', password: 'cocinero123', rol: 'cocinero' }
    ];

    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        mostrarNotificacion(`Bienvenido ${usuario.rol}!`, 'success');
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('loginForm').reset();
    } else {
        mostrarNotificacion('Credenciales incorrectas', 'error');
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${mensaje}</span>
    `;

    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : tipo === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notificacion);

    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Scroll suave a sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Agregar estilos CSS para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 1rem;
    }
`;
document.head.appendChild(style); 