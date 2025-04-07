import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { toast } from 'react-toastify';

const ConsoleSelection = () => {
  const { parlourId } = useParams();
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookingDate = searchParams.get('date');
    if (!bookingDate) {
      navigate('/parlours');
      return;
    }
    setDate(bookingDate);
    fetchDevices(bookingDate);
  }, [parlourId, navigate]);

  useEffect(() => {
    if (date) {
      fetchDevices(date);
      fetchBookings();
    }
  }, [date]);

  const fetchDevices = async (bookingDate) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/devices/available/${parlourId}?date=${bookingDate}`);
      setDevices(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch available devices');
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/parlour/${parlourId}?date=${date}`);
      setBookings(res.data.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const isTimeSlotAvailable = (consoleUnit, timeSlot) => {
    // Check if console unit is in maintenance
    if (consoleUnit.status === 'maintenance') {
      return false;
    }

    // Check if there are any existing bookings for this console unit
    const existingBookings = bookings.filter(
      booking => 
        booking.consoleUnit === consoleUnit.consoleUnitId &&
        booking.date === date
    );

    // Check if the time slot overlaps with any existing booking
    const isBooked = existingBookings.some(booking => {
      const bookingStart = new Date(`2000-01-01T${booking.startTime}`);
      const bookingEnd = new Date(`2000-01-01T${booking.endTime}`);
      const slotStart = new Date(`2000-01-01T${timeSlot}`);
      const slotEnd = new Date(`2000-01-01T${timeSlot}`);
      slotEnd.setHours(slotEnd.getHours() + 1);

      return (
        (slotStart >= bookingStart && slotStart < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (slotStart <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    return !isBooked;
  };

  const getTimeSlotStatus = (consoleUnit, timeSlot) => {
    if (consoleUnit.status === 'maintenance') {
      return 'Maintenance';
    }

    const existingBookings = bookings.filter(
      booking => 
        booking.consoleUnit === consoleUnit.consoleUnitId &&
        booking.date === date
    );

    const isBooked = existingBookings.some(booking => {
      const bookingStart = new Date(`2000-01-01T${booking.startTime}`);
      const bookingEnd = new Date(`2000-01-01T${booking.endTime}`);
      const slotStart = new Date(`2000-01-01T${timeSlot}`);
      const slotEnd = new Date(`2000-01-01T${timeSlot}`);
      slotEnd.setHours(slotEnd.getHours() + 1);

      return (
        (slotStart >= bookingStart && slotStart < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (slotStart <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    return isBooked ? 'Booked' : 'Available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success.main';
      case 'booked':
        return 'error.main';
      case 'maintenance':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'booked':
        return 'Booked';
      case 'maintenance':
        return 'Under Maintenance';
      default:
        return 'Unknown';
    }
  };

  const handleDeviceExpand = (deviceId) => {
    setExpandedDevice(expandedDevice === deviceId ? null : deviceId);
  };

  const handleTimeSlotSelect = (consoleUnitId, timeSlot) => {
    setSelectedTimeSlots(prev => ({
      ...prev,
      [consoleUnitId]: timeSlot
    }));
  };

  const handleBooking = async (device, consoleUnit) => {
    try {
      const timeSlot = selectedTimeSlots[consoleUnit.consoleUnitId];
      if (!timeSlot) {
        toast.error('Please select a time slot');
        return;
      }

      const [startTime] = timeSlot.split('-');
      const endTime = `${parseInt(startTime.split(':')[0]) + 1}:00`;

      // Check if the time slot is still available
      if (!isTimeSlotAvailable(consoleUnit, timeSlot)) {
        toast.error('This time slot is no longer available');
        return;
      }

      const bookingPayload = {
        parlour: parlourId,
        device: device._id,
        date: date,
        startTime: startTime,
        endTime: endTime,
        consoleUnit: consoleUnit.consoleUnitId
      };

      await axios.post('http://localhost:5000/api/bookings', bookingPayload);
      toast.success('Booking successful!');
      navigate('/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  const getConsoleIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'playstation':
        return <SportsEsportsIcon sx={{ fontSize: 40, color: '#003791' }} />;
      case 'xbox':
        return <SportsEsportsIcon sx={{ fontSize: 40, color: '#107C10' }} />;
      case 'pc':
        return <DesktopWindowsIcon sx={{ fontSize: 40, color: '#0078D4' }} />;
      case 'laptop':
        return <LaptopIcon sx={{ fontSize: 40, color: '#666666' }} />;
      default:
        return <SportsEsportsIcon sx={{ fontSize: 40, color: '#666666' }} />;
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Your Console
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Date: {new Date(date).toLocaleDateString()}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {devices.map((device) => (
          <Grid item xs={12} key={device._id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => handleDeviceExpand(device._id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getConsoleIcon(device.type)}
                  <Box>
                    <Typography variant="h6">{device.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {device.type}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  {expandedDevice === device._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedDevice === device._id}>
                <Box sx={{ mt: 2 }}>
                  <List>
                    {device.consoleUnits.map((unit) => (
                      <React.Fragment key={unit.consoleId}>
                        <ListItem
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: 2
                          }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="subtitle1">
                              Console Unit {unit.consoleId}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color={getStatusColor(unit.status)}
                              sx={{ fontWeight: 'medium' }}
                            >
                              Status: {getStatusText(unit.status)}
                            </Typography>
                          </Box>
                          
                          {unit.status === 'available' && (
                            <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'center' }}>
                              <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Time Slot</InputLabel>
                                <Select
                                  value={selectedTimeSlots[unit.consoleId] || ''}
                                  onChange={(e) => handleTimeSlotSelect(unit.consoleId, e.target.value)}
                                  label="Time Slot"
                                >
                                  {generateTimeSlots().map((time) => {
                                    const status = getTimeSlotStatus(unit, time);
                                    const isAvailable = status === 'Available';
                                    return (
                                      <MenuItem 
                                        key={time} 
                                        value={time}
                                        disabled={!isAvailable}
                                        sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          opacity: isAvailable ? 1 : 0.5
                                        }}
                                      >
                                        <Box>
                                          {time} - {`${parseInt(time.split(':')[0]) + 1}:00`}
                                        </Box>
                                        <Typography 
                                          variant="caption" 
                                          color={isAvailable ? 'success.main' : 'error.main'}
                                          sx={{ ml: 2 }}
                                        >
                                          {status}
                                        </Typography>
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                              <Button
                                variant="contained"
                                onClick={() => handleBooking(device, unit)}
                                disabled={!selectedTimeSlots[unit.consoleId]}
                              >
                                Book Now
                              </Button>
                            </Box>
                          )}
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ConsoleSelection; 