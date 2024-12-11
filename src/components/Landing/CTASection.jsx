import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <Container maxWidth="md">
        <Box className="text-center">
          <Typography 
            variant="h3" 
            component="h2" 
            className="mb-6"
            sx={{ fontWeight: 700 }}
          >
            Ready to Transform Your Creative Process?
          </Typography>
          <Typography variant="h6" className="mb-8 opacity-90">
            Join thousands of creators who are already using AI to enhance their work
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<Rocket />}
            onClick={() => navigate('/generate')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;