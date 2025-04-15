import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  SportsEsports,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { confirmPassword, ...userData } = formData;
      const success = await register(userData);
      if (success) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AnimatedPage>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{ mb: 4 }}
          >
            Back to Home
          </Button>
          
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {/* Left side - Welcome content */}
            <Grid item xs={12} md={5}>
              <Fade in timeout={1000}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 2 }}>
                    <SportsEsports sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="heading-font"
                    >
                      BookYourGAME
                    </Typography>
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    Join Our Community
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Create an account to book gaming consoles, track your bookings, and join our gaming community.
                  </Typography>
                </Box>
              </Fade>
            </Grid>

            {/* Right side - Register form */}
            <Grid item xs={12} md={7}>
              <Slide direction="up" in timeout={1000}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 5 },
                    background: 'rgba(20, 20, 20, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    '& .MuiTextField-root': {
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'transparent',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                        '& input': {
                          color: 'rgba(255, 255, 255, 0.9)',
                          backgroundColor: 'transparent',
                          '&:-webkit-autofill': {
                            WebkitBoxShadow: '0 0 0 1000px rgba(20, 20, 20, 0.95) inset',
                            WebkitTextFillColor: 'rgba(255, 255, 255, 0.9)',
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      },
                    },
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        mb: 3,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      Create Account
                    </Typography>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'white' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      sx={{ mb: 3 }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mb: 3, py: 1.5 }}
                    >
                      Sign Up
                    </Button>

                    <Typography variant="body2" align="center" color="text.secondary">
                      Already have an account?{' '}
                      <Button
                        component={RouterLink}
                        to="/login"
                        color="primary"
                        sx={{ textTransform: 'none' }}
                      >
                        Login
                      </Button>
                    </Typography>
                  </form>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AnimatedPage>
  );
};

export default Register; 