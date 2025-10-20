import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";
import { useNavigate } from "react-router";

interface Visit {
  id: string;
  patient_id: string;
  doctor_id: string;
  visit_type: string;
  visit_date: string;
  status: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export const VisitsListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVisitType, setFilterVisitType] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get mock data
  const mockVisits = getMockData.visits();
  const mockPatients = getMockData.patients();
  const mockDoctors = getMockData.doctors();

  const handleView = (visit: Visit) => {
    console.log("View visit:", visit);
    navigate(`/visits/show/${visit.id}`);
  };

  const handleEdit = (visit: Visit) => {
    console.log("Edit visit:", visit);
    navigate(`/visits/edit/${visit.id}`);
  };

  const handleDelete = (visitId: string) => {
    console.log("Delete visit:", visitId);
    // TODO: Implement delete functionality
  };

  const handleNewVisit = () => {
    navigate("/visits/create");
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? patient.full_name : "Unknown Patient";
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.full_name : "Unknown Doctor";
  };

  const filteredVisits = mockVisits.filter(visit => {
    const patientName = getPatientName(visit.patient_id);
    const doctorName = getDoctorName(visit.doctor_id);
    
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || visit.status === filterStatus;
    const matchesVisitType = !filterVisitType || visit.visit_type === filterVisitType;
    const matchesDoctor = !filterDoctor || visit.doctor_id === filterDoctor;
    
    return matchesSearch && matchesStatus && matchesVisitType && matchesDoctor;
  });

  const paginatedVisits = filteredVisits.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'scheduled': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircleIcon />;
      case 'in_progress': return <ScheduleIcon />;
      case 'scheduled': return <CalendarIcon />;
      case 'cancelled': return <CancelIcon />;
      default: return <CalendarIcon />;
    }
  };

  const getVisitTypeColor = (visitType: string) => {
    switch (visitType.toLowerCase()) {
      case 'general': return 'primary';
      case 'dental': return 'secondary';
      case 'emergency': return 'error';
      case 'specialist': return 'warning';
      case 'followup': return 'info';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Patient Visits
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          View and manage all patient visits, appointments, and medical records.
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid2>
            <Grid2 size={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Visit Type</InputLabel>
                <Select
                  value={filterVisitType}
                  onChange={(e) => setFilterVisitType(e.target.value)}
                  label="Visit Type"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="dental">Dental</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                  <MenuItem value="specialist">Specialist</MenuItem>
                  <MenuItem value="followup">Follow-up</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                  label="Doctor"
                >
                  <MenuItem value="">All</MenuItem>
                  {mockDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                onClick={handleNewVisit}
              >
                New Visit
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Visits Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Visit Details</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVisits.map((visit) => (
                  <TableRow key={visit.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <HospitalIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Visit #{visit.id}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {visit.diagnosis || "No diagnosis"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">
                          {getPatientName(visit.patient_id)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getDoctorName(visit.doctor_id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={visit.visit_type}
                        size="small"
                        color={getVisitTypeColor(visit.visit_type) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(visit.status)}
                        label={visit.status}
                        size="small"
                        color={getStatusColor(visit.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(visit.visit_date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleView(visit)}
                          sx={{ color: theme.palette.info.main }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(visit)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(visit.id)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredVisits.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid2 container spacing={3} sx={{ mt: 3 }}>
        <Grid2 size={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                {mockVisits.length}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Total Visits
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                {mockVisits.filter(v => v.status === 'completed').length}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                {mockVisits.filter(v => v.status === 'scheduled').length}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Scheduled
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: theme.palette.info.main, fontWeight: 700 }}>
                {mockVisits.filter(v => v.status === 'in_progress').length}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
