import React from 'react';
import { Paper, Typography, Box, IconButton, Grid, CircularProgress } from '@mui/material';
import { Download, Share2, Trash2 } from 'lucide-react';

const RecentGenerations = ({ generations = [], isLoading = false }) => {
  return (
    <Paper elevation={0} className="border border-gray-100 rounded-xl p-6">
      <Typography variant="h6" className="mb-4">Recent Generations</Typography>
      
      {isLoading && (
        <Box className="flex justify-center items-center py-8">
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={3}>
        {generations.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={0} className="border border-gray-100 rounded-xl overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-48 object-cover"
              />
              <Box className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" className="mb-3 line-clamp-2">
                  {item.prompt}
                </Typography>
                <Box className="flex justify-between items-center">
                  <Typography variant="body2" color="text.secondary">
                    {item.type}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <Download className="w-4 h-4" />
                    </IconButton>
                    <IconButton size="small">
                      <Share2 className="w-4 h-4" />
                    </IconButton>
                    <IconButton size="small">
                      <Trash2 className="w-4 h-4" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {!isLoading && generations.length === 0 && (
        <Box className="text-center py-8">
          <Typography color="text.secondary">
            No generations yet. Start creating!
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RecentGenerations;