import React from 'react';
import { Container, Typography } from '@mui/material';

const Pedido: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Realizar Pedido
      </Typography>
      <Typography variant="body1">
        Aquí podrás confirmar y enviar tu pedido
      </Typography>
    </Container>
  );
};

export default Pedido; 