import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  MedicalServices as MedicalIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { ResourceProps } from "@refinedev/core";
import { PatientResources, PatientRoutes } from './patient';
import { DoctorResources, DoctorRoutes } from './doctor';
import { Route } from 'react-router';

export const DefinitionPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const managementOptions = [
    {
      title: "Patient Management",
      description: "Manage patient records, medical history, and contact information",
      icon: <PersonIcon />,
      color: theme.palette.primary.main,
      path: "/patients",
    },
    {
      title: "Doctor Management",
      description: "Manage doctor profiles, specializations, and availability",
      icon: <DoctorIcon />,
      color: theme.palette.secondary.main,
      path: "/doctors",
    },
    {
      title: "Visit Management",
      description: "View and manage all patient visits and appointments",
      icon: <MedicalIcon />,
      color: theme.palette.success.main,
      path: "/visits",
    },
    {
      title: "Therapy Schedules",
      description: "Manage therapy appointments and treatment schedules",
      icon: <GroupIcon />,
      color: theme.palette.warning.main,
      path: "/therapy-schedules",
    },
    {
      title: "Medication Management",
      description: "Track prescriptions, dosages, and medication schedules",
      icon: <SettingsIcon />,
      color: theme.palette.info.main,
      path: "/medications",
    },
  ];

  const handleOptionClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          System Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage all aspects of the healthcare system including patients, doctors, visits, and treatments.
        </Typography>
      </Box>

      {/* Management Options Grid */}
      <Grid2 container spacing={3}>
        {managementOptions.map((option, index) => (
          <Grid2 size={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => handleOptionClick(option.path)}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: option.color,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {option.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  {option.description}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Quick Stats */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          System Overview
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                  150+
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Total Patients
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}>
                  12
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Active Doctors
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                  45
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  This Month Visits
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                  8
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Active Therapies
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export function DefinitionResources(
  translate: (key: string, options?: any, defaultMessage?: string) => string
): ResourceProps[] {
  const name = "definitions"
  return [
    {
      name: name,
      meta: {
        icon: <SettingsTwoToneIcon />,
        label: translate("layout.sidebar.definitions"),
      },
    },
    ...PatientResources(translate, name), 
    ...DoctorResources(translate, name),
];
}

export function DefinitionRoutes() {
  return (
    <Route path="definitions">
      {PatientRoutes()}
      {DoctorRoutes()}
    </Route>
  );
}
