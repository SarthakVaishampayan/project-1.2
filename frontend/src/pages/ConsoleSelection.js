import React, { useState, useEffect, useCallback } from 'react';
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
  Divider,
  Collapse,
  IconButton,
  Chip,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

const ConsoleSelection = () => {
  const { parlourId } = useParams();
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async (bookingDate) => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/bookings/parlour/${parlourId}?date=${bookingDate}`);
      setBookings(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  }, [parlourId]);

  const fetchDevices = useCallback(async (bookingDate) => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/devices/available/${parlourId}?date=${bookingDate}`);
      console.log('Devices response:', res.data.data); // Debug log
      
      // Process devices and their time slots
      const processedDevices = res.data.data.map(device => ({
        ...device,
        consoleUnits: device.consoleUnits.map(unit => {
          // Get bookings for this unit
          const unitBookings = bookings.filter(b => b.consoleUnit === unit.consoleId);
          
          // Generate all possible time slots
          const allTimeSlots = [];
          for (let hour = 10; hour <= 22; hour++) {
            const startTime = `${hour.toString().padStart(2, '0')}:00`;
            const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
            
            // Check if this slot is booked
            const isBooked = unitBookings.some(booking => 
              booking.startTime === startTime && booking.endTime === endTime
            );
            
            allTimeSlots.push({
              startTime,
              endTime,
              isBooked
            });
          }
          
          return {
            ...unit,
            timeSlots: allTimeSlots
          };
        })
      }));
      
      setDevices(processedDevices);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch available devices');
      setLoading(false);
    }
  }, [parlourId, bookings]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookingDate = searchParams.get('date');
    if (!bookingDate) {
      navigate('/parlours');
      return;
    }
    setDate(bookingDate);
    fetchBookings(bookingDate);
  }, [parlourId, navigate, fetchBookings]);

  useEffect(() => {
    if (date) {
      fetchDevices(date);
    }
  }, [date, fetchDevices]);

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
      const timeSlot = selectedTimeSlots[consoleUnit.consoleId];
      if (!timeSlot) {
        toast.error('Please select a time slot');
        return;
      }

      const bookingPayload = {
        parlour: parlourId,
        device: device._id,
        date: date,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        consoleUnit: consoleUnit.consoleId
      };

      await axios.post(`${config.apiUrl}/api/bookings`, bookingPayload);
      toast.success('Booking successful!');
      
      // Refresh the data after successful booking
      await fetchBookings(date);
      await fetchDevices(date);
      
      // Clear the selected time slot
      setSelectedTimeSlots(prev => ({
        ...prev,
        [consoleUnit.consoleId]: undefined
      }));
      
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
                              color={unit.status === 'maintenance' ? 'warning.main' : 'success.main'}
                              sx={{ fontWeight: 'medium' }}
                            >
                              Status: {unit.status === 'maintenance' ? 'Under Maintenance' : 'Available'}
                            </Typography>
                          </Box>
                          
                          {unit.status === 'available' && (
                            <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'center' }}>
                              <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Time Slot</InputLabel>
                                <Select
                                  value={selectedTimeSlots[unit.consoleId]?.startTime || ''}
                                  onChange={(e) => {
                                    const selectedSlot = unit.timeSlots.find(
                                      slot => slot.startTime === e.target.value
                                    );
                                    handleTimeSlotSelect(unit.consoleId, selectedSlot);
                                  }}
                                  label="Time Slot"
                                >
                                  {unit.timeSlots.map((slot) => (
                                    <MenuItem 
                                      key={slot.startTime} 
                                      value={slot.startTime}
                                      disabled={slot.isBooked}
                                    >
                                      {slot.startTime} - {slot.endTime}
                                      {slot.isBooked && (
                                        <Chip 
                                          label="Booked" 
                                          size="small" 
                                          color="error" 
                                          sx={{ ml: 1 }}
                                        />
                                      )}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Button
                                variant="contained"
                                onClick={() => handleBooking(device, unit)}
                                disabled={!selectedTimeSlots[unit.consoleId] || selectedTimeSlots[unit.consoleId].isBooked}
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