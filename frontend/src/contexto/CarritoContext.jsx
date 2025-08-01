// CarritoContext.jsx
// Contexto global para manejar el carrito de compras en toda la aplicación.

import React, { createContext, useState, useContext } from 'react'

// Crear el contexto
const CarritoContext = createContext()

// Proveedor del contexto del carrito
export function ProveedorCarrito({ children }) {
  const [carrito, setCarrito] = useState([])

  // Función para convertir precio a número de forma segura
  const parsePrecio = (precio) => {
    if (typeof precio === 'number') return precio;
    if (typeof precio === 'string') return parseFloat(precio) || 0;
    return 0;
  };

  // Agrega un platillo al carrito. Si ya existe, aumenta la cantidad.
  const agregarAlCarrito = (platillo) => {
    console.log('🛒 Agregando al carrito:', platillo);
    
    // Asegurar que el precio sea un número
    const platilloConPrecioNumerico = {
      ...platillo,
      precio: parsePrecio(platillo.precio)
    };
    
    const itemExistente = carrito.find(p => p.id_platillo === platillo.id_platillo)
    if (itemExistente) {
      console.log('📝 Item existente, aumentando cantidad');
      const actualizado = carrito.map(p =>
        p.id_platillo === platillo.id_platillo
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
      setCarrito(actualizado)
      console.log('✅ Carrito actualizado:', actualizado);
    } else {
      console.log('🆕 Nuevo item, agregando al carrito');
      const nuevoCarrito = [...carrito, { ...platilloConPrecioNumerico, cantidad: 1 }]
      setCarrito(nuevoCarrito)
      console.log('✅ Carrito actualizado:', nuevoCarrito);
    }
  }

  // Quita un platillo del carrito por su id
  const quitarDelCarrito = (id) => {
    console.log('🗑️ Quitando del carrito:', id);
    const nuevoCarrito = carrito.filter(p => p.id_platillo !== id)
    setCarrito(nuevoCarrito)
    console.log('✅ Carrito actualizado:', nuevoCarrito);
  }

  // Actualiza la cantidad de un platillo en el carrito
  const actualizarCantidad = (id, nuevaCantidad) => {
    console.log('📝 Actualizando cantidad:', id, 'a', nuevaCantidad);
    
    if (nuevaCantidad <= 0) {
      // Si la cantidad es 0 o menor, eliminar el item
      quitarDelCarrito(id);
      return;
    }
    
    const actualizado = carrito.map(p =>
      p.id_platillo === id
        ? { ...p, cantidad: nuevaCantidad }
        : p
    )
    setCarrito(actualizado)
    console.log('✅ Cantidad actualizada:', actualizado);
  }

  // Vacía todo el carrito
  const vaciarCarrito = () => {
    console.log('🧹 Vaciando carrito');
    setCarrito([])
    console.log('✅ Carrito vaciado');
  }

  // Log para debug
  console.log('🔄 CarritoContext renderizado, items:', carrito.length);

  return (
    <CarritoContext.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      quitarDelCarrito, 
      actualizarCantidad,
      vaciarCarrito 
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

// Hook personalizado para usar el contexto del carrito
export function usarCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    console.error('❌ usarCarrito debe ser usado dentro de ProveedorCarrito');
    throw new Error('usarCarrito debe ser usado dentro de ProveedorCarrito')
  }
  return context
} 