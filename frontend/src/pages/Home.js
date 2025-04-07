import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [featuredParlours, setFeaturedParlours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedParlours();
  }, []);

  const fetchFeaturedParlours = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/parlours/featured');
      setFeaturedParlours(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch featured parlours:', err);
      setLoading(false);
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
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random/1600x900/?gaming)`,
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Book Your Gaming Experience
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Find the perfect gaming parlour and book your favorite console for an
              unforgettable gaming session.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleBookNow}
              sx={{ mt: 2 }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Featured Parlours Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Featured Gaming Parlours
        </Typography>
        <Grid container spacing={4}>
          {featuredParlours.map((parlour) => (
            <Grid item key={parlour._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {parlour.name}
                  </Typography>
                  <Typography>{parlour.description}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Location: {parlour.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price per hour: ${parlour.pricePerHour}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 