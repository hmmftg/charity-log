"use client"

import type React from "react"
import { useState } from "react"
import { useLogin } from "@refinedev/core"
import { useRouter } from "next/navigation"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Avatar,
} from "@mui/material"
import { LocalHospital } from "@mui/icons-material"

export default function Login() {
  const { mutate: login, isLoading } = useLogin()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    login(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard")
        },
        onError: (error: any) => {
          setError(error?.message || "Login failed. Please check your credentials.")
        },
      },
    )
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
          <LocalHospital fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h4" gutterBottom>
          Medical Visit Logger
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Charity Medical Tent Management System
        </Typography>

        <Card sx={{ mt: 3, width: "100%" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography component="h2" variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Box mt={3}>
              <Typography variant="body2" color="textSecondary" align="center">
                Demo Accounts:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                Admin: admin@medicalcharity.org
              </Typography>
              <Typography variant="caption" display="block" align="center">
                Doctor: doctor1@medicalcharity.org
              </Typography>
              <Typography variant="caption" display="block" align="center">
                Password: password123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
