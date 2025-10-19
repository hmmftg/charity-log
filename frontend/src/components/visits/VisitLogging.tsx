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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Fab,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  Medication as MedicationIcon,
  CameraAlt as CameraIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";

interface VisitFormData {
  patientId: string;
  doctorId: string;
  visitType: string;
  visitDate: string;
  chiefComplaint: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  notes: string;
  followUpDate: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
  };
}

interface VisitLoggingProps {
  onSaveVisit?: (visitData: VisitFormData) => void;
  onCancel?: () => void;
}

export const VisitLogging: React.FC<VisitLoggingProps> = ({
  onSaveVisit,
  onCancel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [visitData, setVisitData] = useState<VisitFormData>({
    patientId: "",
    doctorId: "",
    visitType: "",
    visitDate: new Date().toISOString().split('T')[0],
    chiefComplaint: "",
    symptoms: "",
    diagnosis: "",
    treatmentPlan: "",
    medications: [],
    notes: "",
    followUpDate: "",
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
    },
  });

  const [isMedicationDialogOpen, setIsMedicationDialogOpen] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  const steps = [
    "Patient & Visit Info",
    "Symptoms & Diagnosis",
    "Treatment & Medications",
    "Vital Signs & Notes",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    onSaveVisit?.(visitData);
  };

  const handleInputChange = (field: string, value: any) => {
    setVisitData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVitalSignChange = (field: string, value: string) => {
    setVisitData(prev => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [field]: value,
      },
    }));
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setVisitData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication],
      }));
      setNewMedication({ name: "", dosage: "", frequency: "", duration: "" });
      setIsMedicationDialogOpen(false);
    }
  };

  const removeMedication = (index: number) => {
    setVisitData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid2 container spacing={3}>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Patient</InputLabel>
                <Select
                  value={visitData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  label="Select Patient"
                >
                  <MenuItem value="1">Maria Garcia</MenuItem>
                  <MenuItem value="2">James Wilson</MenuItem>
                  <MenuItem value="3">Anna Smith</MenuItem>
                  <MenuItem value="4">John Doe</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={visitData.doctorId}
                  onChange={(e) => handleInputChange("doctorId", e.target.value)}
                  label="Doctor"
                >
                  <MenuItem value="1">Dr. Sarah Johnson</MenuItem>
                  <MenuItem value="2">Dr. Michael Brown</MenuItem>
                  <MenuItem value="3">Dr. Emily Davis</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Visit Type</InputLabel>
                <Select
                  value={visitData.visitType}
                  onChange={(e) => handleInputChange("visitType", e.target.value)}
                  label="Visit Type"
                >
                  <MenuItem value="general">General Consultation</MenuItem>
                  <MenuItem value="dentistry">Dental Care</MenuItem>
                  <MenuItem value="specialist">Specialist Consultation</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                  <MenuItem value="followup">Follow-up</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Visit Date"
                type="datetime-local"
                value={visitData.visitDate}
                onChange={(e) => handleInputChange("visitDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Chief Complaint"
                placeholder="Primary reason for the visit"
                multiline
                rows={3}
                value={visitData.chiefComplaint}
                onChange={(e) => handleInputChange("chiefComplaint", e.target.value)}
              />
            </Grid2>
          </Grid2>
        );

      case 1:
        return (
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Symptoms"
                placeholder="Describe the patient's symptoms"
                multiline
                rows={4}
                value={visitData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                placeholder="Medical diagnosis"
                multiline
                rows={3}
                value={visitData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Treatment Plan"
                placeholder="Recommended treatment plan"
                multiline
                rows={4}
                value={visitData.treatmentPlan}
                onChange={(e) => handleInputChange("treatmentPlan", e.target.value)}
              />
            </Grid2>
          </Grid2>
        );

      case 2:
        return (
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Prescribed Medications</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setIsMedicationDialogOpen(true)}
                >
                  Add Medication
                </Button>
              </Box>
              
              {visitData.medications.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: "center", bgcolor: theme.palette.background.paper }}>
                  <MedicationIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    No medications prescribed yet
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {visitData.medications.map((med, index) => (
                    <Card key={index} sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {med.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {med.dosage} • {med.frequency} • {med.duration}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => removeMedication(index)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                </Box>
              )}
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Follow-up Date"
                type="date"
                value={visitData.followUpDate}
                onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
          </Grid2>
        );

      case 3:
        return (
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Vital Signs
              </Typography>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Blood Pressure"
                placeholder="e.g., 120/80"
                value={visitData.vitalSigns.bloodPressure}
                onChange={(e) => handleVitalSignChange("bloodPressure", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Heart Rate"
                placeholder="e.g., 72 bpm"
                value={visitData.vitalSigns.heartRate}
                onChange={(e) => handleVitalSignChange("heartRate", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Temperature"
                placeholder="e.g., 98.6°F"
                value={visitData.vitalSigns.temperature}
                onChange={(e) => handleVitalSignChange("temperature", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Weight"
                placeholder="e.g., 70 kg"
                value={visitData.vitalSigns.weight}
                onChange={(e) => handleVitalSignChange("weight", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Height"
                placeholder="e.g., 170 cm"
                value={visitData.vitalSigns.height}
                onChange={(e) => handleVitalSignChange("height", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <Divider sx={{ my: 2 }} />
              <TextField
                fullWidth
                label="Additional Notes"
                placeholder="Any additional observations or notes"
                multiline
                rows={4}
                value={visitData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </Grid2>
          </Grid2>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Log Patient Visit
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Record patient visit details, diagnosis, and treatment information.
        </Typography>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                {isMobile && (
                  <StepContent>
                    <Box sx={{ mt: 2 }}>
                      {renderStepContent(index)}
                    </Box>
                  </StepContent>
                )}
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content for Desktop */}
      {!isMobile && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            {renderStepContent(activeStep)}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<CancelIcon />}
        >
          Back
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save Visit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Add Medication Dialog */}
      <Dialog
        open={isMedicationDialogOpen}
        onClose={() => setIsMedicationDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>Add Medication</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} sx={{ mt: 1 }}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Medication Name"
                value={newMedication.name}
                onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Dosage"
                placeholder="e.g., 500mg"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Frequency"
                placeholder="e.g., Twice daily"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Duration"
                placeholder="e.g., 7 days"
                value={newMedication.duration}
                onChange={(e) => setNewMedication(prev => ({ ...prev, duration: e.target.value }))}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsMedicationDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={addMedication}>
            Add Medication
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
