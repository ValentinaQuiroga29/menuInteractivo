// Plantilla.jsx
// Componente que define la estructura base de todas las páginas, incluyendo la barra de navegación y el contenedor principal.

import React from 'react';
import { Container } from '@mui/material';
import BarraNavegacion from './BarraNavegacion';

export default function Plantilla({ children }) {
  return (
    <>
      {/* Barra de navegación superior */}
      <BarraNavegacion />
      {/* Contenedor principal para el contenido de la página */}
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
} 