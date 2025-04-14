import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <AppBar 
      position="static"
      sx={{
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(124, 77, 255, 0.3) 100%)',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '1px',
            '&:hover': {
              color: '#7c4dff',
              transition: 'color 0.3s ease',
            },
          }}
          className="heading-font"
        >
          BookYourGAME
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/parlours"
            sx={{
              '&:hover': {
                color: '#7c4dff',
                transition: 'color 0.3s ease',
              },
            }}
          >
            Gaming Parlours
          </Button>
          {user ? (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/bookings"
                sx={{
                  '&:hover': {
                    color: '#7c4dff',
                    transition: 'color 0.3s ease',
                  },
                }}
              >
                My Bookings
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  '&:hover': {
                    color: '#7c4dff',
                    transition: 'color 0.3s ease',
                  },
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
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
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
                    color: '#7c4dff',
                    transition: 'color 0.3s ease',
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
                  '&:hover': {
                    color: '#7c4dff',
                    transition: 'color 0.3s ease',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 