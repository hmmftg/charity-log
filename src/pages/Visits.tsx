import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import AppLayout from '../components/Layout/AppLayout';
import VisitForm from '../components/Visits/VisitForm';

const Visits: React.FC = () => {
  return (
    <AppLayout title="Patient Visits">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Patient Visits
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Log and manage patient visits, treatments, and medical consultations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <VisitForm />
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default Visits;