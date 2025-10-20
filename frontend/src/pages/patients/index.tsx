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
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

interface Patient {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  blood_type: string;
  allergies: string;
  medical_history: string;
  insurance_number: string;
  created_at: string;
  updated_at: string;
}

interface PatientFormData {
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  blood_type: string;
  allergies: string;
  medical_history: string;
  insurance_number: string;
}

export const PatientManagementPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patientData, setPatientData] = useState<PatientFormData>({
    full_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergency_contact: "",
    emergency_phone: "",
    blood_type: "",
    allergies: "",
    medical_history: "",
    insurance_number: "",
  });

  // Get mock data
  const mockPatients = getMockData.patients();

  const handleInputChange = (field: string, value: any) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving patient:", patientData);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setPatientData({
      full_name: patient.full_name,
      date_of_birth: patient.date_of_birth,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      emergency_contact: patient.emergency_contact,
      emergency_phone: patient.emergency_phone,
      blood_type: patient.blood_type,
      allergies: patient.allergies,
      medical_history: patient.medical_history,
      insurance_number: patient.insurance_number,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (patientId: string) => {
    console.log("Delete patient:", patientId);
    // TODO: Implement delete functionality
  };

  const handleView = (patient: Patient) => {
    console.log("View patient:", patient);
    // TODO: Navigate to patient details
  };

  const resetForm = () => {
    setPatientData({
      full_name: "",
      date_of_birth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergency_contact: "",
      emergency_phone: "",
      blood_type: "",
      allergies: "",
      medical_history: "",
      insurance_number: "",
    });
    setEditingPatient(null);
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filterGender || patient.gender === filterGender;
    const matchesBloodType = !filterBloodType || patient.blood_type === filterBloodType;
    
    return matchesSearch && matchesGender && matchesBloodType;
  });

  const paginatedPatients = filteredPatients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male': return 'primary';
      case 'female': return 'secondary';
      default: return 'default';
    }
  };

  const getBloodTypeColor = (bloodType: string) => {
    switch (bloodType) {
      case 'O+': return 'success';
      case 'A+': return 'info';
      case 'B+': return 'warning';
      case 'AB+': return 'error';
      default: return 'default';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Patient Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage patient records, medical history, and contact information.
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search patients..."
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
                <InputLabel>Gender</InputLabel>
                <Select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Blood Type</InputLabel>
                <Select
                  value={filterBloodType}
                  onChange={(e) => setFilterBloodType(e.target.value)}
                  label="Blood Type"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
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
                Add Patient
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Type</TableCell>
                  <TableCell>Emergency Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPatients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {patient.full_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            ID: {patient.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <PhoneIcon fontSize="small" />
                          {patient.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <EmailIcon fontSize="small" />
                          {patient.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {calculateAge(patient.date_of_birth)} years
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.gender}
                        size="small"
                        color={getGenderColor(patient.gender) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.blood_type}
                        size="small"
                        color={getBloodTypeColor(patient.blood_type) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {patient.emergency_contact}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {patient.emergency_phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleView(patient)}
                          sx={{ color: theme.palette.info.main }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(patient)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(patient.id)}
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
            count={filteredPatients.length}
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

      {/* Add/Edit Patient Dialog */}
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
          {editingPatient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3} sx={{ mt: 1 }}>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={patientData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={patientData.date_of_birth}
                onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={patientData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={patientData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={patientData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Blood Type</InputLabel>
                <Select
                  value={patientData.blood_type}
                  onChange={(e) => handleInputChange("blood_type", e.target.value)}
                  label="Blood Type"
                >
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={patientData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                value={patientData.emergency_contact}
                onChange={(e) => handleInputChange("emergency_contact", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact Phone"
                value={patientData.emergency_phone}
                onChange={(e) => handleInputChange("emergency_phone", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Allergies"
                placeholder="List any known allergies"
                multiline
                rows={2}
                value={patientData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Medical History"
                placeholder="Previous medical conditions, surgeries, etc."
                multiline
                rows={3}
                value={patientData.medical_history}
                onChange={(e) => handleInputChange("medical_history", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Insurance Number"
                value={patientData.insurance_number}
                onChange={(e) => handleInputChange("insurance_number", e.target.value)}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {editingPatient ? "Update" : "Create"} Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};