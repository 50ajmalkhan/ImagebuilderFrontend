import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sparkles, LogOut } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
          <Typography variant="h6" color="inherit">
            AI Creator Studio
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        
        {isAuthenticated ? (
          <>
            <Typography variant="body1" color="text.secondary" className="mr-4">
              Welcome, {user?.name}
            </Typography>
            <Button color="inherit" onClick={() => navigate('/generate')}>Create</Button>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button 
              color="inherit" 
              startIcon={<LogOut />} 
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/generate')}>Create</Button>
            <Button 
              color="primary" 
              variant="contained" 
              sx={{ ml: 2 }} 
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              color="inherit" 
              sx={{ ml: 2 }} 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;