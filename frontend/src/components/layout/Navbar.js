import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'rgba(18, 18, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <SportsEsportsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="heading-font"
          >
            BookYourGAME
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'rgba(30, 30, 30, 0.95)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <MenuItem component={RouterLink} to="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={RouterLink} to="/parlours" onClick={handleClose}>
                Gaming Parlours
              </MenuItem>
              {user && (
                <MenuItem component={RouterLink} to="/bookings" onClick={handleClose}>
                  My Bookings
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <SportsEsportsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="heading-font"
          >
            BookYourGAME
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              onClick={handleClose}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                mx: 1,
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/parlours"
              onClick={handleClose}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                mx: 1,
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              Gaming Parlours
            </Button>
            {user && (
              <Button
                component={RouterLink}
                to="/bookings"
                onClick={handleClose}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  mx: 1,
                  '&:hover': {
                    color: 'primary.light',
                  },
                }}
              >
                My Bookings
              </Button>
            )}
          </Box>

          {/* User menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      background: 'rgba(30, 30, 30, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      '& .MuiMenuItem-root': {
                        color: 'white',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                        },
                      },
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile" 
                    onClick={handleClose}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    ml: 2,
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    ml: 2,
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 