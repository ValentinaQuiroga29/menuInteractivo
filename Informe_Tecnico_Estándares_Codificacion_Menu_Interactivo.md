# INFORME TÉCNICO: ESTÁNDARES DE CODIFICACIÓN
## Sistema de Menú Interactivo

---

**Documento:** GA7-220501096-AA1-EV02  
**Proyecto:** Sistema de Menú Interactivo  
**Fecha:** Diciembre 2024  
**Versión:** 1.0  

---

### PORTADA

```
UNIVERSIDAD NACIONAL ABIERTA Y A DISTANCIA - UNAD
ESCUELA DE CIENCIAS BÁSICAS, TECNOLOGÍA E INGENIERÍA
PROGRAMA DE INGENIERÍA DE SISTEMAS

INFORME TÉCNICO: ESTÁNDARES DE CODIFICACIÓN
Sistema de Menú Interactivo

Evidencia de Desempeño: GA7-220501096-AA1-EV02
Aplicación del Paradigma Orientado a Objetos

Autor: [Nombre del Estudiante]
Código: [Código del Estudiante]
Grupo: [Número del Grupo]
Tutor: [Nombre del Tutor]

Diciembre 2024
```

---

## 1. INTRODUCCIÓN

El presente documento establece los estándares de codificación que se aplicarán en el desarrollo del Sistema de Menú Interactivo, un software web que permite la gestión de pedidos en tiempo real para restaurantes. Este sistema implementa el paradigma de programación orientado a objetos (POO) utilizando tecnologías modernas tanto en el backend como en el frontend.

El proyecto está estructurado como una aplicación web full-stack que incluye:
- **Backend:** API REST desarrollada en Python con Flask
- **Frontend:** Interfaz de usuario desarrollada en React con JavaScript/JSX
- **Base de Datos:** MySQL para el almacenamiento persistente de datos

La aplicación sigue el patrón arquitectónico Modelo-Vista-Controlador (MVC) y utiliza principios de POO como encapsulación, herencia, polimorfismo y abstracción para garantizar un código mantenible, escalable y reutilizable.

## 2. OBJETIVO

Definir y establecer los estándares de codificación que regirán el desarrollo del Sistema de Menú Interactivo, asegurando:

- **Consistencia:** Mantener un estilo de código uniforme en todo el proyecto
- **Legibilidad:** Facilitar la comprensión del código por parte de otros desarrolladores
- **Mantenibilidad:** Simplificar las tareas de mantenimiento y actualización
- **Escalabilidad:** Permitir el crecimiento del sistema de manera ordenada
- **Reutilización:** Maximizar la reutilización de código mediante componentes modulares
- **Calidad:** Asegurar que el código cumpla con las mejores prácticas de desarrollo

Estos estándares se basan en las mejores prácticas de la industria y están adaptados específicamente a las tecnologías y requisitos del proyecto.

## 3. ESTÁNDARES DE CODIFICACIÓN

### 3.1 Estándares Generales

#### 3.1.1 Estructura del Proyecto
```
menu_interactivo/
├── backend/                 # Servidor API Flask
│   ├── app.py              # Punto de entrada de la aplicación
│   ├── conexion.py         # Configuración de base de datos
│   ├── controladores/      # Lógica de control (Rutas API)
│   ├── modelos/           # Modelos de datos y acceso a BD
│   └── static/            # Archivos estáticos (imágenes)
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── componentes/   # Componentes reutilizables
│   │   ├── paginas/       # Páginas principales
│   │   ├── contexto/      # Contextos de React
│   │   └── App.jsx        # Componente principal
│   └── package.json       # Dependencias del frontend
└── docs/                  # Documentación del proyecto
```

#### 3.1.2 Convenciones de Nomenclatura

**Principios Generales:**
- Usar nombres descriptivos y significativos
- Evitar abreviaciones confusas
- Mantener consistencia en todo el proyecto
- Seguir las convenciones específicas de cada lenguaje

### 3.2 Estándares para Python (Backend)

#### 3.2.1 Nombramiento de Variables y Funciones

**Variables:**
```python
# ✅ Correcto - snake_case para variables
nombre_usuario = "Juan Pérez"
precio_platillo = 25.50
lista_platillos = []

# ❌ Incorrecto - camelCase o PascalCase
nombreUsuario = "Juan Pérez"
PrecioPlatillo = 25.50
```

**Funciones:**
```python
# ✅ Correcto - snake_case para funciones
def obtener_usuario_por_id(id_usuario):
    pass

def insertar_platillo(nombre, precio, categoria):
    pass

# ❌ Incorrecto
def obtenerUsuarioPorId(idUsuario):
    pass
```

