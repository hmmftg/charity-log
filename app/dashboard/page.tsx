"use client"

import React from "react"
import { useList, usePermissions } from "@refinedev/core"
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material"
import { People, LocalHospital, Schedule, TrendingUp } from "@mui/icons-material"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
  const { data: permissions } = usePermissions()

  const { data: patientsData } = useList({
    resource: "patients",
    pagination: { mode: "off" },
  })

  const { data: visitsData } = useList({
    resource: "visits",
    pagination: { mode: "off" },
  })

  const { data: therapyData } = useList({
    resource: "therapy_schedules",
    pagination: { mode: "off" },
  })

  const { data: doctorsData } = useList({
    resource: "doctors",
    pagination: { mode: "off" },
  })

  // Calculate statistics
  const totalPatients = patientsData?.total || 0
  const totalVisits = visitsData?.total || 0
  const totalTherapies = therapyData?.total || 0
  const totalDoctors = doctorsData?.total || 0

  // Visit type distribution
  const visitTypeData = React.useMemo(() => {
    if (!visitsData?.data) return []

    const types = visitsData.data.reduce((acc: any, visit: any) => {
      acc[visit.visit_type] = (acc[visit.visit_type] || 0) + 1
      return acc
    }, {})

    return Object.entries(types).map(([name, value]) => ({ name, value }))
  }, [visitsData])

  // Monthly visits trend
  const monthlyVisitsData = React.useMemo(() => {
    if (!visitsData?.data) return []

    const months = visitsData.data.reduce((acc: any, visit: any) => {
      const month = new Date(visit.visit_date).toLocaleDateString("en-US", { month: "short" })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    return Object.entries(months).map(([month, visits]) => ({ month, visits }))
  }, [visitsData])

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  )

  if (permissions !== "admin" && permissions !== "doctor") {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Patient Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Visits
                </Typography>
                <Typography variant="h4">{visitsData?.data?.length || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Therapies
                </Typography>
                <Typography variant="h4">{therapyData?.data?.filter((t: any) => t.is_active)?.length || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Medical Center Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Patients" value={totalPatients} icon={<People />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Visits" value={totalVisits} icon={<LocalHospital />} color="#388e3c" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Therapies"
            value={therapyData?.data?.filter((t: any) => t.is_active)?.length || 0}
            icon={<Schedule />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Doctors" value={totalDoctors} icon={<TrendingUp />} color="#7b1fa2" />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Visits Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Visit Types Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {visitTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
