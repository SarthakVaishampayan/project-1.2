import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/bookings');
      setBookings(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingToDelete._id}`);
      toast.success('Booking cancelled successfully');
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
      fetchBookings(); // Refresh the bookings list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parlour</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.parlour.name}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">
                      {booking.device.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Device ID: {booking.device._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Console Unit: {booking.consoleUnit}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {booking.startTime} - {booking.endTime}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={
                      booking.status === 'cancelled'
                        ? 'error.main'
                        : booking.status === 'completed'
                        ? 'success.main'
                        : 'primary.main'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(booking)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No, Keep Booking</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings; 