**Constantes:**
```python
# ✅ Correcto - MAYÚSCULAS_CON_GUIONES_BAJOS
MAX_CONTENT_LENGTH = 2 * 1024 * 1024
UPLOAD_FOLDER = 'backend/static/uploads'
DATABASE_URL = 'mysql://localhost/menu_db'
```

#### 3.2.2 Declaración de Clases

**Nomenclatura:**
```python
# ✅ Correcto - PascalCase para clases
class Usuario:
    def __init__(self, nombre, correo, rol):
        self.nombre = nombre
        self.correo = correo
        self.rol = rol

class PlatilloControlador:
    def __init__(self):
        pass

# ❌ Incorrecto
class usuario:
    pass

class platillo_controlador:
    pass
```

**Estructura de Clases:**
```python
class Platillo:
    """
    Clase que representa un platillo en el sistema.
    
    Attributes:
        id_platillo (int): Identificador único del platillo
        nombre (str): Nombre del platillo
        precio (float): Precio del platillo
        categoria (str): Categoría del platillo
    """
    
    def __init__(self, id_platillo, nombre, precio, categoria):
        self.id_platillo = id_platillo
        self.nombre = nombre
        self.precio = precio
        self.categoria = categoria
    
    def calcular_precio_con_iva(self, porcentaje_iva=0.19):
        """Calcula el precio del platillo con IVA incluido."""
        return self.precio * (1 + porcentaje_iva)
    
    def __str__(self):
        return f"Platillo: {self.nombre} - ${self.precio}"
```

#### 3.2.3 Declaración de Métodos

**Métodos Públicos:**
```python
# ✅ Correcto - snake_case para métodos públicos
def obtener_platillos_por_categoria(self, categoria):
    pass

def actualizar_precio_platillo(self, id_platillo, nuevo_precio):
    pass

# ❌ Incorrecto
def obtenerPlatillosPorCategoria(self, categoria):
    pass
```

**Métodos Privados:**
```python
# ✅ Correcto - prefijo underscore para métodos privados
def _validar_datos_platillo(self, datos):
    pass

def _calcular_total_pedido(self, platillos):
    pass
```

**Métodos Mágicos:**
```python
class Pedido:
    def __init__(self, id_pedido, platillos):
        self.id_pedido = id_pedido
        self.platillos = platillos
    
    def __len__(self):
        return len(self.platillos)
    
    def __str__(self):
        return f"Pedido #{self.id_pedido} - {len(self.platillos)} platillos"
    
    def __repr__(self):
        return f"Pedido(id_pedido={self.id_pedido})"
```

#### 3.2.4 Estructura de Archivos Python

**Imports:**
```python
# 1. Imports de la biblioteca estándar
import os
import json
from datetime import datetime

# 2. Imports de terceros
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

# 3. Imports locales
from conexion import obtener_conexion
from modelos.usuario import Usuario
from controladores.platillo_controlador import PlatilloControlador
```

**Configuración de Flask:**
```python
# backend/app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from controladores.usuario_controlador import usuario_rutas
from controladores.platillo_controlador import platillo_rutas

app = Flask(__name__)

# Configuración de CORS
CORS(app, 
     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

# Configuración de la aplicación
app.config['UPLOAD_FOLDER'] = 'backend/static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # 2MB

# Registro de blueprints
app.register_blueprint(usuario_rutas, url_prefix="/usuarios")
app.register_blueprint(platillo_rutas, url_prefix="/platillos")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
```

### 3.3 Estándares para JavaScript/JSX (Frontend)

#### 3.3.1 Nombramiento de Variables y Funciones

**Variables:**
```javascript
// ✅ Correcto - camelCase para variables
const nombreUsuario = "Juan Pérez";
const precioPlatillo = 25.50;
const listaPlatillos = [];

// ❌ Incorrecto - snake_case
const nombre_usuario = "Juan Pérez";
const precio_platillo = 25.50;
```

**Funciones:**
```javascript
// ✅ Correcto - camelCase para funciones
const obtenerUsuarioPorId = (idUsuario) => {
    // lógica de la función
};

const insertarPlatillo = (nombre, precio, categoria) => {
    // lógica de la función
};

// ❌ Incorrecto
const obtener_usuario_por_id = (idUsuario) => {
    // lógica de la función
};
```

