import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            {t('landing.cta.title.part1')}
          </Typography>
          <Typography variant="h6" className="mb-8 opacity-90">
            {t('landing.cta.subtitle')}
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
            {t('landing.cta.button')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;