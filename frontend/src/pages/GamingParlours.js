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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import config from '../config';

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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
          className="heading-font"
        >
          Gaming Parlours
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px', 
            fontSize: { xs: '1rem', md: '1.25rem' },
            px: { xs: 2, md: 0 }
          }}
        >
          Browse our selection of premium gaming parlours
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {parlours.map((parlour) => (
          <Grid item key={parlour._id} xs={12} sm={6} md={4}>
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
              onClick={() => navigate(`/parlours/${parlour._id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={parlour.image || 'https://via.placeholder.com/300x200'}
                alt={parlour.name}
                sx={{
                  height: { xs: 180, md: 200 },
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {parlour.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {parlour.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    Location: {parlour.location}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    Price per hour: ${parlour.pricePerHour}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ p: { xs: 2, md: 3 } }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/parlours/${parlour._id}`)}
                  sx={{
                    py: { xs: 1, md: 1.5 },
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              type="date"
              label="Date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDateSubmit} variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GamingParlours; 