**Constantes:**
```javascript
// ✅ Correcto - MAYÚSCULAS_CON_GUIONES_BAJOS
const API_BASE_URL = 'http://localhost:5000';
const MAX_CANTIDAD_PLATILLO = 10;
const ROLES_PERMITIDOS = ['mesero', 'cocinero', 'administrador'];
```

#### 3.3.2 Declaración de Componentes React

**Nomenclatura de Componentes:**
```jsx
// ✅ Correcto - PascalCase para componentes
export default function TarjetaPlatillo({ platillo, onAgregar }) {
    return (
        <div>
            {/* contenido del componente */}
        </div>
    );
}

export default function PanelAdministracion() {
    return (
        <div>
            {/* contenido del componente */}
        </div>
    );
}

// ❌ Incorrecto
export default function tarjetaPlatillo({ platillo, onAgregar }) {
    return (
        <div>
            {/* contenido del componente */}
        </div>
    );
}
```

**Estructura de Componentes:**
```jsx
import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

/**
 * Componente que representa una tarjeta de platillo
 * @param {Object} platillo - Datos del platillo
 * @param {Function} onAgregar - Función para agregar al carrito
 * @returns {JSX.Element} Componente de tarjeta de platillo
 */
export default function TarjetaPlatillo({ platillo, onAgregar }) {
    const [imagenCargada, setImagenCargada] = useState(false);

    const handleAgregarAlCarrito = () => {
        onAgregar(platillo);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000/static/uploads/${imagePath}`;
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={getImageUrl(platillo.imagen)}
                alt={platillo.nombre}
                onLoad={() => setImagenCargada(true)}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {platillo.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {platillo.descripcion}
                </Typography>
                <Typography variant="h6" color="primary">
                    ${platillo.precio}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={handleAgregarAlCarrito}
                >
                    Agregar
                </Button>
            </CardContent>
        </Card>
    );
}
```

#### 3.3.3 Hooks Personalizados

```javascript
// hooks/useCarrito.js
import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gestionar el carrito de compras
 * @returns {Object} Estado y funciones del carrito
 */
export const useCarrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calcular total cuando cambie el carrito
        const nuevoTotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        setTotal(nuevoTotal);
    }, [carrito]);

    const agregarAlCarrito = (platillo) => {
        setCarrito(prevCarrito => {
            const itemExistente = prevCarrito.find(item => item.id === platillo.id);
            if (itemExistente) {
                return prevCarrito.map(item =>
                    item.id === platillo.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prevCarrito, { ...platillo, cantidad: 1 }];
        });
    };

    const removerDelCarrito = (platilloId) => {
        setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== platilloId));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return {
        carrito,
        total,
        agregarAlCarrito,
        removerDelCarrito,
        limpiarCarrito
    };
};
```

#### 3.3.4 Contextos de React

```jsx
// contexto/CarritoContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const CarritoContext = createContext();

const carritoReducer = (state, action) => {
    switch (action.type) {
        case 'AGREGAR_PLATILLO':
            const platilloExistente = state.items.find(item => item.id === action.payload.id);
            if (platilloExistente) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, cantidad: 1 }]
            };
        
        case 'REMOVER_PLATILLO':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        
        case 'LIMPIAR_CARRITO':
            return {
                ...state,
                items: []
            };
        
        default:
            return state;
    }
};

export const CarritoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(carritoReducer, { items: [] });

    const agregarPlatillo = (platillo) => {
        dispatch({ type: 'AGREGAR_PLATILLO', payload: platillo });
    };

    const removerPlatillo = (platilloId) => {
        dispatch({ type: 'REMOVER_PLATILLO', payload: platilloId });
    };

    const limpiarCarrito = () => {
        dispatch({ type: 'LIMPIAR_CARRITO' });
    };

    const total = state.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    return (
        <CarritoContext.Provider value={{
            items: state.items,
            total,
            agregarPlatillo,
            removerPlatillo,
            limpiarCarrito
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
    }
    return context;
};
```

### 3.4 Estándares de Base de Datos

#### 3.4.1 Nomenclatura de Tablas y Columnas

**Tablas:**
```sql
-- ✅ Correcto - snake_case para tablas
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('mesero', 'cocinero', 'administrador') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE platillo (
    id_platillo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria_id INT,
    imagen VARCHAR(255),
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ❌ Incorrecto
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    Nombre VARCHAR(100)
);
```

**Columnas:**
```sql
-- ✅ Correcto - snake_case para columnas
id_usuario
nombre_platillo
precio_unitario
fecha_creacion
esta_activo

-- ❌ Incorrecto
idUsuario
nombrePlatillo
precioUnitario
fechaCreacion
estaActivo
```

#### 3.4.2 Consultas SQL

```python
# ✅ Correcto - Consultas parametrizadas
def obtener_platillo_por_id(id_platillo):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM platillo WHERE id_platillo = %s", 
        (id_platillo,)
    )
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_platillo(nombre, descripcion, precio, categoria_id):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        """INSERT INTO platillo (nombre, descripcion, precio, categoria_id) 
           VALUES (%s, %s, %s, %s)""",
        (nombre, descripcion, precio, categoria_id)
    )
    conexion.commit()
    conexion.close()

