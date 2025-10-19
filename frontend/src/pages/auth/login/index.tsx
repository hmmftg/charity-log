import React from "react";
import { AuthPage, useLogin } from "@refinedev/core";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  LocalHospital as DoctorIcon,
  AccountCircle as PatientIcon,
} from "@mui/icons-material";
import { getDemoAccounts } from "../../../providers/ums/authProvider";

export const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mutate: login } = useLogin();

  // Get demo accounts from auth provider
  const demoAccounts = getDemoAccounts();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Administrator":
        return <AdminIcon />;
      case "Doctor":
        return <DoctorIcon />;
      case "Nurse":
        return <PersonIcon />;
      case "Patient":
        return <PatientIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator":
        return "error" as const;
      case "Doctor":
        return "primary" as const;
      case "Nurse":
        return "success" as const;
      case "Patient":
        return "info" as const;
      default:
        return "default" as const;
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    // Use the actual login function from Refine
    login({
      email,
      password,
    });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      p: 2
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: 1200,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 3,
        alignItems: 'center'
      }}>
        {/* Demo Accounts Card */}
        <Card sx={{ 
          width: isMobile ? '100%' : '50%',
          maxWidth: 500,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(26, 31, 46, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                🏥 Charity Clinic Demo
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Healthcare Management System
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                <AlertTitle>Demo Mode</AlertTitle>
                Use any of the demo accounts below to explore the system. No real authentication required.
              </Alert>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Demo Accounts
            </Typography>

            {demoAccounts.map((account, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 16px rgba(0, 0, 0, 0.3)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mr: 2,
                      color: theme.palette[getRoleColor(account.role)].main 
                    }}>
                      {getRoleIcon(account.role)}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {account.role}
                    </Typography>
                    <Chip 
                      label={account.role} 
                      size="small" 
                      color={getRoleColor(account.role)}
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {account.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Email: <code style={{ 
                        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>{account.email}</code>
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Password: <code style={{ 
                        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>{account.password}</code>
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color={getRoleColor(account.role)}
                    fullWidth
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                  >
                    Login as {account.role}
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Or use the login form on the right to enter credentials manually
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                This is a demonstration system for charity stakeholders
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Box sx={{ width: isMobile ? '100%' : '50%', maxWidth: 400 }}>
          <AuthPage
            type="login"
            initialValues={{
              email: demoAccounts[0]?.email || "admin@charity-clinic.org",
              password: demoAccounts[0]?.password || "123"
            }}
            title={
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Enter your credentials below
                </Typography>
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
