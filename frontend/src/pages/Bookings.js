import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Chip,
  IconButton,
  Fade,
  Grow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';
import { motion } from 'framer-motion';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(20, 20, 20, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(124, 77, 255, 0.2)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',
  '& .MuiTableCell-head': {
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1rem',
    borderBottom: '2px solid rgba(124, 77, 255, 0.2)',
  },
  '& .MuiTableCell-body': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: theme.palette.text.primary,
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: 'rgba(124, 77, 255, 0.05)',
    transition: 'all 0.3s ease',
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  borderRadius: '16px',
  fontWeight: 600,
  ...getStatusStyles(status, theme),
}));

const getStatusStyles = (status, theme) => {
  const styles = {
    pending: {
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      color: '#ffa726',
      border: '1px solid rgba(255, 152, 0, 0.5)',
    },
    confirmed: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      color: '#81c784',
      border: '1px solid rgba(76, 175, 80, 0.5)',
    },
    cancelled: {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      color: '#e57373',
      border: '1px solid rgba(244, 67, 54, 0.5)',
    },
    completed: {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      color: '#64b5f6',
      border: '1px solid rgba(33, 150, 243, 0.5)',
    },
  };
  return styles[status] || styles.pending;
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.apiUrl}/api/users/bookings`);
      setBookings(res.data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch bookings. Please try again later.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`${config.apiUrl}/api/bookings/${bookingId}`, {
        status: 'cancelled'
      });
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error(err.response?.data?.message || 'Failed to cancel booking. Please try again later.');
    }
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
            My Gaming Sessions
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Track and manage your gaming sessions across all parlours
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </Box>
        ) : bookings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No bookings found. Start by booking a gaming session!
            </Typography>
          </Box>
        ) : (
          <Fade in={true} timeout={1000}>
            <Box>
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Parlour</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking, index) => (
                      <Grow
                        key={booking._id}
                        in={true}
                        timeout={500 + index * 100}
                      >
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                              {booking.parlour.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {booking.parlour.location}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                                {booking.device.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Console Unit: {booking.consoleUnit}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {booking.startTime} - {booking.endTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <StatusChip
                              label={booking.status.toUpperCase()}
                              status={booking.status}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                              ${booking.totalPrice}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {booking.status === 'pending' && (
                              <IconButton
                                color="error"
                                onClick={() => handleCancelBooking(booking._id)}
                                sx={{
                                  '&:hover': {
                                    transform: 'scale(1.1)',
                                    transition: 'transform 0.2s',
                                  },
                                }}
                              >
                                <CancelIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      </Grow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Bookings; 