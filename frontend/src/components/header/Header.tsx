import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalHospital as HospitalIcon,
  Schedule as ScheduleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { useTranslate, useGetIdentity, useLogout } from "@refinedev/core";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title = "Healthcare Management System",
  onMenuClick,
  onThemeToggle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: user } = useGetIdentity();
  const { mutate: logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Default user if not logged in
  const currentUser = user || {
    name: "Demo User",
    role: "Guest",
    avatar: "https://i.pravatar.cc/300",
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "administrator":
      case "admin":
        return theme.palette.error.main;
      case "doctor":
        return theme.palette.primary.main;
      case "nurse":
        return theme.palette.success.main;
      case "patient":
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Patients", icon: <PeopleIcon />, path: "/patients" },
    { label: "Visits", icon: <HospitalIcon />, path: "/visits" },
    { label: "Schedule", icon: <ScheduleIcon />, path: "/schedule" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const notifications = [
    { id: 1, message: "New patient registration", time: "2 min ago", type: "info" },
    { id: 2, message: "Lab results ready for review", time: "15 min ago", type: "warning" },
    { id: 3, message: "Appointment reminder", time: "1 hour ago", type: "info" },
    { id: 4, message: "System maintenance scheduled", time: "2 hours ago", type: "error" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark' 
            ? "linear-gradient(135deg, rgba(26, 31, 46, 0.98) 0%, rgba(30, 35, 50, 0.98) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={isMobile ? handleMobileMenuToggle : onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              color: theme.palette.text.primary,
            }}
          >
            {isMobile ? "Healthcare" : title}
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
              {menuItems.slice(0, 4).map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  variant="outlined"
                  size="small"
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-out",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Theme Toggle */}
          <IconButton
            color="inherit"
            onClick={onThemeToggle}
            sx={{ mr: 1 }}
          >
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationsToggle}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={currentUser.role}
              size="small"
              sx={{
                bgcolor: getRoleColor(currentUser.role),
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                src={currentUser.avatar}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                  fontSize: "0.875rem",
                }}
              >
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 280,
            background: theme.palette.mode === 'dark' 
              ? "linear-gradient(135deg, rgba(26, 31, 46, 0.98) 0%, rgba(30, 35, 50, 0.98) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Healthcare System
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {currentUser.name}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {currentUser.role}
          </Typography>
        </Box>
        <MenuItem onClick={handleMenuClose}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SettingsIcon sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsOpen ? document.querySelector('[aria-label="notifications"]') as HTMLElement : null}
        open={notificationsOpen}
        onClose={handleNotificationsToggle}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 320,
            maxHeight: 400,
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={handleNotificationsToggle}
            sx={{
              py: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {notification.message}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
