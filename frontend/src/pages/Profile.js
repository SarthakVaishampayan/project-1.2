import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      currentPassword: Yup.string(),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .test('new-password-required', 'New password is required', function(value) {
          return !this.parent.currentPassword || (value && value.length > 0);
        }),
      confirmPassword: Yup.string()
        .test('passwords-match', 'Passwords must match', function(value) {
          return !this.parent.newPassword || value === this.parent.newPassword;
        })
        .test('confirm-password-required', 'Please confirm your new password', function(value) {
          return !this.parent.newPassword || (value && value.length > 0);
        }),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...updateData } = values;
        await axios.put('http://localhost:5000/api/users/profile', updateData);
        await fetchUser();
        toast.success('Profile updated successfully');
        formik.resetForm({
          values: {
            ...formik.values,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          },
        });
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update profile');
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </Avatar>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile; 