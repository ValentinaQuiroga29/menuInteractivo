// main.jsx
// Punto de entrada de la aplicación React. Configura los proveedores globales y el renderizado principal.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App.jsx';
// import './index.css'; // si estás usando estilos globales
import { ProveedorCarrito } from './contexto/CarritoContext';
import { theme } from './theme';

// Renderiza la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Proveedor de tema global de Material UI */}
    <ThemeProvider theme={theme}>
      {/* Normaliza los estilos base de Material UI */}
      <CssBaseline />
      {/* Proveedor de rutas para navegación SPA */}
      <BrowserRouter>
        {/* Proveedor de contexto global para el carrito de compras */}
        <ProveedorCarrito>
          {/* Componente principal de la app */}
          <App />
        </ProveedorCarrito>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
); 