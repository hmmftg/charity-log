import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard,
  People,
  LocalHospital,
  Calendar,
  Description,
  Analytics,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileToggle }) => {
  const { userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const commonItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ];

    const roleSpecificItems = {
      admin: [
        { text: 'Patients', icon: <People />, path: '/patients' },
        { text: 'Visits', icon: <LocalHospital />, path: '/visits' },
        { text: 'Appointments', icon: <Calendar />, path: '/appointments' },
        { text: 'Medical Records', icon: <Description />, path: '/records' },
        { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
      ],
      doctor: [
        { text: 'My Patients', icon: <People />, path: '/patients' },
        { text: 'Today\'s Visits', icon: <LocalHospital />, path: '/visits' },
        { text: 'Appointments', icon: <Calendar />, path: '/appointments' },
        { text: 'Medical Records', icon: <Description />, path: '/records' },
      ],
      patient: [
        { text: 'My Appointments', icon: <Calendar />, path: '/appointments' },
        { text: 'My Records', icon: <Description />, path: '/records' },
        { text: 'Therapy Schedule', icon: <LocalHospital />, path: '/therapy' },
      ],
    };

    return [
      ...commonItems,
      ...(userProfile?.role ? roleSpecificItems[userProfile.role] || [] : []),
    ];
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileToggle();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalHospital sx={{ color: '#1976D2', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2' }}>
            CareClinic
          </Typography>
        </Box>
      </Toolbar>
      
      <Divider />
      
      {userProfile && (
        <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="subtitle2" color="text.secondary">
            {userProfile.role.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {userProfile.first_name} {userProfile.last_name}
          </Typography>
        </Box>
      )}
      
      <Divider />
      
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: '#e3f2fd',
                  '&:hover': { bgcolor: '#e3f2fd' },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#1976D2' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  color: location.pathname === item.path ? '#1976D2' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut} sx={{ mx: 1, borderRadius: 1 }}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;