import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  People as PeopleIcon,
  LocalHospital as HospitalIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Medication as MedicationIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTranslate, useGetIdentity } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

// Admin Dashboard - Full system access
export const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: user } = useGetIdentity();

  const adminStats = [
    {
      title: "Total Patients",
      value: "1,247",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Doctors",
      value: "23",
      icon: <HospitalIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      change: "+3%",
      trend: "up",
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      change: "+8%",
      trend: "up",
    },
    {
      title: "System Alerts",
      value: "3",
      icon: <WarningIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.error.main,
      change: "-1",
      trend: "down",
    },
  ];

  const adminActions = [
    {
      title: "Manage Users",
      description: "Add/edit doctors, nurses, and staff",
      icon: <SecurityIcon />,
      color: theme.palette.error.main,
      action: "manage-users",
    },
    {
      title: "System Settings",
      description: "Configure clinic settings",
      icon: <SettingsIcon />,
      color: theme.palette.grey[600],
      action: "system-settings",
    },
    {
      title: "Generate Reports",
      description: "Financial and operational reports",
      icon: <AssessmentIcon />,
      color: theme.palette.info.main,
      action: "generate-reports",
    },
    {
      title: "Backup System",
      description: "Data backup and recovery",
      icon: <AssignmentIcon />,
      color: theme.palette.warning.main,
      action: "backup-system",
    },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          🏥 Administrator Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Welcome back, {user?.name}! Full system access and management controls.
        </Typography>
      </Box>

      {/* Admin Stats */}
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
        {adminStats.map((stat, index) => (
          <Grid2 size={isMobile ? 12 : 6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: theme.palette.mode === 'dark' 
                  ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.palette.mode === 'dark' 
                    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                    : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      boxShadow: `0 4px 12px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.trend === "up" ? "success" : "error"}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Admin Actions */}
      <Grid2 container spacing={3}>
        <Grid2 size={12} md={8}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                System Management
              </Typography>
              <Grid2 container spacing={2}>
                {adminActions.map((action, index) => (
                  <Grid2 size={isMobile ? 12 : 6} key={index}>
                    <Card
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        background: theme.palette.mode === 'dark' 
                          ? "rgba(255, 255, 255, 0.02)"
                          : "rgba(0, 0, 0, 0.02)",
                        border: `1px solid ${theme.palette.divider}`,
                        transition: "all 0.2s ease-out",
                        "&:hover": {
                          background: theme.palette.mode === 'dark' 
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: action.color,
                            width: 40,
                            height: 40,
                            mr: 2,
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {action.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {action.description}
                      </Typography>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={4}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                System Alerts
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <WarningIcon sx={{ color: theme.palette.error.main }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Database Backup Required"
                    secondary="Last backup: 2 days ago"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <NotificationsIcon sx={{ color: theme.palette.warning.main }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="3 Pending User Approvals"
                    secondary="New staff registrations"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="System Health: Good"
                    secondary="All services running"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

// Doctor Dashboard - Medical workflow focus
export const DoctorDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: user } = useGetIdentity();

  const doctorStats = [
    {
      title: "Today's Patients",
      value: "12",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
      change: "+2",
      trend: "up",
    },
    {
      title: "Completed Visits",
      value: "8",
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      change: "+1",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: "4",
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      change: "-1",
      trend: "down",
    },
    {
      title: "Prescriptions",
      value: "15",
      icon: <MedicationIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.info.main,
      change: "+3",
      trend: "up",
    },
  ];

  const todaySchedule = [
    { time: "09:00", patient: "Maria Garcia", type: "Follow-up", status: "completed" },
    { time: "10:30", patient: "James Wilson", type: "New Patient", status: "completed" },
    { time: "11:15", patient: "Anna Smith", type: "Consultation", status: "in-progress" },
    { time: "14:00", patient: "John Doe", type: "Check-up", status: "scheduled" },
    { time: "15:30", patient: "Sarah Johnson", type: "Follow-up", status: "scheduled" },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          👨‍⚕️ Doctor Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Welcome, {user?.name}! Your medical workflow and patient management center.
        </Typography>
      </Box>

      {/* Doctor Stats */}
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
        {doctorStats.map((stat, index) => (
          <Grid2 size={isMobile ? 12 : 6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: theme.palette.mode === 'dark' 
                  ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.palette.mode === 'dark' 
                    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                    : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      boxShadow: `0 4px 12px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.trend === "up" ? "success" : "error"}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Today's Schedule */}
      <Grid2 container spacing={3}>
        <Grid2 size={12} md={8}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Schedule
              </Typography>
              <List>
                {todaySchedule.map((appointment, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <ListItemIcon>
                      <CalendarIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {appointment.time} - {appointment.patient}
                          </Typography>
                          <Chip
                            label={appointment.status}
                            size="small"
                            color={
                              appointment.status === "completed" ? "success" :
                              appointment.status === "in-progress" ? "warning" : "default"
                            }
                          />
                        </Box>
                      }
                      secondary={appointment.type}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={4}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  New Patient Visit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MedicationIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Write Prescription
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Review Lab Results
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

// Nurse Dashboard - Patient care focus
export const NurseDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: user } = useGetIdentity();

  const nurseStats = [
    {
      title: "Patients Assigned",
      value: "18",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      change: "+2",
      trend: "up",
    },
    {
      title: "Vital Signs Taken",
      value: "24",
      icon: <AssignmentIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
      change: "+5",
      trend: "up",
    },
    {
      title: "Medications Given",
      value: "12",
      icon: <MedicationIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.info.main,
      change: "+3",
      trend: "up",
    },
    {
      title: "Alerts",
      value: "2",
      icon: <WarningIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.error.main,
      change: "-1",
      trend: "down",
    },
  ];

  const patientTasks = [
    { patient: "Maria Garcia", task: "Blood pressure check", time: "10:00", priority: "high" },
    { patient: "James Wilson", task: "Medication administration", time: "10:30", priority: "medium" },
    { patient: "Anna Smith", task: "Temperature monitoring", time: "11:00", priority: "low" },
    { patient: "John Doe", task: "Wound dressing change", time: "11:30", priority: "high" },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          👩‍⚕️ Nurse Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Welcome, {user?.name}! Your patient care and monitoring center.
        </Typography>
      </Box>

      {/* Nurse Stats */}
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
        {nurseStats.map((stat, index) => (
          <Grid2 size={isMobile ? 12 : 6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: theme.palette.mode === 'dark' 
                  ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.palette.mode === 'dark' 
                    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                    : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      boxShadow: `0 4px 12px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.trend === "up" ? "success" : "error"}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Patient Tasks */}
      <Grid2 container spacing={3}>
        <Grid2 size={12} md={8}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Patient Tasks
              </Typography>
              <List>
                {patientTasks.map((task, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <ListItemIcon>
                      <AssignmentIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {task.patient} - {task.task}
                          </Typography>
                          <Chip
                            label={task.priority}
                            size="small"
                            color={
                              task.priority === "high" ? "error" :
                              task.priority === "medium" ? "warning" : "success"
                            }
                          />
                        </Box>
                      }
                      secondary={`Scheduled: ${task.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={4}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AssignmentIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Record Vital Signs
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MedicationIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Administer Medication
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Update Patient Notes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

// Patient Dashboard - Personal records focus
export const PatientDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: user } = useGetIdentity();

  const patientStats = [
    {
      title: "Upcoming Appointments",
      value: "2",
      icon: <CalendarIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
      change: "+1",
      trend: "up",
    },
    {
      title: "Active Medications",
      value: "3",
      icon: <MedicationIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.info.main,
      change: "0",
      trend: "neutral",
    },
    {
      title: "Recent Visits",
      value: "5",
      icon: <HospitalIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      change: "+1",
      trend: "up",
    },
    {
      title: "Lab Results",
      value: "2",
      icon: <AssessmentIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      change: "New",
      trend: "up",
    },
  ];

  const upcomingAppointments = [
    { date: "2024-01-25", time: "10:00", doctor: "Dr. Sarah Johnson", type: "Follow-up" },
    { date: "2024-01-30", time: "14:30", doctor: "Dr. Michael Brown", type: "Check-up" },
  ];

  const currentMedications = [
    { name: "Metformin 500mg", dosage: "Twice daily", nextRefill: "2024-02-15" },
    { name: "Lisinopril 10mg", dosage: "Once daily", nextRefill: "2024-02-20" },
    { name: "Vitamin D3", dosage: "Once daily", nextRefill: "2024-03-01" },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          👤 Patient Portal
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Welcome, {user?.name}! Your personal health information and appointments.
        </Typography>
      </Box>

      {/* Patient Stats */}
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
        {patientStats.map((stat, index) => (
          <Grid2 size={isMobile ? 12 : 6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: theme.palette.mode === 'dark' 
                  ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.palette.mode === 'dark' 
                    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                    : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      boxShadow: `0 4px 12px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.trend === "up" ? "success" : stat.trend === "neutral" ? "default" : "error"}
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Patient Information */}
      <Grid2 container spacing={3}>
        <Grid2 size={12} md={6}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Upcoming Appointments
              </Typography>
              <List>
                {upcomingAppointments.map((appointment, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <ListItemIcon>
                      <CalendarIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${appointment.date} at ${appointment.time}`}
                      secondary={`${appointment.doctor} - ${appointment.type}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={6}>
          <Card
            sx={{
              height: "100%",
              background: theme.palette.mode === 'dark' 
                ? "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(30, 35, 50, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Current Medications
              </Typography>
              <List>
                {currentMedications.map((medication, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <ListItemIcon>
                      <MedicationIcon sx={{ color: theme.palette.info.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={medication.name}
                      secondary={`${medication.dosage} • Next refill: ${medication.nextRefill}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
