import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Rating,
  Fade,
  Grow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import config from '../config';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(20, 20, 20, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(124, 77, 255, 0.2)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(124, 77, 255, 0.3)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
  '& .MuiCardMedia-root': {
    transition: 'transform 0.3s ease',
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: 'rgba(124, 77, 255, 0.9)',
  color: '#fff',
  fontWeight: 600,
  backdropFilter: 'blur(4px)',
  '& .MuiChip-label': {
    padding: '0 12px',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'rgba(20, 20, 20, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(124, 77, 255, 0.2)',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
}));

const GamingParlours = () => {
  const [parlours, setParlours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParlour, setSelectedParlour] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchParlours();
  }, []);

  const fetchParlours = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/parlours`);
      setParlours(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch gaming parlours');
      setLoading(false);
    }
  };

  const handleBookClick = (parlour) => {
    if (!user) {
      toast.info('Please login to book a gaming parlour');
      navigate('/login');
      return;
    }
    setSelectedParlour(parlour);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedParlour(null);
    setBookingData({
      date: '',
    });
  };

  const handleDateSubmit = () => {
    if (!bookingData.date) {
      toast.error('Please select a date');
      return;
    }
    navigate(`/parlours/${selectedParlour._id}/consoles?date=${bookingData.date}`);
    handleCloseDialog();
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <SportsEsportsIcon sx={{ fontSize: 40 }} />
            Gaming Parlours
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Discover and book the best gaming parlours in your area
          </Typography>
        </Box>

        <Fade in={!loading} timeout={1000}>
          <Grid container spacing={4}>
            {parlours.map((parlour, index) => (
              <Grid item xs={12} sm={6} md={4} key={parlour._id}>
                <Grow in timeout={500 + index * 100}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={parlour.image || 'https://source.unsplash.com/random/400x200/?gaming'}
                        alt={parlour.name}
                      />
                      <PriceChip
                        label={`$${parlour.pricePerHour}/hr`}
                        icon={<AccessTimeIcon />}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        {parlour.name}
                      </Typography>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary">
                          {parlour.location}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {parlour.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Rating
                          value={parlour.rating || 4.5}
                          precision={0.5}
                          readOnly
                          icon={<StarIcon sx={{ color: '#ffd700' }} />}
                          emptyIcon={<StarIcon sx={{ color: 'rgba(255, 215, 0, 0.3)' }} />}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleBookClick(parlour)}
                        sx={{
                          background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #6c3bff 30%, #ff2d7a 90%)',
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Fade>

        <StyledDialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 600 }}>
            Select Date
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                type="date"
                label="Date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(124, 77, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(124, 77, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDateSubmit}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6c3bff 30%, #ff2d7a 90%)',
                },
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </StyledDialog>
      </Container>
    </Box>
  );
};

export default GamingParlours; 