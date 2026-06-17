package dashboard

import (
	"time"

	"healthcare/models"
	"healthcare/utils/api"

	"github.com/gin-gonic/gin"
)

func DashboardStatsHandler(c *gin.Context) {
	response := models.DashboardStatsResponse{
		TotalPatients:    150,
		TotalVisits:      45,
		ActiveTherapies:  12,
		PendingFollowUps: 8,
		MonthlyVisits: []models.MonthlyVisitStats{
			{Month: "January", Count: 12},
			{Month: "February", Count: 18},
			{Month: "March", Count: 15},
		},
		VisitTypes: []models.VisitTypeStats{
			{Type: "General", Count: 25},
			{Type: "Dental", Count: 15},
		},
		TopDiagnoses: []models.DiagnosisStats{
			{Diagnosis: "Regular Checkup", Count: 20},
			{Diagnosis: "Flu Symptoms", Count: 12},
		},
	}
	api.WriteOne(c, response)
}

func PatientStatsHandler(c *gin.Context) {
	now := time.Now()
	items := []gin.H{
		{"id": "1", "full_name": "John Doe", "status": "active", "last_visit": now.Add(-7 * 24 * time.Hour)},
		{"id": "2", "full_name": "Jane Smith", "status": "active", "last_visit": now.Add(-3 * 24 * time.Hour)},
	}
	page := api.ParsePageRange(c)
	api.WriteList(c, api.SlicePage(items, page), len(items))
}

func VisitStatsHandler(c *gin.Context) {
	now := time.Now()
	items := []gin.H{
		{"id": "1", "patient_name": "John Doe", "visit_type": "general", "visit_date": now, "status": "completed"},
		{"id": "2", "patient_name": "Jane Smith", "visit_type": "dental", "visit_date": now.Add(-1 * 24 * time.Hour), "status": "in_progress"},
	}
	page := api.ParsePageRange(c)
	api.WriteList(c, api.SlicePage(items, page), len(items))
}
