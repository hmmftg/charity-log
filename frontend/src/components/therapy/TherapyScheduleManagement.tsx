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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

interface TherapySchedule {
  id: string;
  patientId: string;
  doctorId: string;
  therapyType: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  instructions: string;
  isActive: boolean;
  duration: number;
  sessionCount: number;
}

interface TherapyScheduleManagementProps {
  onSaveSchedule?: (schedule: TherapySchedule) => void;
  onCancel?: () => void;
}

export const TherapyScheduleManagement: React.FC<TherapyScheduleManagementProps> = ({
  onSaveSchedule,
  onCancel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<TherapySchedule | null>(null);
  const [scheduleData, setScheduleData] = useState<TherapySchedule>({
    id: "",
    patientId: "",
    doctorId: "",
    therapyType: "",
    description: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    frequency: "weekly",
    instructions: "",
    isActive: true,
    duration: 30,
    sessionCount: 4,
  });

  // Get mock data
  const mockPatients = getMockData.patients();
  const mockDoctors = getMockData.doctors();
  const mockSchedules = getMockData.therapySchedules();

  const handleInputChange = (field: string, value: any) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSaveSchedule?.(scheduleData);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (schedule: TherapySchedule) => {
    setEditingSchedule(schedule);
    setScheduleData(schedule);
    setIsDialogOpen(true);
  };

  const handleDelete = (scheduleId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete schedule:", scheduleId);
  };

  const resetForm = () => {
    setScheduleData({
      id: "",
      patientId: "",
      doctorId: "",
      therapyType: "",
      description: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      frequency: "weekly",
      instructions: "",
      isActive: true,
      duration: 30,
      sessionCount: 4,
    });
    setEditingSchedule(null);
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? patient.full_name : "Unknown Patient";
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.full_name : "Unknown Doctor";
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "success" : "default";
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircleIcon /> : <AccessTimeIcon />;
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Therapy Schedule Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage patient therapy schedules and treatment plans.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Active Therapy Schedules
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          New Schedule
        </Button>
      </Box>

      {/* Schedules List */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Therapy Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Sessions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="body2">
                          {getPatientName(schedule.patient_id)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getDoctorName(schedule.doctor_id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={schedule.therapy_type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(schedule.start_date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {schedule.frequency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {schedule.session_count}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(schedule.is_active)}
                        label={schedule.is_active ? "Active" : "Inactive"}
                        size="small"
                        color={getStatusColor(schedule.is_active)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(schedule)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(schedule.id)}
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
        </CardContent>
      </Card>

      {/* Add/Edit Schedule Dialog */}
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
          {editingSchedule ? "Edit Therapy Schedule" : "New Therapy Schedule"}
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3} sx={{ mt: 1 }}>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Patient</InputLabel>
                <Select
                  value={scheduleData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  label="Select Patient"
                >
                  {mockPatients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={scheduleData.doctorId}
                  onChange={(e) => handleInputChange("doctorId", e.target.value)}
                  label="Doctor"
                >
                  {mockDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Therapy Type</InputLabel>
                <Select
                  value={scheduleData.therapyType}
                  onChange={(e) => handleInputChange("therapyType", e.target.value)}
                  label="Therapy Type"
                >
                  <MenuItem value="Physical Therapy">Physical Therapy</MenuItem>
                  <MenuItem value="Speech Therapy">Speech Therapy</MenuItem>
                  <MenuItem value="Occupational Therapy">Occupational Therapy</MenuItem>
                  <MenuItem value="Mental Health Counseling">Mental Health Counseling</MenuItem>
                  <MenuItem value="Rehabilitation">Rehabilitation</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={scheduleData.frequency}
                  onChange={(e) => handleInputChange("frequency", e.target.value)}
                  label="Frequency"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="twice weekly">Twice Weekly</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={scheduleData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={scheduleData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={scheduleData.duration}
                onChange={(e) => handleInputChange("duration", parseInt(e.target.value))}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Session Count"
                type="number"
                value={scheduleData.sessionCount}
                onChange={(e) => handleInputChange("sessionCount", parseInt(e.target.value))}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Describe the therapy goals and approach"
                multiline
                rows={3}
                value={scheduleData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Instructions"
                placeholder="Specific instructions for the patient"
                multiline
                rows={3}
                value={scheduleData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={scheduleData.isActive}
                    onChange={(e) => handleInputChange("isActive", e.target.checked)}
                  />
                }
                label="Active Schedule"
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {editingSchedule ? "Update" : "Create"} Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
