import React from 'react';
import { Container, Grid } from '@mui/material';
import GenerationForm from '../components/Generation/GenerationForm';
import RecentGenerations from '../components/Dashboard/RecentGenerations';
import { useSelector } from 'react-redux';

const GeneratePage = () => {
  const { history, isGenerating } = useSelector((state) => state.generation);

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <GenerationForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentGenerations 
            generations={history} 
            isLoading={isGenerating}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GeneratePage;