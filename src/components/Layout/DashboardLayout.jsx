import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Box className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <Box className="pl-64 pt-16">
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;