import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  People,
  LocalHospital,
  Calendar,
  TrendingUp,
} from '@mui/icons-material';
import { DashboardStats } from '../../types/database';

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Patients',
      value: stats?.total_patients || 0,
      icon: <People />,
      color: '#1976D2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Visits Today',
      value: stats?.total_visits_today || 0,
      icon: <LocalHospital />,
      color: '#2E7D32',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Monthly Visits',
      value: stats?.total_visits_month || 0,
      icon: <TrendingUp />,
      color: '#F57C00',
      bgColor: '#fff3e0',
    },
    {
      title: 'Pending Appointments',
      value: stats?.pending_appointments || 0,
      icon: <Calendar />,
      color: '#7B1FA2',
      bgColor: '#f3e5f5',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: card.bgColor,
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {loading ? '...' : card.value.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;