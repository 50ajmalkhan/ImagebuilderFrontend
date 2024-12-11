import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    quote: 'This platform has revolutionized our creative workflow. The AI-generated content is incredibly high-quality and saves us hours of work.'
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    quote: 'The video generation feature is a game-changer. We\'ve increased our content output by 3x while maintaining consistent quality.'
  },
  {
    name: 'Emma Davis',
    role: 'Digital Artist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    quote: 'As an artist, I was skeptical at first, but this tool has become an invaluable part of my creative process.'
  }
];

const TestimonialSection = () => {
  return (
    <Box className="py-20 bg-gray-50">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          className="text-center mb-12"
          sx={{ fontWeight: 700 }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <Box className="flex items-center mb-4">
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 56, height: 56, marginRight: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" component="h3">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" color="text.secondary" className="italic">
                  "{testimonial.quote}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialSection;