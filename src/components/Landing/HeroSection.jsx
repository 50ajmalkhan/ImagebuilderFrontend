import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <Container maxWidth="lg">
        <Box className="text-center">
          <Typography variant="h2" component="h1" className="mb-6 font-bold">
            Transform Your Ideas Into Reality
          </Typography>
          <Typography variant="h5" component="p" className="mb-8 text-gray-600">
            Create stunning images and videos with the power of AI
          </Typography>
          <Box className="flex justify-center gap-4">
            <Button
              variant="contained"
              size="large"
              startIcon={<Wand2 />}
              onClick={() => navigate('/generate')}
            >
              Start Creating
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              View Examples
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;