"use client"

import type React from "react"
import { useState } from "react"
import { useCreate, useList } from "@refinedev/core"
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
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { CloudUpload } from "@mui/icons-material"

export default function CreateVisit() {
  const router = useRouter()
  const { mutate: createVisit, isLoading } = useCreate()

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
    visit_type: "general",
    visit_date: new Date(),
    status: "scheduled",
    chief_complaint: "",
    symptoms: "",
    diagnosis: "",
    treatment_plan: "",
    medications_prescribed: "",
    notes: "",
    follow_up_date: "",
  })

  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.patient_id || !formData.doctor_id) {
      setError("Please select both patient and doctor")
      return
    }

    try {
      createVisit(
        {
          resource: "visits",
          values: {
            ...formData,
            visit_date: formData.visit_date.toISOString(),
            follow_up_date: formData.follow_up_date || null,
          },
        },
        {
          onSuccess: (data) => {
            // TODO: Upload images if any
            router.push("/visits")
          },
          onError: (error) => {
            setError("Failed to create visit. Please try again.")
            console.error(error)
          },
        },
      )
    } catch (err) {
      setError("An unexpected error occurred")
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Create New Visit
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

                {/* Visit Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Visit Type</InputLabel>
                    <Select
                      value={formData.visit_type}
                      onChange={(e) => handleInputChange("visit_type", e.target.value)}
                      label="Visit Type"
                    >
                      <MenuItem value="general">General</MenuItem>
                      <MenuItem value="dentistry">Dentistry</MenuItem>
                      <MenuItem value="specialist">Specialist</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Visit Date */}
                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Visit Date & Time"
                    value={formData.visit_date}
                    onChange={(date) => handleInputChange("visit_date", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                      },
                    }}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Chief Complaint */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Chief Complaint"
                    value={formData.chief_complaint}
                    onChange={(e) => handleInputChange("chief_complaint", e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>

                {/* Symptoms */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Symptoms"
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>

                {/* Diagnosis */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>

                {/* Treatment Plan */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment Plan"
                    value={formData.treatment_plan}
                    onChange={(e) => handleInputChange("treatment_plan", e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>

                {/* Medications */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medications Prescribed"
                    value={formData.medications_prescribed}
                    onChange={(e) => handleInputChange("medications_prescribed", e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>

                {/* Notes */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>

                {/* Follow-up Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Follow-up Date"
                    type="date"
                    value={formData.follow_up_date}
                    onChange={(e) => handleInputChange("follow_up_date", e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ mb: 2 }}>
                    Upload Images
                    <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                  </Button>
                  {images.length > 0 && (
                    <Typography variant="body2" color="textSecondary">
                      {images.length} image(s) selected
                    </Typography>
                  )}
                </Grid>

                {/* Submit Buttons */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => router.push("/visits")} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={20} /> : null}
                    >
                      {isLoading ? "Creating..." : "Create Visit"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  )
}
