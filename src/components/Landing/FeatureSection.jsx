import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ImagePlus, Video, History, Download } from 'lucide-react';

const features = [
  {
    icon: <ImagePlus className="w-10 h-10 text-blue-600" />,
    title: 'Image Generation',
    description: 'Convert text descriptions into stunning, high-quality images in seconds',
  },
  {
    icon: <Video className="w-10 h-10 text-blue-600" />,
    title: 'Video Creation',
    description: 'Transform your ideas into engaging video content with AI assistance',
  },
  {
    icon: <History className="w-10 h-10 text-blue-600" />,
    title: 'Generation History',
    description: 'Keep track of all your creations and revisit them anytime',
  },
  {
    icon: <Download className="w-10 h-10 text-blue-600" />,
    title: 'Easy Downloads',
    description: 'Download your generated content in high resolution formats',
  },
];

const FeatureSection = () => {
  return (
    <Box className="py-20 bg-white">
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" className="text-center mb-12">
          Powerful Features
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