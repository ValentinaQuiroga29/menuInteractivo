# 🍽️ Menú Interactivo - Demo Frontend

Una versión completa del menú interactivo en HTML, CSS y JavaScript puro que funciona en cualquier navegador.

## 📁 Archivos Incluidos

- `index.html` - Página principal
- `styles.css` - Estilos modernos y responsivos
- `script.js` - Funcionalidad JavaScript
- `README.md` - Este archivo

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. **Abre el archivo `index.html`** en cualquier navegador web
2. **¡Listo!** La aplicación funcionará completamente

### Opción 2: Servidor Local (Recomendado)
1. **Abre una terminal** en la carpeta `demo-frontend`
2. **Ejecuta un servidor local:**
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Python 2
   python -m SimpleHTTPServer 8000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server
   ```
3. **Abre** `http://localhost:8000` en tu navegador

## ✨ Características

### 🎨 Diseño Moderno
- **Responsive** - Funciona en móviles, tablets y desktop
- **Animaciones suaves** - Transiciones elegantes
- **Colores atractivos** - Paleta de colores gourmet
- **Tipografía moderna** - Fuente Poppins

### 🍕 Funcionalidades
- **Menú interactivo** - Con filtros por categorías
- **Carrito de compras** - Agregar/quitar productos
- **Cálculo automático** - Subtotal, IVA y total
- **Login funcional** - Con credenciales de demo
- **Navegación suave** - Scroll automático entre secciones

### 📱 Responsive Design
- **Mobile-first** - Optimizado para móviles
- **Menú hamburguesa** - Navegación móvil
- **Grid adaptativo** - Se ajusta a cualquier pantalla

## 🔑 Credenciales de Demo

### Usuarios de Prueba:
- **Administrador:** `admin@restaurante.com` / `admin123`
- **Mesero:** `mesero@restaurante.com` / `mesero123`
- **Cocinero:** `cocinero@restaurante.com` / `cocinero123`

## 🍽️ Platillos de Ejemplo

### Categorías Disponibles:
1. **Hamburguesas** - Hamburguesa Gourmet
2. **Pizzas** - Pizza Margherita
3. **Ensaladas** - Ensalada César
4. **Pastas** - Pasta Carbonara
5. **Pescados** - Salmón a la Parrilla
6. **Postres** - Tiramisú

## 🎯 Cómo Funciona

### 1. Navegación
- **Barra superior** - Logo y menú principal
- **Secciones** - Inicio, Menú, Carrito
- **Scroll suave** - Navegación automática

### 2. Menú
- **Filtros** - Botones por categoría
- **Tarjetas** - Imagen, nombre, descripción, precio
- **Agregar** - Botón para añadir al carrito

### 3. Carrito
- **Lista de items** - Productos seleccionados
- **Controles** - Aumentar/disminuir cantidad
- **Resumen** - Cálculo automático de totales
- **Confirmar** - Proceso de pedido

### 4. Login
- **Modal** - Ventana emergente
- **Validación** - Credenciales de demo
- **Notificaciones** - Mensajes de éxito/error

## 🛠️ Tecnologías Usadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía Poppins

## 📱 Compatibilidad

### Navegadores Soportados:
- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### Dispositivos:
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Móvil (iPhone, Android)

## 🎨 Personalización

### Cambiar Colores:
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #ff6b35;    /* Color principal */
    --secondary-color: #f7931e;  /* Color secundario */
    --accent-color: #ffd23f;     /* Color de acento */
}
```

### Agregar Platillos:
Edita el array `platillos` en `script.js`:
```javascript
const platillos = [
    {
        id_platillo: 7,
        nombre: "Nuevo Platillo",
        descripcion: "Descripción del platillo",
        precio: 19.99,
        imagen: "URL_de_la_imagen",
        id_categoria: 1
    }
];
```

## 🚀 Despliegue

### GitHub Pages:
1. Sube los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main
4. ¡Tu sitio estará disponible en `https://usuario.github.io/repositorio`!

### Netlify:
1. Arrastra la carpeta `demo-frontend` a Netlify
2. ¡Tu sitio se desplegará automáticamente!

### Vercel:
1. Conecta tu repositorio a Vercel
2. ¡Despliegue automático en cada commit!

## 📞 Soporte

Si tienes problemas o preguntas:
1. Verifica que todos los archivos estén en la misma carpeta
2. Asegúrate de tener conexión a internet (para las fuentes e iconos)
3. Prueba en diferentes navegadores

## 🎉 ¡Disfruta!

Este demo te permite mostrar la funcionalidad completa del menú interactivo sin necesidad de configurar un backend. ¡Perfecto para presentaciones y demostraciones! 