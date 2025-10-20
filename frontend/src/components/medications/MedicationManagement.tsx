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
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Medication as MedicationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useTranslate } from "@refinedev/core";
import { getMockData } from "../../services/mockApi";

interface Medication {
  id: string;
  visitId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  sideEffects: string;
  contraindications: string;
}

interface MedicationManagementProps {
  onSaveMedication?: (medication: Medication) => void;
  onCancel?: () => void;
}

export const MedicationManagement: React.FC<MedicationManagementProps> = ({
  onSaveMedication,
  onCancel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [medicationData, setMedicationData] = useState<Medication>({
    id: "",
    visitId: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    sideEffects: "",
    contraindications: "",
  });

  // Get mock data
  const mockVisits = getMockData.visits();
  const mockMedications = getMockData.medications();

  const handleInputChange = (field: string, value: any) => {
    setMedicationData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSaveMedication?.(medicationData);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setMedicationData(medication);
    setIsDialogOpen(true);
  };

  const handleDelete = (medicationId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete medication:", medicationId);
  };

  const resetForm = () => {
    setMedicationData({
      id: "",
      visitId: "",
      medicationName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
      sideEffects: "",
      contraindications: "",
    });
    setEditingMedication(null);
  };

  const getVisitInfo = (visitId: string) => {
    const visit = mockVisits.find(v => v.id === visitId);
    return visit ? `${visit.visit_type} - ${new Date(visit.visit_date).toLocaleDateString()}` : "Unknown Visit";
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "success" : "default";
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircleIcon /> : <WarningIcon />;
  };

  const getMedicationTypeColor = (medicationName: string) => {
    const name = medicationName.toLowerCase();
    if (name.includes('antibiotic')) return 'error';
    if (name.includes('pain')) return 'warning';
    if (name.includes('vitamin')) return 'info';
    return 'primary';
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Medication Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage patient medications, dosages, and prescriptions.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Active Medications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          New Medication
        </Button>
      </Box>

      {/* Medications List */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medication</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Visit</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockMedications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                          <MedicationIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {medication.medication_name}
                          </Typography>
                          <Chip
                            label={medication.medication_name.split(' ')[0]}
                            size="small"
                            color={getMedicationTypeColor(medication.medication_name)}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {medication.dosage}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {medication.frequency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {medication.duration}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getVisitInfo(medication.visit_id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(medication.is_active)}
                        label={medication.is_active ? "Active" : "Inactive"}
                        size="small"
                        color={getStatusColor(medication.is_active)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(medication)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(medication.id)}
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

      {/* Add/Edit Medication Dialog */}
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
          {editingMedication ? "Edit Medication" : "New Medication"}
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3} sx={{ mt: 1 }}>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Visit</InputLabel>
                <Select
                  value={medicationData.visitId}
                  onChange={(e) => handleInputChange("visitId", e.target.value)}
                  label="Select Visit"
                >
                  {mockVisits.map((visit) => (
                    <MenuItem key={visit.id} value={visit.id}>
                      {visit.visit_type} - {new Date(visit.visit_date).toLocaleDateString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Medication Name"
                value={medicationData.medicationName}
                onChange={(e) => handleInputChange("medicationName", e.target.value)}
                placeholder="e.g., Paracetamol"
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Dosage"
                value={medicationData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
                placeholder="e.g., 500mg"
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={medicationData.frequency}
                  onChange={(e) => handleInputChange("frequency", e.target.value)}
                  label="Frequency"
                >
                  <MenuItem value="once daily">Once Daily</MenuItem>
                  <MenuItem value="twice daily">Twice Daily</MenuItem>
                  <MenuItem value="three times daily">Three Times Daily</MenuItem>
                  <MenuItem value="four times daily">Four Times Daily</MenuItem>
                  <MenuItem value="as needed">As Needed</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Duration"
                value={medicationData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 7 days"
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={medicationData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 size={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={medicationData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Instructions"
                placeholder="Specific instructions for taking the medication"
                multiline
                rows={3}
                value={medicationData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Side Effects"
                placeholder="Known side effects to watch for"
                multiline
                rows={2}
                value={medicationData.sideEffects}
                onChange={(e) => handleInputChange("sideEffects", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Contraindications"
                placeholder="Conditions or medications to avoid"
                multiline
                rows={2}
                value={medicationData.contraindications}
                onChange={(e) => handleInputChange("contraindications", e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={medicationData.isActive}
                    onChange={(e) => handleInputChange("isActive", e.target.checked)}
                  />
                }
                label="Active Medication"
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {editingMedication ? "Update" : "Create"} Medication
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
