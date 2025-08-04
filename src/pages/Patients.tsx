import React from 'react';
import { Typography, Box } from '@mui/material';
import AppLayout from '../components/Layout/AppLayout';
import PatientList from '../components/Patients/PatientList';

const Patients: React.FC = () => {
  return (
    <AppLayout title="Patients">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Patient Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage patient information, medical history, and records.
        </Typography>
      </Box>

      <PatientList />
    </AppLayout>
  );
};

export default Patients;