import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deviceData, setDeviceData] = useState({
    name: '',
    type: '',
    status: 'available',
    description: '',
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/devices');
      setDevices(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch devices');
      setLoading(false);
    }
  };

  const handleAddDevice = () => {
    setSelectedDevice(null);
    setDeviceData({
      name: '',
      type: '',
      status: 'available',
      description: '',
    });
    setOpenDialog(true);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setDeviceData({
      name: device.name,
      type: device.type,
      status: device.status,
      description: device.description,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDevice(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedDevice) {
        await axios.put(`http://localhost:5000/api/devices/${selectedDevice._id}`, deviceData);
        toast.success('Device updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/devices', deviceData);
        toast.success('Device added successfully');
      }
      fetchDevices();
      handleCloseDialog();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'in-use':
        return 'warning';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Gaming Devices</Typography>
        <Button variant="contained" color="primary" onClick={handleAddDevice}>
          Add Device
        </Button>
      </Box>
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={device.image || 'https://via.placeholder.com/300x200'}
                alt={device.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {device.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {device.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {device.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={device.status}
                    color={getStatusColor(device.status)}
                    sx={{ mr: 1 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditDevice(device)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedDevice ? 'Edit Device' : 'Add New Device'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Device Name"
              value={deviceData.name}
              onChange={(e) => setDeviceData({ ...deviceData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Device Type"
              value={deviceData.type}
              onChange={(e) => setDeviceData({ ...deviceData, type: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={deviceData.description}
              onChange={(e) => setDeviceData({ ...deviceData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={deviceData.status}
                onChange={(e) => setDeviceData({ ...deviceData, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="in-use">In Use</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedDevice ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeviceList; 