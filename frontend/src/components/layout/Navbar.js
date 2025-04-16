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

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'rgba(18, 18, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { xs: 56, md: 64 }
        }}>
          {/* Logo for desktop */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsEsportsIcon sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              fontSize: { md: 32, lg: 40 }
            }} />
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
                fontSize: { md: '1.25rem', lg: '1.5rem' }
              }}
              className="heading-font"
            >
              BookYourGAME
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1
          }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ 
                p: 1,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'rgba(30, 30, 30, 0.95)',
                  backdropFilter: 'blur(10px)',
                  minWidth: '200px',
                  mt: 1,
                  border: '1px solid rgba(124, 77, 255, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                },
                '& .MuiMenuItem-root': {
                  py: 1.5,
                  px: 3,
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(124, 77, 255, 0.1)',
                    color: '#7c4dff'
                  }
                }
              }}
            >
              <MenuItem 
                component={RouterLink} 
                to="/" 
                onClick={handleMobileMenuClose}
                sx={{
                  borderBottom: '1px solid rgba(124, 77, 255, 0.2)',
                }}
              >
                Home
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/parlours" 
                onClick={handleMobileMenuClose}
                sx={{
                  borderBottom: '1px solid rgba(124, 77, 255, 0.2)',
                }}
              >
                Gaming Parlours
              </MenuItem>
              {user && (
                <MenuItem 
                  component={RouterLink} 
                  to="/bookings" 
                  onClick={handleMobileMenuClose}
                >
                  My Bookings
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center'
          }}>
            <SportsEsportsIcon sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              fontSize: 24
            }} />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.25rem'
              }}
              className="heading-font"
            >
              BookYourGAME
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
            gap: 2
          }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'primary.light',
                  background: 'rgba(255, 255, 255, 0.1)'
                },
                px: 2,
                py: 1
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/parlours"
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'primary.light',
                  background: 'rgba(255, 255, 255, 0.1)'
                },
                px: 2,
                py: 1
              }}
            >
              Gaming Parlours
            </Button>
            {user && (
              <Button
                component={RouterLink}
                to="/bookings"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'primary.light',
                    background: 'rgba(255, 255, 255, 0.1)'
                  },
                  px: 2,
                  py: 1
                }}
              >
                My Bookings
              </Button>
            )}
          </Box>

          {/* User menu */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleUserMenuOpen} 
                    sx={{ 
                      p: 0,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: 'secondary.main',
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 }
                      }}
                    >
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
                      minWidth: '200px',
                      '& .MuiMenuItem-root': {
                        color: 'white',
                        py: 1.5,
                        px: 3,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
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
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
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
                    '&:hover': {
                      color: 'primary.light',
                      background: 'rgba(255, 255, 255, 0.1)'
                    },
                    px: 2,
                    py: 1
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    '&:hover': {
                      color: 'primary.light',
                      background: 'rgba(255, 255, 255, 0.1)'
                    },
                    px: 2,
                    py: 1
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