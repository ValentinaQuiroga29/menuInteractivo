import React from 'react';
import { Container, Typography } from '@mui/material';

const EstadoPedido: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Estado del Pedido
      </Typography>
      <Typography variant="body1">
        Aquí verás el estado de tu pedido
      </Typography>
    </Container>
  );
};

export default EstadoPedido; 