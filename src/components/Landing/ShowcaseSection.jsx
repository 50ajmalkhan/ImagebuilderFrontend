import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const showcaseItems = [
  {
    title: 'AI-Generated Landscapes',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
    description: 'Transform simple text into breathtaking landscape imagery',
  },
  {
    title: 'Product Visualization',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    description: 'Create professional product renders from descriptions',
  },
  {
    title: 'Video Stories',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600',
    description: 'Generate engaging video content for your brand',
  },
];

const ShowcaseSection = () => {
  return (
    <Box className="py-20 bg-white">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          className="text-center mb-12"
          sx={{ fontWeight: 700 }}
        >
          Showcase
        </Typography>
        <Grid container spacing={4}>
          {showcaseItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0} 
                className="overflow-hidden rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <Box className="p-6">
                  <Typography variant="h5" component="h3" className="mb-2">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShowcaseSection;