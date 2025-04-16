import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    '& fieldset': {
      borderColor: 'rgba(124, 77, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(124, 77, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
  border: 0,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 3px 5px 2px rgba(124, 77, 255, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(45deg, #6c3bff 30%, #ff2d7a 90%)',
    boxShadow: '0 4px 10px 2px rgba(124, 77, 255, .4)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: '0 auto 16px',
  backgroundColor: 'rgba(124, 77, 255, 0.2)',
  border: '2px solid rgba(124, 77, 255, 0.5)',
  '& .MuiSvgIcon-root': {
    fontSize: 40,
  },
}));

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
          url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBack />}
          sx={{
            mb: 4,
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Back to Home
        </Button>

        <Grid container spacing={4} alignItems="center">
          {/* Left side - Welcome content */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 2 }}>
                  <SportsEsportsIcon sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    BookYourGAME
                  </Typography>
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  Join Our Gaming Community
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Create your account to start booking gaming sessions and connecting with fellow gamers.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(124, 77, 255, 0.1)',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                      24/7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Support
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(255, 64, 129, 0.1)',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: '#ff4081', fontWeight: 700 }}>
                      Easy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Booking
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right side - Register form */}
          <Grid item xs={12} md={6}>
            <Slide direction="up" in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  background: 'rgba(20, 20, 20, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 77, 255, 0.2)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                }}
              >
                <StyledAvatar>
                  <SportsEsportsIcon />
                </StyledAvatar>
                <form onSubmit={handleSubmit}>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <StyledButton
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Create Account
                    </StyledButton>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      Already have an account? Sign In
                    </Link>
                  </Box>
                </form>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register; 