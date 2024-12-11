import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const UsageChart = () => {
  const data = [65, 45, 78, 52, 63, 43, 57];
  const max = Math.max(...data);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Paper elevation={0} className="border border-gray-100 rounded-xl p-6">
      <Typography variant="h6" className="mb-6">Weekly Usage</Typography>
      <Box className="flex items-end space-x-6 h-64">
        {data.map((value, index) => (
          <Box 
            key={index} 
            className="flex-1 flex flex-col items-center"
          >
            <Box 
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 relative group cursor-pointer"
              style={{ height: `${(value / max) * 100}%` }}
            >
              <Box className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {value} generations
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" className="mt-3 font-medium">
              {days[index]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default UsageChart;