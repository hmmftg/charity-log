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
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocalHospital as HospitalIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  license_number: string;
  experience_years: number;
  education: string;
  certifications: string;
  availability: string;
  created_at: string;
  updated_at: string;
}

interface DoctorFormData {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  license_number: string;
  experience_years: number;
  education: string;
  certifications: string;
  availability: string;
}

export const DoctorsManagementPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [doctorData, setDoctorData] = useState<DoctorFormData>({
    full_name: "",
    specialization: "",
    phone: "",
    email: "",
    license_number: "",
    experience_years: 0,
    education: "",
    certifications: "",
    availability: "",
  });

  // Get mock data
  const mockDoctors = getMockData.doctors();

  const handleInputChange = (field: string, value: any) => {
    setDoctorData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving doctor:", doctorData);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorData({
      full_name: doctor.full_name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
      license_number: doctor.license_number,
      experience_years: doctor.experience_years,
      education: doctor.education,
      certifications: doctor.certifications,
      availability: doctor.availability,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (doctorId: string) => {
    console.log("Delete doctor:", doctorId);
    // TODO: Implement delete functionality
  };

  const handleView = (doctor: Doctor) => {
    console.log("View doctor:", doctor);
    // TODO: Navigate to doctor details
  };

  const resetForm = () => {
    setDoctorData({
      full_name: "",
      specialization: "",
      phone: "",
      email: "",
      license_number: "",
      experience_years: 0,
      education: "",
      certifications: "",
      availability: "",
    });
    setEditingDoctor(null);
  };

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !filterSpecialization || doctor.specialization === filterSpecialization;
    const matchesAvailability = !filterAvailability || doctor.availability === filterAvailability;
    
    return matchesSearch && matchesSpecialization && matchesAvailability;
  });

  const paginatedDoctors = filteredDoctors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getSpecializationColor = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case 'general medicine': return 'primary';
      case 'cardiology': return 'error';
      case 'dermatology': return 'warning';
      case 'pediatrics': return 'info';
      case 'orthopedics': return 'secondary';
      default: return 'default';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'unavailable': return 'error';
      default: return 'default';
    }
  };

  const specializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Psychiatry',
    'Emergency Medicine',
    'Internal Medicine',
    'Surgery'
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Doctors Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage doctor profiles, specializations, and availability.
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search doctors..."
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
            <Grid2 size={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={filterSpecialization}
                  onChange={(e) => setFilterSpecialization(e.target.value)}
                  label="Specialization"
                >
                  <MenuItem value="">All</MenuItem>
                  {specializations.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  label="Availability"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Busy">Busy</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
              >
                Add Doctor
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Doctors Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>License</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDoctors.map((doctor) => (
                  <TableRow key={doctor.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {doctor.full_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            ID: {doctor.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={doctor.specialization}
                        size="small"
                        color={getSpecializationColor(doctor.specialization) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <PhoneIcon fontSize="small" />
                          {doctor.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <EmailIcon fontSize="small" />
                          {doctor.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {doctor.experience_years} years
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={doctor.availability}
                        size="small"
                        color={getAvailabilityColor(doctor.availability) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {doctor.license_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleView(doctor)}
                          sx={{ color: theme.palette.info.main }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(doctor)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(doctor.id)}
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
            count={filteredDoctors.length}
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

      {/* Add/Edit Doctor Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3} sx={{ mt: 1 }}>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={doctorData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={doctorData.specialization}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                  label="Specialization"
                >
                  {specializations.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={doctorData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={doctorData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="License Number"
                value={doctorData.license_number}
                onChange={(e) => handleInputChange("license_number", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                value={doctorData.experience_years}
                onChange={(e) => handleInputChange("experience_years", parseInt(e.target.value) || 0)}
                required
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Education"
                placeholder="Medical degree, university, graduation year"
                multiline
                rows={2}
                value={doctorData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Certifications"
                placeholder="Board certifications, special training, etc."
                multiline
                rows={2}
                value={doctorData.certifications}
                onChange={(e) => handleInputChange("certifications", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={doctorData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  label="Availability"
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Busy">Busy</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {editingDoctor ? "Update" : "Create"} Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
