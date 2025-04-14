import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Fade,
  Zoom,
  Slide,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Gaming elements for animation
const gamingElements = [
  { icon: <SportsEsportsIcon />, position: { top: '10%', left: '5%' } },
  { icon: <VideogameAssetIcon />, position: { top: '20%', right: '10%' } },
  { icon: <KeyboardArrowUpIcon />, position: { bottom: '15%', left: '15%' } },
  { icon: <KeyboardArrowDownIcon />, position: { bottom: '25%', right: '20%' } },
  { icon: <KeyboardArrowLeftIcon />, position: { top: '40%', left: '8%' } },
  { icon: <KeyboardArrowRightIcon />, position: { top: '30%', right: '15%' } },
];

const Home = () => {
  const [featuredParlours, setFeaturedParlours] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showHero, setShowHero] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showConsoles, setShowConsoles] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [animatedElements, setAnimatedElements] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
      title: "Premium Gaming Consoles",
      description: "Experience gaming at its finest with our top-of-the-line consoles and accessories.",
      color: "#7c4dff",
      hoverEffect: "scale(1.05) rotate(5deg)",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: "Flexible Booking",
      description: "Book your gaming session at your convenience with our easy scheduling system.",
      color: "#ff4081",
      hoverEffect: "scale(1.05) rotate(-5deg)",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: "Secure Environment",
      description: "Play in a safe, well-maintained space with regular sanitization.",
      color: "#00bcd4",
      hoverEffect: "scale(1.05) translateY(-10px)",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: "Competitive Pricing",
      description: "Enjoy premium gaming at affordable rates with special member discounts.",
      color: "#ff9800",
      hoverEffect: "scale(1.05) translateX(10px)",
    },
  ];

  useEffect(() => {
    fetchFeaturedParlours();
    // Trigger animations in sequence
    const timer1 = setTimeout(() => setShowHero(true), 500);
    const timer2 = setTimeout(() => setShowFeatures(true), 1500);
    const timer3 = setTimeout(() => setShowConsoles(true), 2500);
    const timer4 = setTimeout(() => setShowCTA(true), 3500);
    
    // Animate gaming elements
    const animateElements = () => {
      const elements = gamingElements.map((element, index) => ({
        ...element,
        id: index,
        animation: {
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          rotation: Math.random() * 30 - 15,
          duration: 3 + Math.random() * 2,
        },
      }));
      setAnimatedElements(elements);
    };
    
    animateElements();
    const elementTimer = setInterval(animateElements, 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(elementTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFeaturedParlours = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/parlours/featured');
      setFeaturedParlours(res.data);
    } catch (err) {
      console.error('Failed to fetch featured parlours:', err);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/parlours');
    }
  };

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh' }}>
      {/* Animated gaming elements */}
      {animatedElements.map((element) => (
        <Box
          key={element.id}
          sx={{
            position: 'absolute',
            ...element.position,
            color: 'primary.main',
            opacity: 0.7,
            fontSize: '2rem',
            animation: `float ${element.animation.duration}s ease-in-out infinite`,
            '@keyframes float': {
              '0%': {
                transform: `translate(0, 0) rotate(0deg)`,
              },
              '50%': {
                transform: `translate(${element.animation.x}px, ${element.animation.y}px) rotate(${element.animation.rotation}deg)`,
              },
              '100%': {
                transform: `translate(0, 0) rotate(0deg)`,
              },
            },
          }}
        >
          {element.icon}
        </Box>
      ))}

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(124, 77, 255, 0.3) 100%)',
        }}
      >
        <Fade in={showHero} timeout={1000}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 10px rgba(124, 77, 255, 0.5)',
                mb: 2,
              }}
              className="heading-font"
            >
              BookYourGAME
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
              }}
              className="heading-font"
            >
              Your ultimate destination for booking gaming consoles and parlours
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleBookNow}
              startIcon={<SportsEsportsIcon />}
              sx={{
                py: 2,
                px: 4,
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(255, 64, 129, 0.5)',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(255, 64, 129, 0.7)',
                },
              }}
            >
              Browse Gaming Parlours
            </Button>
          </Container>
        </Fade>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={showFeatures} timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="heading-font"
            >
              Why Choose Us
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
              Experience gaming like never before with our premium booking service
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="gaming-card"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  background: 'rgba(18, 18, 18, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 77, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  transform: activeCard === index ? feature.hoverEffect : 'none',
                  '&:hover': {
                    transform: feature.hoverEffect,
                    boxShadow: `0 0 20px ${feature.color}40`,
                  },
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                    boxShadow: `0 0 20px ${feature.color}40`,
                    animation: 'pulse 2s infinite',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Parlours Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Slide direction="up" in={showConsoles} timeout={1000}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="heading-font"
              >
                Featured Gaming Parlours
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
                Check out our selection of premium gaming parlours
              </Typography>
            </Box>
          </Slide>

          <Grid container spacing={4}>
            {featuredParlours.map((parlour, index) => (
              <Grid item key={parlour._id} xs={12} md={4}>
                <Zoom in={showConsoles} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(18, 18, 18, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(124, 77, 255, 0.2)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                      },
                    }}
                    onClick={() => navigate(`/parlours`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={parlour.image || 'https://via.placeholder.com/300x200'}
                      alt={parlour.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600, color: 'white' }} className="heading-font">
                        {parlour.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {parlour.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Location: {parlour.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price per hour: ${parlour.pricePerHour}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/parlours')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={showCTA} timeout={1000}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(124, 77, 255, 0.2)',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="heading-font"
            >
              Ready to Game?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
              Sign up now and get access to exclusive gaming parlours and consoles
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
              startIcon={<SportsEsportsIcon />}
              sx={{
                py: 2,
                px: 4,
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(255, 64, 129, 0.5)',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(255, 64, 129, 0.7)',
                },
              }}
            >
              Sign Up Now
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home; 