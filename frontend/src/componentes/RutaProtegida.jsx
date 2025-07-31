// RutaProtegida.jsx
// Componente para proteger rutas según el rol del usuario. Redirige si el usuario no tiene el rol adecuado.

import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RutaProtegida({ children, rolPermitido }) {
  // Obtiene el rol del usuario desde localStorage
  const usuarioRol = localStorage.getItem('rol')

  // Si el rol coincide, muestra el contenido protegido
  if (usuarioRol === rolPermitido) {
    return children
  } else {
    // Si no, redirige a la página de inicio
    return <Navigate to="/" replace />
  }
} 