# ❌ Incorrecto - Concatenación de strings
def obtener_platillo_por_id(id_platillo):
    query = f"SELECT * FROM platillo WHERE id_platillo = {id_platillo}"
    # Esto es vulnerable a SQL injection
```

### 3.5 Estándares de Documentación

#### 3.5.1 Comentarios en Código

**Python:**
```python
def calcular_total_pedido(platillos, descuento=0):
    """
    Calcula el total de un pedido con opcional descuento.
    
    Args:
        platillos (list): Lista de platillos en el pedido
        descuento (float): Porcentaje de descuento (0-100)
    
    Returns:
        float: Total del pedido con descuento aplicado
    
    Raises:
        ValueError: Si el descuento es menor que 0 o mayor que 100
    """
    if descuento < 0 or descuento > 100:
        raise ValueError("El descuento debe estar entre 0 y 100")
    
    subtotal = sum(platillo['precio'] for platillo in platillos)
    total = subtotal * (1 - descuento / 100)
    return round(total, 2)
```

**JavaScript:**
```javascript
/**
 * Calcula el total de un pedido con descuento opcional
 * @param {Array} platillos - Lista de platillos en el pedido
 * @param {number} descuento - Porcentaje de descuento (0-100)
 * @returns {number} Total del pedido con descuento aplicado
 * @throws {Error} Si el descuento es inválido
 */
const calcularTotalPedido = (platillos, descuento = 0) => {
    if (descuento < 0 || descuento > 100) {
        throw new Error('El descuento debe estar entre 0 y 100');
    }
    
    const subtotal = platillos.reduce((sum, platillo) => sum + platillo.precio, 0);
    const total = subtotal * (1 - descuento / 100);
    return Math.round(total * 100) / 100;
};
```

#### 3.5.2 Documentación de API

```python
# Ejemplo de documentación para endpoints Flask
@app.route('/platillos', methods=['GET'])
def obtener_platillos():
    """
    Obtiene la lista de todos los platillos disponibles.
    
    ---
    tags:
      - Platillos
    responses:
      200:
        description: Lista de platillos obtenida exitosamente
        schema:
          type: array
          items:
            type: object
            properties:
              id_platillo:
                type: integer
                description: ID único del platillo
              nombre:
                type: string
                description: Nombre del platillo
              precio:
                type: number
                description: Precio del platillo
      500:
        description: Error interno del servidor
    """
    try:
        platillos = obtener_todos_los_platillos()
        return jsonify(platillos), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### 3.6 Estándares de Manejo de Errores

#### 3.6.1 Python (Backend)

```python
# Manejo de errores en controladores
from flask import jsonify
import logging

logger = logging.getLogger(__name__)

@app.route('/platillos/<int:id_platillo>', methods=['GET'])
def obtener_platillo(id_platillo):
    try:
        platillo = obtener_platillo_por_id(id_platillo)
        if not platillo:
            return jsonify({'error': 'Platillo no encontrado'}), 404
        
        return jsonify(platillo), 200
    
    except ValueError as e:
        logger.error(f"Error de validación: {e}")
        return jsonify({'error': 'Datos inválidos'}), 400
    
    except Exception as e:
        logger.error(f"Error interno: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500
```

#### 3.6.2 JavaScript (Frontend)

```javascript
// Manejo de errores en componentes React
import { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function ListaPlatillos() {
    const [platillos, setPlatillos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarPlatillos = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/platillos');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setPlatillos(data);
            } catch (error) {
                console.error('Error al cargar platillos:', error);
                setError('Error al cargar los platillos. Intente nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        cargarPlatillos();
    }, []);

    const handleCloseError = () => {
        setError(null);
    };

    if (loading) {
        return <div>Cargando platillos...</div>;
    }

    return (
        <>
            {platillos.map(platillo => (
                <TarjetaPlatillo key={platillo.id_platillo} platillo={platillo} />
            ))}
            
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}
```

### 3.7 Estándares de Testing

