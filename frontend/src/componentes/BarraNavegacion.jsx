import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Button, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip
} from '@mui/material';
import { 
  ShoppingCart, 
  Notifications, 
  Logout, 
  AccountCircle,
  Restaurant,
  Person
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { usarCarrito } from '../contexto/CarritoContext';

export default function BarraNavegacion() {
  const usuarioLogueado = Boolean(localStorage.getItem('rol'));
  const { carrito } = usarCarrito();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate('/');
  };

  const getRolDisplay = () => {
    const rol = localStorage.getItem('rol');
    switch(rol) {
      case 'administrador': return 'Administrador';
      case 'mesero': return 'Mesero';
      case 'cocinero': return 'Cocinero';
      case 'cliente': return 'Cliente';
      default: return 'Usuario';
    }
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo y título */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Restaurant sx={{ mr: 2, fontSize: 32 }} />
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              color: '#fff', 
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            Boom! Burger
          </Typography>
        </Box>

        {/* Acciones del usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notificaciones */}
          <Tooltip title="Notificaciones">
            <IconButton 
              component={Link} 
              to="/notificaciones" 
              color="inherit"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Badge badgeContent={0} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Carrito - Siempre visible */}
          <Tooltip title={`Carrito (${totalItems} items)`}>
            <IconButton 
              component={Link} 
              to="/carrito" 
              color="inherit"
              sx={{
                backgroundColor: totalItems > 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                border: totalItems > 0 ? '2px solid rgba(255,255,255,0.3)' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Badge 
                badgeContent={totalItems} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }
                }}
              >
                <ShoppingCart sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Usuario */}
          {!usuarioLogueado ? (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              startIcon={<Person />}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                },
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Iniciar Sesión
            </Button>
          ) : (
            <>
              <Button
                onClick={handleClick}
                startIcon={
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {localStorage.getItem('rol')?.charAt(0).toUpperCase()}
                  </Avatar>
                }
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Box sx={{ textAlign: 'left', ml: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {localStorage.getItem('nombre') || 'Usuario'}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {getRolDisplay()}
                  </Typography>
                </Box>
              </Button>
              
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
                  <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
                  Mi Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                  <Logout sx={{ mr: 2, color: 'error.main' }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 