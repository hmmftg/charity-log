import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  Fab,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  lastVisit: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

interface PatientListProps {
  patients?: Patient[];
  onPatientClick?: (patient: Patient) => void;
  onAddPatient?: () => void;
  onEditPatient?: (patient: Patient) => void;
  onDeletePatient?: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onPatientClick,
  onAddPatient,
  onEditPatient,
  onDeletePatient,
}) => {
  // Get mock data if no patients provided
  const mockPatients = React.useMemo(() => {
    if (patients) return patients;
    
    const mockData = getMockData.patients();
    return mockData.map(patient => ({
      id: patient.id,
      name: patient.full_name,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.date_of_birth,
      gender: patient.gender,
      bloodType: patient.blood_type,
      allergies: patient.allergies,
      lastVisit: patient.last_visit,
      status: patient.status,
    }));
  }, [patients]);

  const displayPatients = patients || mockPatients;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPatients = displayPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return theme.palette.success.main;
      case "pending":
        return theme.palette.warning.main;
      case "inactive":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusChip = (status: string) => {
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        sx={{
          bgcolor: getStatusColor(status),
          color: "white",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      />
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, patient: Patient) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleAction = (action: string) => {
    if (selectedPatient) {
      switch (action) {
        case "view":
          onPatientClick?.(selectedPatient);
          break;
        case "edit":
          onEditPatient?.(selectedPatient);
          break;
        case "delete":
          onDeletePatient?.(selectedPatient);
          break;
      }
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Patient Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Patient
          </Button>
        </Box>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage patient records, view medical history, and track treatment progress.
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid2>
            <Grid2 size={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status Filter"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Patients</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Patient Cards */}
      <Grid2 container spacing={3}>
        {filteredPatients.map((patient) => (
          <Grid2 size={12} md={6} lg={4} key={patient.id}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
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
              onClick={() => onPatientClick?.(patient)}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Patient Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: theme.palette.primary.main,
                        mr: 2,
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {patient.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {patient.gender} • {patient.bloodType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getStatusChip(patient.status)}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, patient);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Patient Details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {patient.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PhoneIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {patient.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {patient.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Allergies */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Allergies:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {patient.allergies.map((allergy, index) => (
                      <Chip
                        key={index}
                        label={allergy}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.75rem",
                          borderColor: theme.palette.warning.main,
                          color: theme.palette.warning.main,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 160,
          },
        }}
      >
        <MenuItem onClick={() => handleAction("view")}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction("edit")}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Patient
        </MenuItem>
        <MenuItem onClick={() => handleAction("delete")} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Patient
        </MenuItem>
      </Menu>

      {/* Add Patient Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Add New Patient
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} sx={{ mt: 1 }}>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter patient's full name"
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="Enter email address"
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                placeholder="Enter phone number"
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Address"
                placeholder="Enter full address"
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select label="Gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Blood Type</InputLabel>
                <Select label="Blood Type">
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setIsAddDialogOpen(false)}>
            Add Patient
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={() => setIsAddDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};