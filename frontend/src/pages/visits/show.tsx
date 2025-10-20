import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  Chip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  Medication as MedicationIcon,
  Description as DescriptionIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router";
import { getMockData } from "../../services/mockApi";

export const VisitDetailsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get mock data
  const mockVisits = getMockData.visits();
  const mockPatients = getMockData.patients();
  const mockDoctors = getMockData.doctors();
  const mockMedications = getMockData.medications();

  const visit = mockVisits.find(v => v.id === id);
  
  if (!visit) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Visit not found
        </Alert>
      </Box>
    );
  }

  const patient = mockPatients.find(p => p.id === visit.patient_id);
  const doctor = mockDoctors.find(d => d.id === visit.doctor_id);
  const visitMedications = mockMedications.filter(m => m.visit_id === visit.id);

  const handleEdit = () => {
    navigate(`/visits/edit/${visit.id}`);
  };

  const handleDelete = () => {
    console.log("Delete visit:", visit.id);
    // TODO: Implement delete functionality
  };

  const handlePrint = () => {
    window.print();
  };

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Visit Details
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Visit #{visit.id} - {formatDate(visit.visit_date)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={handlePrint} sx={{ color: theme.palette.info.main }}>
            <PrintIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.info.main }}>
            <ShareIcon />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid2 container spacing={3}>
        {/* Visit Information */}
        <Grid2 size={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Visit Information
              </Typography>
              <Grid2 container spacing={3}>
                <Grid2 size={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <HospitalIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Visit #{visit.id}
                      </Typography>
                      <Chip
                        label={visit.visit_type}
                        size="small"
                        color={getVisitTypeColor(visit.visit_type) as any}
                      />
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 size={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <CalendarIcon sx={{ color: theme.palette.text.secondary }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Visit Date & Time
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(visit.visit_date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 size={12}>
                  <Chip
                    icon={getStatusIcon(visit.status)}
                    label={visit.status}
                    color={getStatusColor(visit.status) as any}
                    sx={{ mb: 2 }}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Medical Information
              </Typography>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Diagnosis
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {visit.diagnosis || "No diagnosis recorded"}
                  </Typography>
                </Grid2>
                <Grid2 size={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Treatment
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {visit.treatment || "No treatment recorded"}
                  </Typography>
                </Grid2>
                <Grid2 size={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Notes
                  </Typography>
                  <Typography variant="body1">
                    {visit.notes || "No additional notes"}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          {/* Medications */}
          {visitMedications.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Prescribed Medications
                </Typography>
                <List>
                  {visitMedications.map((medication) => (
                    <ListItem key={medication.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <MedicationIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={medication.medication_name}
                        secondary={`${medication.dosage} • ${medication.frequency} • ${medication.duration}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid2>

        {/* Patient & Doctor Information */}
        <Grid2 size={12} md={4}>
          {/* Patient Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Patient Information
              </Typography>
              {patient ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
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
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Phone"
                        secondary={patient.phone}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Email"
                        secondary={patient.email}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Blood Type"
                        secondary={patient.blood_type}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Emergency Contact"
                        secondary={`${patient.emergency_contact} - ${patient.emergency_phone}`}
                      />
                    </ListItem>
                  </List>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Patient information not available
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Doctor Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Doctor Information
              </Typography>
              {doctor ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {doctor.full_name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {doctor.specialization}
                      </Typography>
                    </Box>
                  </Box>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Phone"
                        secondary={doctor.phone}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Email"
                        secondary={doctor.email}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="License Number"
                        secondary={doctor.license_number}
                      />
                    </ListItem>
                  </List>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Doctor information not available
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Visit Timeline */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Visit Timeline
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Visit Created"
                    secondary={formatDate(visit.created_at)}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Last Updated"
                    secondary={formatDate(visit.updated_at)}
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
