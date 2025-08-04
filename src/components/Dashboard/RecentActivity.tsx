import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Chip,
} from '@mui/material';
import {
  Person,
  LocalHospital,
  Calendar,
  Description,
} from '@mui/icons-material';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'visit',
      title: 'Patient Visit Completed',
      subtitle: 'John Doe - General Checkup',
      time: '10 minutes ago',
      icon: <LocalHospital />,
      color: '#2E7D32',
    },
    {
      id: 2,
      type: 'appointment',
      title: 'New Appointment Scheduled',
      subtitle: 'Jane Smith - Dental Cleaning',
      time: '1 hour ago',
      icon: <Calendar />,
      color: '#1976D2',
    },
    {
      id: 3,
      type: 'record',
      title: 'Medical Record Updated',
      subtitle: 'Lab results added for Patient #1234',
      time: '2 hours ago',
      icon: <Description />,
      color: '#F57C00',
    },
    {
      id: 4,
      type: 'patient',
      title: 'New Patient Registered',
      subtitle: 'Mike Johnson - Emergency Contact',
      time: '3 hours ago',
      icon: <Person />,
      color: '#7B1FA2',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        
        <List disablePadding>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              sx={{
                px: 0,
                borderBottom: index < activities.length - 1 ? '1px solid #f0f0f0' : 'none',
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: `${activity.color}20`, color: activity.color }}>
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {activity.title}
                    </Typography>
                    <Chip
                      label={activity.type}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: `${activity.color}10`,
                        color: activity.color,
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {activity.subtitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;