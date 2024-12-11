import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { Image, Video } from 'lucide-react';
import StatisticsCard from '../components/Dashboard/StatisticsCard';
import RecentGenerations from '../components/Dashboard/RecentGenerations';
import UsageChart from '../components/Dashboard/UsageChart';

// Mock data
const statistics = [
  { icon: <Image className="w-6 h-6 text-blue-600" />, title: 'Images Generated', value: '1,234', trend: 12 },
  { icon: <Video className="w-6 h-6 text-blue-600" />, title: 'Videos Created', value: '256', trend: 8 },
];

const recentGenerations = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    prompt: 'A serene mountain landscape with a crystal clear lake at sunset',
    type: 'Image',
    createdAt: '2024-02-20T10:30:00',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    prompt: 'Modern minimalist product photography with soft shadows',
    type: 'Image',
    createdAt: '2024-02-19T15:45:00',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
    prompt: 'Cinematic urban scene with neon lights and rain',
    type: 'Video',
    createdAt: '2024-02-18T09:15:00',
  },
];

const DashboardPage = () => {
  return (
    <Box className="py-8">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" className="mb-6 font-bold">
          Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          {/* Statistics Cards */}
          {statistics.map((stat, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StatisticsCard {...stat} />
            </Grid>
          ))}

          {/* Usage Chart */}
          <Grid item xs={12}>
            <UsageChart />
          </Grid>

          {/* Recent Generations */}
          <Grid item xs={12}>
            <RecentGenerations generations={recentGenerations} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;