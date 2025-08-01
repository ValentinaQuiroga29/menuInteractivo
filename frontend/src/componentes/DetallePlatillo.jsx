import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  Modal, 
  Fade, 
  Card, 
  CardMedia, 
  CardContent,
  Chip
} from '@mui/material';
import { Close, AddShoppingCart } from '@mui/icons-material';
import BACKEND_URL from '../config';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 450 },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
  overflow: 'hidden'
};

export default function DetallePlatillo({ platillo, open, onClose, onAgregar }) {
  if (!platillo) return null;

  const handleAgregar = () => {
    onAgregar(platillo);
    onClose(); // Cierra el modal después de agregar
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return `https://via.placeholder.com/600x400?text=${platillo.nombre}`;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/static/')) return `${BACKEND_URL}${imagePath}`;
    return `${BACKEND_URL}/static/uploads/${imagePath}`;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <CardMedia
              component="img"
              height="250"
              image={getImageUrl(platillo.imagen)}
              alt={platillo.nombre}
            />
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                '&:hover': { background: 'rgba(0,0,0,0.6)' }
              }}
            >
              <Close />
            </IconButton>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                {platillo.nombre}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {platillo.descripcion || 'Sin descripción detallada.'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  ${platillo.precio}
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleAgregar}
                  startIcon={<AddShoppingCart />}
                >
                  Agregar al carrito
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
} 