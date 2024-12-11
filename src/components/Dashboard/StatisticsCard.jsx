import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StatisticsCard = ({ icon, title, value, trend }) => {
  return (
    <Paper 
      elevation={0} 
      className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <Box className="flex items-center justify-between mb-4">
        <Box className="p-3 bg-blue-50 rounded-xl">
          {icon}
        </Box>
        {trend !== null && (
          <Typography 
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              trend > 0 
                ? 'text-green-700 bg-green-50' 
                : 'text-red-700 bg-red-50'
            }`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </Typography>
        )}
      </Box>
      <Typography variant="h4" className="font-bold mb-1">
        {value}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {title}
      </Typography>
    </Paper>
  );
};

export default StatisticsCard;