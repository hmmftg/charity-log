import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AppLayout from '../components/Layout/AppLayout';
import StatsCards from '../components/Dashboard/StatsCards';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { DashboardStats } from '../types/database';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch basic stats (mock data for now)
      const mockStats: DashboardStats = {
        total_patients: 147,
        total_visits_today: 8,
        total_visits_month: 234,
        pending_appointments: 12,
        completed_treatments: 89,
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardTitle = () => {
    if (!userProfile) return 'Dashboard';
    
    switch (userProfile.role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'doctor':
        return 'Clinical Dashboard';
      case 'patient':
        return 'Patient Portal';
      default:
        return 'Dashboard';
    }
  };

  const getWelcomeMessage = () => {
    if (!userProfile) return '';
    
    const timeOfDay = new Date().getHours() < 12 ? 'Good morning' : 
                     new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
    
    return `${timeOfDay}, ${userProfile.first_name}! Here's your clinic overview.`;
  };

  return (
    <AppLayout title={getDashboardTitle()}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {getDashboardTitle()}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {getWelcomeMessage()}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatsCards stats={stats} loading={loading} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>

        <Grid item xs={12} lg={4}>
          {/* Quick Actions or Additional Stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Add more dashboard widgets here */}
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default Dashboard;