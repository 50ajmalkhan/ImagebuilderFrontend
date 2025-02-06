import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TestimonialSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t('landing.testimonials.items.artist.name'),
      role: t('landing.testimonials.items.artist.role'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      quote: t('landing.testimonials.items.artist.comment')
    },
    {
      name: t('landing.testimonials.items.marketer.name'),
      role: t('landing.testimonials.items.marketer.role'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
      quote: t('landing.testimonials.items.marketer.comment')
    },
    {
      name: t('landing.testimonials.items.creator.name'),
      role: t('landing.testimonials.items.creator.role'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
      quote: t('landing.testimonials.items.creator.comment')
    }
  ];

  return (
    <Box className="py-20 bg-gray-50">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          className="text-center mb-12"
          sx={{ fontWeight: 700 }}
        >
          {t('landing.testimonials.title')}
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