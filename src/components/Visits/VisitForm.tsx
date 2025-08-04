import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { supabase } from '../../lib/supabase';
import { Patient, User } from '../../types/database';

const VisitForm: React.FC = () => {
  const [patients, setPatients] = useState<(Patient & { user: User })[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<(Patient & { user: User }) | null>(null);
  const [visitType, setVisitType] = useState<'dental' | 'general' | 'therapy' | 'emergency'>('general');
  const [visitDate, setVisitDate] = useState<Dayjs>(dayjs());
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          user:users(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('visits')
        .insert([
          {
            patient_id: selectedPatient.id,
            doctor_id: userData.user.id,
            visit_type: visitType,
            visit_date: visitDate.toISOString(),
            status: 'completed',
            chief_complaint: chiefComplaint,
            diagnosis,
            treatment_plan: treatmentPlan,
            notes,
          },
        ]);

      if (error) throw error;

      // Reset form
      setSelectedPatient(null);
      setChiefComplaint('');
      setDiagnosis('');
      setTreatmentPlan('');
      setNotes('');
      setVisitDate(dayjs());

      alert('Visit logged successfully!');
    } catch (error) {
      console.error('Error logging visit:', error);
      alert('Error logging visit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const visitTypeColors = {
    general: 'primary',
    dental: 'success',
    therapy: 'warning',
    emergency: 'error',
  } as const;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Log Patient Visit
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={patients}
                  getOptionLabel={(option) => 
                    `${option.user.first_name} ${option.user.last_name} (${option.user.email})`
                  }
                  value={selectedPatient}
                  onChange={(_, newValue) => setSelectedPatient(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Patient"
                      required
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box>
                        <Typography variant="body2">
                          {option.user.first_name} {option.user.last_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.user.email}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Visit Type</InputLabel>
                  <Select
                    value={visitType}
                    label="Visit Type"
                    onChange={(e) => setVisitType(e.target.value as any)}
                  >
                    <MenuItem value="general">General Checkup</MenuItem>
                    <MenuItem value="dental">Dental Care</MenuItem>
                    <MenuItem value="therapy">Therapy Session</MenuItem>
                    <MenuItem value="emergency">Emergency</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Visit Date & Time"
                  value={visitDate}
                  onChange={(newValue) => newValue && setVisitDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
                  <Typography variant="body2" color="text.secondary">
                    Visit Type:
                  </Typography>
                  <Chip
                    label={visitType.toUpperCase()}
                    color={visitTypeColors[visitType]}
                    size="small"
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Chief Complaint"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="Patient's main concern or reason for visit..."
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Clinical diagnosis..."
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Treatment Plan"
                  value={treatmentPlan}
                  onChange={(e) => setTreatmentPlan(e.target.value)}
                  placeholder="Recommended treatment and medications..."
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional observations or notes..."
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedPatient(null);
                      setChiefComplaint('');
                      setDiagnosis('');
                      setTreatmentPlan('');
                      setNotes('');
                    }}
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !selectedPatient}
                    sx={{ bgcolor: '#1976D2' }}
                  >
                    {loading ? 'Logging Visit...' : 'Log Visit'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default VisitForm;