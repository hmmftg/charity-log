"use client"

import type React from "react"
import { useState } from "react"
import { useCreate, useList, useGetIdentity } from "@refinedev/core"
import { useRouter } from "next/navigation"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material"

export default function CreateTherapySchedule() {
  const router = useRouter()
  const { mutate: createSchedule, isLoading } = useCreate()
  const { data: identity } = useGetIdentity()

  const { data: patientsData } = useList({
    resource: "patients",
    pagination: { mode: "off" },
  })

  const { data: doctorsData } = useList({
    resource: "doctors",
    pagination: { mode: "off" },
  })

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    therapy_type: "",
    description: "",
    start_date: "",
    end_date: "",
    frequency: "daily",
    instructions: "",
    is_active: true,
  })

  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.patient_id || !formData.doctor_id || !formData.therapy_type) {
      setError("Please fill in all required fields")
      return
    }

    try {
      createSchedule(
        {
          resource: "therapy_schedules",
          values: {
            ...formData,
            end_date: formData.end_date || null,
          },
        },
        {
          onSuccess: () => {
            router.push("/therapy-schedules")
          },
          onError: (error) => {
            setError("Failed to create therapy schedule. Please try again.")
            console.error(error)
          },
        },
      )
    } catch (err) {
      setError("An unexpected error occurred")
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Create Therapy Schedule
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Patient Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Patient</InputLabel>
                  <Select
                    value={formData.patient_id}
                    onChange={(e) => handleInputChange("patient_id", e.target.value)}
                    label="Patient"
                  >
                    {patientsData?.data?.map((patient: any) => (
                      <MenuItem key={patient.id} value={patient.id}>
                        {patient.patient_id} - {patient.profiles?.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Doctor Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Doctor</InputLabel>
                  <Select
                    value={formData.doctor_id}
                    onChange={(e) => handleInputChange("doctor_id", e.target.value)}
                    label="Doctor"
                  >
                    {doctorsData?.data?.map((doctor: any) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.profiles?.full_name} - {doctor.specialization}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Therapy Type */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Therapy Type"
                  value={formData.therapy_type}
                  onChange={(e) => handleInputChange("therapy_type", e.target.value)}
                  placeholder="e.g., Physical Therapy, Medication, Diet Plan"
                />
              </Grid>

              {/* Frequency */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={formData.frequency}
                    onChange={(e) => handleInputChange("frequency", e.target.value)}
                    label="Frequency"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="twice_daily">Twice Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="twice_weekly">Twice Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="as_needed">As Needed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Start Date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Date (Optional)"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange("end_date", e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  multiline
                  rows={3}
                  placeholder="Brief description of the therapy"
                />
              </Grid>

              {/* Instructions */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instructions"
                  value={formData.instructions}
                  onChange={(e) => handleInputChange("instructions", e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Detailed instructions for the patient"
                />
              </Grid>

              {/* Active Status */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) => handleInputChange("is_active", e.target.checked)}
                    />
                  }
                  label="Active Schedule"
                />
              </Grid>

              {/* Submit Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => router.push("/therapy-schedules")} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                  >
                    {isLoading ? "Creating..." : "Create Schedule"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