#### 3.7.1 Python (Backend)

```python
# tests/test_platillo_modelo.py
import unittest
from unittest.mock import patch, MagicMock
from modelos.platillo import Platillo

class TestPlatilloModelo(unittest.TestCase):
    
    def setUp(self):
        """Configuración inicial para cada test."""
        self.platillo_datos = {
            'id_platillo': 1,
            'nombre': 'Hamburguesa Clásica',
            'precio': 15.99,
            'categoria': 'Hamburguesas'
        }
    
    def test_crear_platillo(self):
        """Test para verificar la creación de un platillo."""
        platillo = Platillo(**self.platillo_datos)
        
        self.assertEqual(platillo.id_platillo, 1)
        self.assertEqual(platillo.nombre, 'Hamburguesa Clásica')
        self.assertEqual(platillo.precio, 15.99)
    
    @patch('modelos.platillo.obtener_conexion')
    def test_obtener_platillo_por_id(self, mock_conexion):
        """Test para verificar la obtención de un platillo por ID."""
        # Configurar mock
        mock_cursor = MagicMock()
        mock_cursor.fetchone.return_value = self.platillo_datos
        mock_conexion.return_value.cursor.return_value = mock_cursor
        
        # Ejecutar función
        resultado = obtener_platillo_por_id(1)
        
        # Verificar resultado
        self.assertEqual(resultado, self.platillo_datos)
        mock_cursor.execute.assert_called_once_with(
            "SELECT * FROM platillo WHERE id_platillo = %s", (1,)
        )

if __name__ == '__main__':
    unittest.main()
```

#### 3.7.2 JavaScript (Frontend)

```javascript
// tests/TarjetaPlatillo.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TarjetaPlatillo from '../src/componentes/TarjetaPlatillo';

describe('TarjetaPlatillo', () => {
    const platilloMock = {
        id_platillo: 1,
        nombre: 'Hamburguesa Clásica',
        precio: 15.99,
        descripcion: 'Deliciosa hamburguesa con carne y vegetales',
        imagen: 'hamburguesa.jpg'
    };

    const onAgregarMock = jest.fn();

    beforeEach(() => {
        onAgregarMock.mockClear();
    });

    test('renderiza correctamente el platillo', () => {
        render(<TarjetaPlatillo platillo={platilloMock} onAgregar={onAgregarMock} />);
        
        expect(screen.getByText('Hamburguesa Clásica')).toBeInTheDocument();
        expect(screen.getByText('$15.99')).toBeInTheDocument();
        expect(screen.getByText('Deliciosa hamburguesa con carne y vegetales')).toBeInTheDocument();
    });

    test('llama a onAgregar cuando se hace clic en el botón', () => {
        render(<TarjetaPlatillo platillo={platilloMock} onAgregar={onAgregarMock} />);
        
        const botonAgregar = screen.getByText('Agregar');
        fireEvent.click(botonAgregar);
        
        expect(onAgregarMock).toHaveBeenCalledWith(platilloMock);
    });

    test('muestra imagen por defecto cuando no hay imagen', () => {
        const platilloSinImagen = { ...platilloMock, imagen: null };
        render(<TarjetaPlatillo platillo={platilloSinImagen} onAgregar={onAgregarMock} />);
        
        // Verificar que se muestra el ícono por defecto
        expect(screen.getByTestId('RestaurantIcon')).toBeInTheDocument();
    });
});
```

## 4. CONCLUSIONES

Los estándares de codificación establecidos en este documento proporcionan una base sólida para el desarrollo del Sistema de Menú Interactivo, asegurando:

1. **Consistencia:** Todos los desarrolladores seguirán las mismas convenciones, facilitando la colaboración y mantenimiento del código.

2. **Calidad:** La aplicación de estos estándares garantiza un código de alta calidad, legible y mantenible.

3. **Escalabilidad:** La estructura modular y las convenciones establecidas permiten el crecimiento ordenado del sistema.

4. **Reutilización:** Los componentes y funciones bien estructurados pueden ser reutilizados en diferentes partes de la aplicación.

5. **Mantenibilidad:** El código documentado y bien estructurado facilita las tareas de mantenimiento y actualización.

Estos estándares están alineados con las mejores prácticas de la industria y el paradigma de programación orientado a objetos, proporcionando una base técnica sólida para el desarrollo exitoso del proyecto.

---

**Documento elaborado por:** [Nombre del Estudiante]  
**Fecha de elaboración:** Diciembre 2024  
**Versión:** 1.0  
**Estado:** Aprobado 