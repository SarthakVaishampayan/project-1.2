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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import usePageTransition from '../../hooks/usePageTransition';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigateWithLoading = usePageTransition();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    handleMobileMenuClose();
    handleUserMenuClose();
    navigateWithLoading(path);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigateWithLoading('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(124, 77, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box 
            onClick={() => handleNavigation('/')}
            sx={{ 
              cursor: 'pointer',
              display: 'flex', 
              alignItems: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              '&:hover::after': {
                opacity: 1,
              },
            }}
          >
            <SportsEsportsIcon 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1,
                fontSize: { md: 32, lg: 40 },
                color: '#7c4dff',
                filter: 'drop-shadow(0 0 8px rgba(124, 77, 255, 0.5))',
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 800,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { md: '1.25rem', lg: '1.5rem' },
                textShadow: '0 0 20px rgba(124, 77, 255, 0.3)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              BookYourGAME
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
            gap: 3
          }}>
            <Button
              onClick={() => handleNavigation('/')}
              sx={{
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                px: 3,
                py: 1,
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                },
                '&:hover': {
                  color: 'white',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    opacity: 0.1,
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
                  transition: 'all 0.3s ease',
                },
                '&:hover::after': {
                  width: '100%',
                  left: 0,
                },
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => handleNavigation('/parlours')}
              sx={{
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                px: 3,
                py: 1,
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                },
                '&:hover': {
                  color: 'white',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    opacity: 0.1,
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
                  transition: 'all 0.3s ease',
                },
                '&:hover::after': {
                  width: '100%',
                  left: 0,
                },
              }}
            >
              Gaming Parlours
            </Button>
            {user && (
              <Button
                onClick={() => handleNavigation('/bookings')}
                sx={{
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  px: 3,
                  py: 1,
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                  },
                  '&:hover': {
                    color: 'white',
                    transform: 'translateY(-2px)',
                    '&::before': {
                      opacity: 0.1,
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                    left: 0,
                  },
                }}
              >
                My Bookings
              </Button>
            )}
          </Box>

          {/* User menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleUserMenuOpen}
                    sx={{
                      p: 1,
                      border: '1px solid rgba(124, 77, 255, 0.3)',
                      background: 'rgba(124, 77, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(124, 77, 255, 0.2)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: 'transparent',
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                        border: '2px solid #7c4dff',
                        boxShadow: '0 0 10px rgba(124, 77, 255, 0.5)',
                      }}
                    >
                      <AccountCircleIcon sx={{ color: '#7c4dff' }} />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                      background: 'rgba(10, 10, 15, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(124, 77, 255, 0.2)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                      overflow: 'hidden',
                      '& .MuiMenuItem-root': {
                        color: 'white',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          zIndex: -1,
                        },
                        '&:hover': {
                          background: 'transparent',
                          '&::before': {
                            opacity: 0.1,
                          },
                        },
                      },
                    },
                  }}
                  id="user-menu"
                  anchorEl={userMenuAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile" 
                    onClick={handleUserMenuClose}
                    sx={{
                      borderBottom: '1px solid rgba(124, 77, 255, 0.2)',
                      py: 1.5,
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ py: 1.5 }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: 'white',
                    px: 3,
                    py: 1,
                    border: '1px solid rgba(124, 77, 255, 0.3)',
                    background: 'rgba(124, 77, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(124, 77, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  sx={{
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(124, 77, 255, 0.4)',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{
                color: 'white',
                border: '1px solid rgba(124, 77, 255, 0.3)',
                background: 'rgba(124, 77, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(124, 77, 255, 0.2)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiPaper-root': {
                background: 'rgba(10, 10, 15, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(124, 77, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                minWidth: 200,
                '& .MuiMenuItem-root': {
                  color: 'white',
                  transition: 'all 0.3s ease',
                  py: 2,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                  },
                  '&:hover': {
                    background: 'transparent',
                    '&::before': {
                      opacity: 0.1,
                    },
                  },
                },
              },
            }}
          >
            <MenuItem onClick={() => handleNavigation('/')}>
              Home
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/parlours')}>
              Gaming Parlours
            </MenuItem>
            {user && (
              <MenuItem onClick={() => handleNavigation('/bookings')}>
                My Bookings
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 