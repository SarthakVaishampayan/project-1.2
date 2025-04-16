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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GamingConsoleIcon from '@mui/icons-material/VideogameAsset';
import ControllerIcon from '@mui/icons-material/SportsEsports';
import HeadsetIcon from '@mui/icons-material/Headset';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';

// Gaming elements for animation
const gamingElements = [
  { icon: <SportsEsportsIcon />, position: { top: '10%', left: '5%' } },
  { icon: <VideogameAssetIcon />, position: { top: '20%', right: '10%' } },
  { icon: <KeyboardArrowUpIcon />, position: { bottom: '15%', left: '15%' } },
  { icon: <KeyboardArrowDownIcon />, position: { bottom: '25%', right: '20%' } },
  { icon: <KeyboardArrowLeftIcon />, position: { top: '40%', left: '8%' } },
  { icon: <KeyboardArrowRightIcon />, position: { top: '30%', right: '15%' } },
];

// Add this after the existing gamingElements array
const popularGames = [
  {
    name: "Grand Theft Auto V",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    genre: "Action-Adventure",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.9,
  },
  {
    name: "FIFA 23",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg",
    genre: "Sports",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.7,
  },
  {
    name: "Mortal Kombat 11",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/header.jpg",
    genre: "Fighting",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.8,
  },
  {
    name: "Tekken 7",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/header.jpg",
    genre: "Fighting",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.6,
  },
  {
    name: "Call of Duty: Modern Warfare II",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
    genre: "First-Person Shooter",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.7,
  },
  {
    name: "Red Dead Redemption 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    genre: "Action-Adventure",
    platforms: ["Xbox", "PlayStation", "PC"],
    rating: 4.9,
  },
];

// Add this after the popularGames array
const esportsStats = [
  { number: "50+", label: "Active Tournaments", icon: <EmojiEventsIcon />, color: "#ffd700" },
  { number: "1000+", label: "Registered Players", icon: <GroupsIcon />, color: "#ff4081" },
  { number: "24/7", label: "Live Streaming", icon: <LiveTvIcon />, color: "#00bcd4" },
  { number: "10K+", label: "Community Members", icon: <TrendingUpIcon />, color: "#7c4dff" },
];

// Add this after the gamingElements array
const gamingDecorations = [
  { icon: <GamingConsoleIcon />, position: { top: '5%', left: '5%' }, size: '3rem', color: '#ffd700' },
  { icon: <ControllerIcon />, position: { top: '15%', right: '5%' }, size: '3rem', color: '#ff4081' },
  { icon: <HeadsetIcon />, position: { bottom: '10%', left: '10%' }, size: '3rem', color: '#00bcd4' },
  { icon: <KeyboardIcon />, position: { bottom: '20%', right: '10%' }, size: '3rem', color: '#7c4dff' },
];

