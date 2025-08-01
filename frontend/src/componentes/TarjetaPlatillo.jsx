// TarjetaPlatillo.jsx
// Componente para mostrar la información de un platillo en formato de tarjeta, con opción de agregar al carrito.

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Tooltip } from '@mui/material';
import { Restaurant, AddShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BACKEND_URL from '../config';

export default function TarjetaPlatillo({ platillo, onAgregar }) {
  // Obtiene la URL de la imagen del platillo, manejando rutas relativas y absolutas
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/static/')) return `${BACKEND_URL}${imagePath}`;
    return `${BACKEND_URL}/static/uploads/${imagePath}`;
  };

  const imageUrl = getImageUrl(platillo.imagen);

  return (
    // Animación de aparición con framer-motion
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }
        }}
      >
        {/* Imagen del platillo o ícono por defecto */}
        {imageUrl ? (
          <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={platillo.nombre}
              sx={{ 
                objectFit: 'cover', 
                width: '100%',
                height: '100%',
                transition: 'transform 0.4s ease', 
                '&:hover': { transform: 'scale(1.05)' },
                // Asegurar que la imagen sea visible
                display: 'block',
                visibility: 'visible',
                opacity: 1,
                zIndex: 1
              }}
              onError={(e) => {
              e.target.style.display = 'none';
            }}
            />

          </Box>
        ) : (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              color: 'grey.500'
            }}
          >
            <Restaurant sx={{ fontSize: 60 }} />
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Nombre del platillo */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {platillo.nombre}
          </Typography>
          {/* Descripción del platillo */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, flexGrow: 1, lineHeight: 1.5 }}
          >
            {platillo.descripcion || 'Sin descripción disponible'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Precio del platillo */}
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              ${platillo.precio}
            </Typography>
            {/* Botón para agregar al carrito */}
            <Tooltip title="Agregar al carrito">
              <Button
                variant="contained"
                onClick={() => onAgregar(platillo)}
                startIcon={<AddShoppingCart />}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              >
                Agregar
              </Button>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
