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
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

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
      const res = await axios.get('http://localhost:5000/api/parlours');
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {parlours.map((parlour) => (
          <Grid item xs={12} sm={6} md={4} key={parlour._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={parlour.image || 'https://via.placeholder.com/300x200'}
                alt={parlour.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {parlour.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {parlour.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {parlour.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price per hour: ${parlour.pricePerHour}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookClick(parlour)}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
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