// Add this loading animation component after the gamingDecorations array and before the Home component
const LoadingAnimation = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(10, 10, 15, 0.95)',
      zIndex: 9999,
      backdropFilter: 'blur(10px)',
    }}
  >
    <Box sx={{ position: 'relative' }}>
      {/* Outer Circle */}
      <CircularProgress
        size={120}
        thickness={2}
        sx={{
          color: '#7c4dff',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': {
              opacity: 0.6,
              transform: 'scale(0.8)',
            },
            '50%': {
              opacity: 1,
              transform: 'scale(1.2)',
            },
            '100%': {
              opacity: 0.6,
              transform: 'scale(0.8)',
            },
          },
        }}
      />
      {/* Middle Circle */}
      <CircularProgress
        size={80}
        thickness={2}
        sx={{
          color: '#ff4081',
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-40px',
          marginTop: '-40px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.4s',
        }}
      />
      {/* Inner Circle */}
      <CircularProgress
        size={40}
        thickness={3}
        sx={{
          color: '#00bcd4',
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-20px',
          marginTop: '-20px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.8s',
        }}
      />
      {/* Center Icon */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SportsEsportsIcon
          sx={{
            fontSize: 24,
            color: 'white',
            animation: 'float 2s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0) scale(1) rotate(0deg)',
              },
              '50%': {
                transform: 'translateY(-10px) scale(1.1) rotate(180deg)',
              },
            },
          }}
        />
      </Box>
      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '140px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          opacity: 0.8,
          animation: 'glow 2s ease-in-out infinite',
          '@keyframes glow': {
            '0%, 100%': {
              textShadow: '0 0 5px rgba(124, 77, 255, 0.5)',
              opacity: 0.8,
            },
            '50%': {
              textShadow: '0 0 20px rgba(124, 77, 255, 0.8)',
              opacity: 1,
            },
          },
        }}
      >
        Loading
      </Typography>
      {/* Particle Effects */}
      {[...Array(12)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: index % 3 === 0 ? '#7c4dff' : index % 3 === 1 ? '#ff4081' : '#00bcd4',
            animation: `particle${index} 2s ease-in-out infinite`,
            '@keyframes particle0': {
              '0%': { transform: 'rotate(0deg) translateX(60px)' },
              '100%': { transform: 'rotate(360deg) translateX(60px)' },
            },
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </Box>
  </Box>
);

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
  const [loading, setLoading] = useState(true);

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
    
    // Show loading animation for 2 seconds
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(elementTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const fetchFeaturedParlours = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/parlours/featured`);
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

  const scrollToWhyChooseUs = () => {
    const element = document.getElementById('why-choose-us');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add loading check at the start of the return statement
  if (loading) {
    return <LoadingAnimation />;
  }

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
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#0A0A0F',
          overflow: 'hidden',
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255, 64, 129, 0.1) 0%, rgba(124, 77, 255, 0.1) 100%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 30% 0)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80) center/cover',
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        {/* Grid Lines */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
        <Fade in={showHero} timeout={1000}>
                <Box>
            <Typography
              variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      mb: 2,
                      color: 'white',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textShadow: '0 0 20px rgba(124, 77, 255, 0.5)',
                    }}
                  >
                    Book Your
                    <Typography
                      component="span"
                      variant="h1"
              sx={{
                        fontSize: 'inherit',
                        fontWeight: 800,
                        display: 'block',
                        background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
                      Gaming Experience
                    </Typography>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                      color: 'rgba(255,255,255,0.7)',
                mb: 4,
                      maxWidth: '600px',
              }}
            >
                    Join the ultimate gaming community and experience next-level gaming with premium consoles and equipment
            </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleBookNow}
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: '4px',
                        background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
                        boxShadow: '0 0 20px rgba(124, 77, 255, 0.5)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      PLAY NOW
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={scrollToWhyChooseUs}
              sx={{
                py: 2,
                px: 4,
                        borderRadius: '4px',
                        borderColor: 'rgba(124, 77, 255, 0.5)',
                        color: 'white',
                        '&:hover': {
                          borderColor: '#7c4dff',
                          background: 'rgba(124, 77, 255, 0.1)',
                        },
                      }}
                    >
                      LEARN MORE
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 4, mt: 6 }}>
                    {esportsStats.slice(0, 3).map((stat, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: stat.color,
                            mb: 1,
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '600px',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {/* Add your hero image or 3D model here */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Add this after the Hero Section and before the Features Section */}
      <Box sx={{ py: 8, bgcolor: 'rgba(18, 18, 18, 0.8)', position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(124, 77, 255, 0.1) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Slide direction="up" in={showHero} timeout={1000}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #ffd700 30%, #ff4081 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                }}
              >
                Esports Hub
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
                Join the competitive gaming community and showcase your skills
              </Typography>
            </Box>
          </Slide>

          <Grid container spacing={4} justifyContent="center">
            {esportsStats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 3,
                borderRadius: 2,
                      background: 'rgba(18, 18, 18, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(124, 77, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 0 20px ${stat.color}40`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        color: stat.color,
                        fontSize: '2.5rem',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(45deg, ${stat.color} 30%, ${stat.color}90)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Update the Popular Games section */}
      <Box sx={{ py: 8, background: '#0A0A0F', position: 'relative' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 800,
              textTransform: 'uppercase',
              background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Popular Games
          </Typography>
          <Grid container spacing={3}>
            {popularGames.map((game, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: 'rgba(20, 20, 30, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(124, 77, 255, 0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 40px rgba(124, 77, 255, 0.2)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={game.image}
                      alt={game.name}
                      sx={{
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(10, 10, 15, 0.95) 100%)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                      }}
                    >
                      HOT
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                      {game.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ color: '#7c4dff' }}>
                        {game.genre}
                      </Typography>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              color: i < Math.floor(game.rating) ? '#ffd700' : 'rgba(255,255,255,0.2)',
                              fontSize: '0.875rem',
                            }}
                          >
                            ★
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {game.platforms.map((platform, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            color: 'white',
                            background: 'rgba(124, 77, 255, 0.2)',
                            border: '1px solid rgba(124, 77, 255, 0.3)',
                          }}
                        >
                          {platform}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Add this after the Popular Games section */}
      <Box sx={{ py: 8, bgcolor: 'rgba(18, 18, 18, 0.8)', position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80') center/cover,
              linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9))
            `,
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Slide direction="up" in={showFeatures} timeout={1000}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(255, 64, 129, 0.3)',
                }}
              >
                Upcoming Tournaments
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
                Join the competition and win amazing prizes
              </Typography>
            </Box>
          </Slide>

          <Grid container spacing={4} justifyContent="center">
            {[1, 2, 3].map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(18, 18, 18, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 64, 129, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 40px rgba(255, 64, 129, 0.4)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://source.unsplash.com/random/800x600/?gaming,${index}`}
                      alt={`Tournament ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600, color: 'white' }}>
                        {`Esports Championship ${index + 1}`}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'primary.main', mr: 1 }}>
                          Prize Pool: $10,000
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }}>
                            {`${index + 1} day${index > 0 ? 's' : ''} left`}
                          </Typography>
                          <Box sx={{ color: '#ffd700' }}>★</Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {['PC', 'Console', 'Mobile'].map((platform, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 'rgba(255, 64, 129, 0.1)',
                              border: '1px solid rgba(255, 64, 129, 0.2)',
                            }}
                          >
                            <Typography variant="caption" sx={{ color: 'primary.main' }}>
                              {platform}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          background: 'linear-gradient(45deg, #ff4081 30%, #7c4dff 90%)',
                '&:hover': {
                            background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                },
              }}
            >
                        Register Now
            </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="why-choose-us">
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
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={parlour.image || 'https://via.placeholder.com/300x200'}
                      alt={parlour.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600, color: 'white' }}>
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
                        onClick={() => navigate(`/parlours/${parlour._id}/consoles`)}
                      >
                        Book Now
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