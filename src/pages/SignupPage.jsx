import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { UserPlus } from 'lucide-react';
import { setUser } from '../store/slices/authSlice';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Dummy signup success
    dispatch(setUser({ email: formData.email, name: formData.name }));
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" className="mt-16">
      <Paper elevation={0} className="p-8 rounded-xl border border-gray-100">
        <Box className="text-center mb-6">
          <Typography variant="h4" component="h1" className="font-bold mb-2">
            Create Account
          </Typography>
          <Typography color="text.secondary">
            Join AI Creator Studio and start creating
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <Button
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            startIcon={<UserPlus />}
          >
            Create Account
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;