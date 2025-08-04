import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import AppLayout from '../components/Layout/AppLayout';

const Records: React.FC = () => {
  return (
    <AppLayout title="Medical Records">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Medical Records
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage patient medical records, lab results, and documents.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Patient Records
          </Typography>
          <Typography color="text.secondary">
            Medical records management interface will be implemented here with file upload capabilities.
          </Typography>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Records;