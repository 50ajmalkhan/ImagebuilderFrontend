import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ImagePlus, Video, History, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ImagePlus className="w-10 h-10 text-blue-600" />,
      title: t('landing.features.items.imageGeneration.title'),
      description: t('landing.features.items.imageGeneration.description')
    },
    {
      icon: <Video className="w-10 h-10 text-blue-600" />,
      title: t('landing.features.items.videoCreation.title'),
      description: t('landing.features.items.videoCreation.description')
    },
    {
      icon: <History className="w-10 h-10 text-blue-600" />,
      title: t('landing.features.items.history.title'),
      description: t('landing.features.items.history.description')
    },
    {
      icon: <Download className="w-10 h-10 text-blue-600" />,
      title: t('landing.features.items.download.title'),
      description: t('landing.features.items.download.description')
    }
  ];

  return (
    <Box className="py-20 bg-white">
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" className="text-center mb-12">
          {t('landing.features.title')}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="text-center p-6">
                <Box className="flex justify-center mb-4">{feature.icon}</Box>
                <Typography variant="h6" className="mb-2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;