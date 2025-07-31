// App.jsx
// Componente principal de la aplicación. Define las rutas y la estructura general del frontend.

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Plantilla from './componentes/Plantilla';
import RutaProtegida from './componentes/RutaProtegida';

// Páginas principales de la aplicación
import Bienvenida from './paginas/Bienvenida';
import Menu from './paginas/Menu';
import Carrito from './paginas/Carrito';
import Notificaciones from './paginas/Notificaciones';
import InicioSesion from './paginas/InicioSesion';
import PanelMesero from './paginas/PanelMesero';
import PanelCocina from './paginas/PanelCocina';
import PanelAdministracion from './paginas/PanelAdministracion';

export default function App() {
  return (
    // Plantilla general que incluye la barra de navegación y el contenedor principal
    <Plantilla>
      {/* Definición de rutas usando React Router */}
      <Routes>
        {/* Ruta de bienvenida (página de inicio) */}
        <Route path="/" element={<Bienvenida />} />
        {/* Ruta para ver el menú de platillos */}
        <Route path="/menu" element={<Menu />} />
        {/* Ruta para ver el carrito de compras */}
        <Route path="/carrito" element={<Carrito />} />
        {/* Ruta para ver notificaciones del usuario */}
        <Route path="/notificaciones" element={<Notificaciones />} />
        {/* Ruta para iniciar sesión */}
        <Route path="/login" element={<InicioSesion />} />
        {/* Ruta protegida para el panel de mesero, solo accesible si el rol es 'mesero' */}
        <Route
          path="/mesero"
          element={
            <RutaProtegida rolPermitido="mesero">
              <PanelMesero />
            </RutaProtegida>
          }
        />
        {/* Ruta protegida para el panel de cocina, solo accesible si el rol es 'cocinero' */}
        <Route
          path="/cocina"
          element={
            <RutaProtegida rolPermitido="cocinero">
              <PanelCocina />
            </RutaProtegida>
          }
        />
        {/* Ruta protegida para el panel de administración, solo accesible si el rol es 'administrador' */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolPermitido="administrador">
              <PanelAdministracion />
            </RutaProtegida>
          }
        />
      </Routes>
    </Plantilla>
  );
} 