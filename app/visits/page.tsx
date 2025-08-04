"use client"

import React from "react"
import { useList, usePermissions } from "@refinedev/core"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { Add, MoreVert, LocalHospital, Person, CalendarToday } from "@mui/icons-material"

export default function VisitsList() {
  const router = useRouter()
  const { data: permissions } = usePermissions()

  const { data: visitsData, isLoading } = useList({
    resource: "visits",
    pagination: { pageSize: 20 },
    sorters: [{ field: "visit_date", order: "desc" }],
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedVisit, setSelectedVisit] = React.useState<any>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, visit: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedVisit(visit)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedVisit(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "scheduled":
        return "primary"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const getVisitTypeIcon = (type: string) => {
    switch (type) {
      case "dentistry":
        return "🦷"
      case "specialist":
        return "👨‍⚕️"
      default:
        return "🏥"
    }
  }

  const canCreateVisit = permissions === "admin" || permissions === "doctor"

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Medical Visits</Typography>
        {canCreateVisit && (
          <Button variant="contained" startIcon={<Add />} onClick={() => router.push("/visits/create")}>
            New Visit
          </Button>
        )}
      </Box>

      {isLoading ? (
        <Typography>Loading visits...</Typography>
      ) : (
        <Grid container spacing={3}>
          {visitsData?.data?.map((visit: any) => (
            <Grid item xs={12} md={6} lg={4} key={visit.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                        {getVisitTypeIcon(visit.visit_type)}
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {visit.visit_type.charAt(0).toUpperCase() + visit.visit_type.slice(1)}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, visit)}>
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Box mb={2}>
                    <Chip
                      label={visit.status}
                      color={getStatusColor(visit.status) as any}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      Patient: {visit.patients?.patient_id}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocalHospital fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      Dr. {visit.doctors?.profiles?.full_name}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {new Date(visit.visit_date).toLocaleDateString()} at{" "}
                      {new Date(visit.visit_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>

                  {visit.chief_complaint && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Complaint:</strong> {visit.chief_complaint}
                    </Typography>
                  )}

                  {visit.diagnosis && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Diagnosis:</strong> {visit.diagnosis}
                    </Typography>
                  )}

                  <Button size="small" onClick={() => router.push(`/visits/show/${visit.id}`)} sx={{ mt: 1 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            router.push(`/visits/show/${selectedVisit?.id}`)
            handleMenuClose()
          }}
        >
          View Details
        </MenuItem>
        {canCreateVisit && (
          <MenuItem
            onClick={() => {
              router.push(`/visits/edit/${selectedVisit?.id}`)
              handleMenuClose()
            }}
          >
            Edit Visit
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}
