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
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(18, 18, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(124, 77, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 32px rgba(124, 77, 255, 0.2)',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(124, 77, 255, 0.3)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(124, 77, 255, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-select': {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const ConsoleSelection = () => {
  const { parlourId } = useParams();
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  const fetchBookings = useCallback(async (parlourId, date) => {
    setIsLoadingBookings(true);
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/bookings/parlour/${parlourId}?date=${date}`
      );
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to fetch bookings. Please try again later.'
      );
      setBookings([]);
    } finally {
      setIsLoadingBookings(false);
    }
  }, []);

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
    fetchBookings(parlourId, bookingDate);
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
      await fetchBookings(parlourId, date);
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
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        py: { xs: 2, sm: 3, md: 4 },
        background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
          url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflowX: 'hidden',
        width: '100%',
        position: 'relative',
        mt: '64px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 0,
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          width: '100%',
          px: { xs: 0, sm: 2, md: 3 },
          mx: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ 
          width: '100%', 
          overflowX: 'hidden',
          px: { xs: 2, sm: 0 },
        }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              mb: { xs: 2, sm: 3, md: 4 },
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              wordBreak: 'break-word',
              px: { xs: 1, sm: 0 },
            }}
          >
            Select Your Console
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: 'white',
              textAlign: 'center',
              mb: { xs: 2, sm: 3, md: 4 },
              background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              p: { xs: 1, sm: 1.5, md: 2 },
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(124, 77, 255, 0.2)',
              wordBreak: 'break-word',
              mx: { xs: 2, sm: 0 },
            }}
          >
            Date: {new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>

          {isLoadingBookings ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ 
              width: '100%', 
              mx: 0,
              px: { xs: 2, sm: 0 },
            }}>
              {devices.map((device) => (
                <Grid item xs={12} key={device._id} sx={{ 
                  width: '100%', 
                  px: { xs: 0, sm: 2 },
                }}>
                  <StyledPaper sx={{ 
                    width: '100%', 
                    overflow: 'hidden',
                    mx: { xs: 0, sm: 'auto' },
                  }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        gap: { xs: 1, sm: 2 },
                        width: '100%',
                      }}
                      onClick={() => handleDeviceExpand(device._id)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flex: 1 }}>
                        {getConsoleIcon(device.type)}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'white', 
                              fontSize: { xs: '1rem', sm: '1.25rem' },
                              wordBreak: 'break-word',
                            }}
                          >
                            {device.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Type: {device.type}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton sx={{ color: 'white', flexShrink: 0 }}>
                        {expandedDevice === device._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>

                    <Collapse in={expandedDevice === device._id}>
                      <Box sx={{ mt: { xs: 1, sm: 2 }, width: '100%' }}>
                        <List sx={{ width: '100%' }}>
                          {device.consoleUnits.map((unit) => (
                            <React.Fragment key={unit.consoleId}>
                              <ListItem
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  gap: { xs: 1, sm: 2 },
                                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 1,
                                  mb: 1,
                                  border: '1px solid rgba(124, 77, 255, 0.2)',
                                  p: { xs: 1, sm: 2 },
                                  width: '100%',
                                }}
                              >
                                <Box sx={{ width: '100%' }}>
                                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
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
                                  <Box sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    gap: { xs: 1, sm: 2 }, 
                                    alignItems: 'center',
                                    flexDirection: { xs: 'column', sm: 'row' }
                                  }}>
                                    <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                                      <InputLabel sx={{ color: 'white' }}>
                                        Time Slot
                                      </InputLabel>
                                      <StyledSelect
                                        value={selectedTimeSlots[unit.consoleId]?.startTime || ''}
                                        onChange={(e) => {
                                          const selectedSlot = unit.timeSlots.find(
                                            (slot) => slot.startTime === e.target.value
                                          );
                                          handleTimeSlotSelect(unit.consoleId, selectedSlot);
                                        }}
                                        label="Time Slot"
                                        MenuProps={{
                                          PaperProps: {
                                            sx: {
                                              bgcolor: 'rgba(0, 0, 0, 0.9)',
                                              '& .MuiMenuItem-root': {
                                                color: 'white',
                                                '&:hover': {
                                                  bgcolor: 'rgba(124, 77, 255, 0.2)',
                                                },
                                                '&.Mui-selected': {
                                                  bgcolor: 'rgba(124, 77, 255, 0.3)',
                                                  color: 'white',
                                                },
                                                '&.Mui-disabled': {
                                                  color: 'white !important',
                                                  bgcolor: '#ff0000 !important',
                                                },
                                              },
                                            },
                                          },
                                        }}
                                      >
                                        {unit.timeSlots.map((slot) => (
                                          <MenuItem
                                            key={slot.startTime}
                                            value={slot.startTime}
                                            disabled={slot.isBooked}
                                            sx={{
                                              color: 'white',
                                              bgcolor: slot.isBooked ? '#ff0000' : 'transparent',
                                              '&:hover': {
                                                bgcolor: slot.isBooked ? '#ff3333' : 'rgba(124, 77, 255, 0.2)',
                                              },
                                              '&.Mui-selected': {
                                                bgcolor: 'rgba(124, 77, 255, 0.3)',
                                                color: 'white',
                                              },
                                              '&.Mui-selected:hover': {
                                                bgcolor: 'rgba(124, 77, 255, 0.4)',
                                              },
                                              '&.Mui-disabled': {
                                                color: 'white !important',
                                                bgcolor: '#ff0000 !important',
                                              },
                                            }}
                                          >
                                            {slot.startTime} - {slot.endTime}
                                            {slot.isBooked && (
                                              <Chip
                                                label="Booked"
                                                size="small"
                                                color="error"
                                                sx={{ 
                                                  ml: 1,
                                                  bgcolor: '#ff0000',
                                                  color: 'white',
                                                  fontWeight: 'bold',
                                                  '&:hover': {
                                                    bgcolor: '#ff3333',
                                                  }
                                                }}
                                              />
                                            )}
                                          </MenuItem>
                                        ))}
                                      </StyledSelect>
                                    </FormControl>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleBooking(device, unit)}
                                      disabled={
                                        !selectedTimeSlots[unit.consoleId] ||
                                        selectedTimeSlots[unit.consoleId].isBooked
                                      }
                                      sx={{
                                        background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                                        color: 'white',
                                        width: { xs: '100%', sm: 'auto' },
                                        '&:hover': {
                                          background: 'linear-gradient(45deg, #6c3bff 30%, #ff2d7a 90%)',
                                        },
                                        '&.Mui-disabled': {
                                          background: 'rgba(255, 255, 255, 0.12)',
                                          color: 'rgba(255, 255, 255, 0.3)',
                                        },
                                      }}
                                    >
                                      Book Now
                                    </Button>
                                  </Box>
                                )}
                              </ListItem>
                              <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                            </React.Fragment>
                          ))}
                        </List>
                      </Box>
                    </Collapse>
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ConsoleSelection; 