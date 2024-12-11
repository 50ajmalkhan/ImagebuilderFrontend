import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { LogIn } from 'lucide-react';
import { setUser } from '../store/slices/authSlice';

// Dummy user credentials
const DEMO_USER = {
  email: 'demo@example.com',
  password: 'password123',
  name: 'Demo User'
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: DEMO_USER.email,
    password: DEMO_USER.password,
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dummy authentication check
    if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
      dispatch(setUser({ 
        email: DEMO_USER.email, 
        name: DEMO_USER.name 
      }));
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Use the pre-filled demo account to login.');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-16">
      <Paper elevation={0} className="p-8 rounded-xl border border-gray-100">
        <Box className="text-center mb-6">
          <Typography variant="h4" component="h1" className="font-bold mb-2">
            Welcome Back
          </Typography>
          <Typography color="text.secondary">
            Sign in to continue to AI Creator Studio
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
          <Button
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            startIcon={<LogIn />}
          >
            Sign In
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;