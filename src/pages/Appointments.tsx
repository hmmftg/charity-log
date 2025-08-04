import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import AppLayout from '../components/Layout/AppLayout';

const Appointments: React.FC = () => {
  return (
    <AppLayout title="Appointments">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Appointment Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Schedule and manage patient appointments and therapy sessions.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Appointment Calendar
          </Typography>
          <Typography color="text.secondary">
            Calendar component will be implemented here with appointment scheduling functionality.
          </Typography>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Appointments;