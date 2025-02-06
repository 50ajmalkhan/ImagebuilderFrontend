import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <Container maxWidth="lg">
        <Box className="text-center">
          <Typography variant="h2" component="h1" className="mb-6 font-bold">
            {t('landing.hero.title.part1')} {t('landing.hero.title.part2')}
          </Typography>
          <Typography variant="h5" component="p" className="mb-8 text-gray-600">
            {t('landing.hero.subtitle')}
          </Typography>
          <Box className="flex justify-center gap-4">
            <Button
              variant="contained"
              size="large"
              startIcon={<Wand2 />}
              onClick={() => navigate('/generate')}
            >
              {t('landing.hero.cta.primary')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              {t('landing.hero.cta.secondary')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;