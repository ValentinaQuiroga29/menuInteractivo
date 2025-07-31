# 🍽️ Sistema de Menú Interactivo

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.1.2-purple.svg)](https://mui.com/)

> Sistema completo de gestión de restaurantes con menú interactivo, gestión de pedidos y paneles especializados por rol.

## 📋 Tabla de Contenidos

- [🎯 Descripción](#-descripción)
- [✨ Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Instalación](#-instalación)
- [📖 Uso](#-uso)
- [👥 Roles del Sistema](#-roles-del-sistema)
- [🛠️ Tecnologías](#️-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧪 Pruebas](#-pruebas)
- [📚 Documentación](#-documentación)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## 🎯 Descripción

El **Sistema de Menú Interactivo** es una aplicación web completa desarrollada para optimizar la gestión de restaurantes mediante la automatización de procesos de pedidos y la mejora de la experiencia del cliente.

### Objetivos

- ✅ **Automatización**: Procesos de pedidos automatizados
- ✅ **Experiencia del Cliente**: Interfaz moderna e intuitiva
- ✅ **Gestión Eficiente**: Herramientas especializadas por rol
- ✅ **Control Total**: Administración completa del sistema

## ✨ Características

### 🍽️ Gestión de Platillos
- CRUD completo de platillos
- Categorización automática
- Gestión de imágenes
- Control de disponibilidad
- Búsqueda y filtrado avanzado

### 🛒 Sistema de Carrito
- Agregar/quitar productos
- Control de cantidades
- Persistencia durante la sesión
- Cálculo automático de totales
- Vaciar carrito

### 📋 Gestión de Pedidos
- Creación de pedidos
- Flujo de estados completo
- Gestión de detalles
- Cálculo automático de totales
- Historial de pedidos

### 👥 Sistema de Roles
- **Cliente**: Ver menú y hacer pedidos
- **Mesero**: Gestionar pedidos y pagos
- **Cocinero**: Preparar pedidos
- **Administrador**: Gestión completa del sistema

### 📊 Paneles Especializados
- Panel de Administración
- Panel de Mesero
- Panel de Cocina
- Dashboard con estadísticas

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Cliente   │ │   Mesero    │ │ Administrador│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Flask)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Usuarios  │ │   Pedidos   │ │  Platillos  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Categorías  │ │Notificaciones│ │Detalles Pedido│         │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS (MySQL)                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   usuarios  │ │   pedidos   │ │  platillos  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ categorias  │ │notificaciones│ │detalles_pedido│         │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Instalación

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **Python** (versión 3.8 o superior)
- **MySQL** (versión 8.0 o superior)
- **Git** (para control de versiones)

### Pasos de Instalación

#### 1. Clonar el Repositorio
```bash
git clone https://github.com/ValentinaQuiroga29/menuInteractivo.git
cd menuInteractivo
```

#### 2. Configurar Base de Datos
```sql
-- Crear base de datos
CREATE DATABASE menu_interactivo;

-- Importar esquema (si existe archivo SQL)
mysql -u root -p menu_interactivo < schema.sql
```

#### 3. Configurar Backend
```bash
cd backend
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

#### 4. Configurar Frontend
```bash
cd frontend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend
```

#### 5. Ejecutar la Aplicación
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Verificación de Instalación

```bash
# Verificar backend
curl http://localhost:5000/test-cors

# Verificar frontend
# Abrir http://localhost:5173 en el navegador

# Verificar base de datos
python check_database.py
```

## 📖 Uso

### Para Clientes

1. **Acceder al Menú**: Navegar a la sección "Menú"
2. **Seleccionar Platillos**: Hacer clic en "Agregar al Carrito"
3. **Revisar Carrito**: Verificar productos seleccionados
4. **Confirmar Pedido**: Enviar pedido al sistema

### Para Meseros

1. **Acceder al Panel**: Iniciar sesión con credenciales de mesero
2. **Gestionar Pedidos**: Ver pedidos pendientes
3. **Registrar Pagos**: Marcar pedidos como pagados
4. **Enviar a Cocina**: Cambiar estado a "en preparación"

### Para Cocineros

1. **Acceder al Panel**: Iniciar sesión con credenciales de cocinero
2. **Ver Pedidos**: Revisar pedidos en preparación
3. **Preparar Platillos**: Marcar como listos

### Para Administradores

1. **Acceder al Panel**: Iniciar sesión con credenciales de administrador
2. **Gestionar Sistema**: Administrar platillos, usuarios, categorías
3. **Ver Estadísticas**: Revisar métricas del sistema

## 👥 Roles del Sistema

### 🍽️ Cliente
- Ver menú completo
- Agregar productos al carrito
- Realizar pedidos
- Seguir estado del pedido

### 👨‍💼 Mesero
- Gestionar pedidos pendientes
- Registrar pagos
- Enviar pedidos a cocina
- Entregar pedidos listos

### 👨‍🍳 Cocinero
- Ver pedidos en preparación
- Preparar platillos
- Marcar como listos
- Comunicarse con meseros

### 👨‍💻 Administrador
- Gestión completa de platillos
- Administrar usuarios y roles
- Gestionar categorías
- Ver estadísticas del sistema

## 🛠️ Tecnologías

### Frontend
- **React 19.1.0**: Biblioteca de JavaScript
- **Material-UI 7.1.2**: Componentes de UI
- **React Router DOM 7.6.2**: Enrutamiento
- **Axios 1.10.0**: Cliente HTTP
- **Framer Motion 12.18.2**: Animaciones
- **Vite 6.3.5**: Build tool

### Backend
- **Flask 2.3.3**: Framework web
- **Flask-CORS 4.0.0**: Soporte CORS
- **MySQL Connector 8.1.0**: Driver de base de datos
- **Werkzeug 2.3.7**: WSGI utility library

### Base de Datos
- **MySQL 8.0**: Sistema de gestión de base de datos
- **Esquema**: menu_interactivo
- **Entidades**: usuarios, platillos, categorias, pedidos, detalles_pedido, notificaciones

## 📁 Estructura del Proyecto

```
menu_interactivo/
├── 📦 frontend/
│   ├── 📦 src/
│   │   ├── App.jsx (65 líneas)
│   │   ├── 🎭 theme.js (206 líneas)
│   │   ├── 🛒 contexto/CarritoContext.jsx (81 líneas)
│   │   ├── 🧩 componentes/
│   │   │   ├── TarjetaPlatillo.jsx (104 líneas)
│   │   │   ├── Plantilla.jsx
│   │   │   ├── BarraNavegacion.jsx
│   │   │   ├── DetallePlatillo.jsx
│   │   │   └── RutaProtegida.jsx
│   │   └── 📄 paginas/
│   │       ├── Bienvenida.jsx (256 líneas)
│   │       ├── Menu.jsx (236 líneas)
│   │       ├── Carrito.jsx (233 líneas)
│   │       ├── PanelAdministracion.jsx (537 líneas)
│   │       ├── PanelMesero.jsx (286 líneas)
│   │       ├── PanelCocina.jsx (173 líneas)
│   │       ├── InicioSesion.jsx (53 líneas)
│   │       └── Notificaciones.jsx (43 líneas)
│   ├── 📦 public/
│   ├── 📄 package.json (28 líneas)
│   └── 📄 vite.config.js
├── 📦 backend/
│   ├── app.py (48 líneas)
│   ├── conexion.py (11 líneas)
│   ├── 🎮 controladores/
│   │   ├── platillo_controlador.py (97 líneas)
│   │   ├── pedido_controlador.py (123 líneas)
│   │   ├── usuario_controlador.py (45 líneas)
│   │   ├── categoria_controlador.py (73 líneas)
│   │   ├── detalle_pedido_controlador.py (82 líneas)
│   │   ├── notificacion_controlador.py (105 líneas)
│   │   └── plato_controlador.py (61 líneas)
│   ├── 📊 modelos/
│   │   ├── pedido.py (100 líneas)
│   │   ├── categoria.py (74 líneas)
│   │   ├── detalle_pedido.py (114 líneas)
│   │   ├── notificacion.py (127 líneas)
│   │   ├── usuario.py (44 líneas)
│   │   ├── platillo.py (67 líneas)
│   │   └── plato.py (60 líneas)
│   └──️ static/uploads/
├── 📋 30+ archivos de prueba
├── 📄 documentación técnica
└── 📄 README.md
```

## 🧪 Pruebas

### Archivos de Prueba Incluidos
- `probar_crud_platillos.py` - Operaciones CRUD
- `probar_flujo_pedidos.py` - Flujo completo
- `probar_login.py` - Autenticación
- `verificar_backend.py` - Conectividad
- `check_database.py` - Estado de BD

### Ejecutar Pruebas
```bash
# Pruebas del backend
python probar_crud_platillos.py
python probar_flujo_pedidos.py
python verificar_backend.py

# Pruebas del frontend
cd frontend
npm test
```

## 📚 Documentación

### Documentación Completa
- 📄 [Documentación Técnica Completa](DOCUMENTACION_COMPLETA_PROYECTO.md)
- 📋 [Informe Técnico - Estándares](Informe_Tecnico_Estándares_Codificacion_Menu_Interactivo.md)
- 📋 [Informe Técnico - Plan de Trabajo](Informe_Tecnico_Plan_Trabajo_Menu_Interactivo.md)

### Diagramas
- 🏗️ [Diagrama de Clases](diagrama_clases_plantuml.puml)
- 🧩 [Diagrama de Componentes](diagrama_componentes_plantuml.puml)
- 📊 [Diagrama de Secuencia](diagrama_secuencia_pedido_plantuml.puml)

## 🤝 Contribuir

### Cómo Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código

- Usar **ESLint** para JavaScript/React
- Seguir **PEP 8** para Python
- Documentar funciones y clases
- Escribir pruebas para nuevas funcionalidades

### Reportar Bugs

- Usar el sistema de **Issues** de GitHub
- Incluir pasos para reproducir el bug
- Adjuntar capturas de pantalla si es necesario
- Especificar versión del sistema y navegador

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

- **Autor**: Valentina Quiroga
- **Email**: [tu-email@ejemplo.com]
- **GitHub**: [@ValentinaQuiroga29](https://github.com/ValentinaQuiroga29)
- **Proyecto**: [https://github.com/ValentinaQuiroga29/menuInteractivo](https://github.com/ValentinaQuiroga29/menuInteractivo)

---

**⭐ Si este proyecto te ayuda, considera darle una estrella en GitHub!** 