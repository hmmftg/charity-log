package dashboard

import (
	"net/http"
	"strconv"
	"time"

	"charity-log/backend/models"

	"github.com/gin-gonic/gin"
)

// DashboardStatsHandler handles GET requests for dashboard statistics
func DashboardStatsHandler(c *gin.Context) {
	// Get query parameters
	startDateStr := c.Query("start_date")
	endDateStr := c.Query("end_date")
	doctorID := c.Query("doctor_id")

	// Parse dates
	var startDate, endDate time.Time
	var err error

	if startDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start_date format. Use YYYY-MM-DD"})
			return
		}
	} else {
		startDate = time.Now().AddDate(0, -1, 0) // Default to 1 month ago
	}

	if endDateStr != "" {
		endDate, err = time.Parse("2006-01-02", endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end_date format. Use YYYY-MM-DD"})
			return
		}
	} else {
		endDate = time.Now() // Default to now
	}

	// TODO: Implement database queries for real statistics
	// For now, return mock data
	response := models.DashboardStatsResponse{
		TotalPatients:    150,
		TotalVisits:      45,
		ActiveTherapies:  12,
		PendingFollowUps: 8,
		MonthlyVisits: []models.MonthlyVisitStats{
			{Month: "January", Count: 12},
			{Month: "February", Count: 18},
			{Month: "March", Count: 15},
			{Month: "April", Count: 22},
			{Month: "May", Count: 19},
			{Month: "June", Count: 25},
		},
		VisitTypes: []models.VisitTypeStats{
			{Type: "General", Count: 25},
			{Type: "Dental", Count: 15},
			{Type: "Emergency", Count: 5},
		},
		TopDiagnoses: []models.DiagnosisStats{
			{Diagnosis: "Regular Checkup", Count: 20},
			{Diagnosis: "Flu Symptoms", Count: 12},
			{Diagnosis: "Dental Cleaning", Count: 8},
			{Diagnosis: "Back Pain", Count: 5},
		},
	}

	// Apply doctor filter if provided
	if doctorID != "" {
		// In a real implementation, you would filter the data by doctor
		// For now, we'll just reduce the numbers proportionally
		response.TotalVisits = response.TotalVisits / 3
		response.ActiveTherapies = response.ActiveTherapies / 2
		response.PendingFollowUps = response.PendingFollowUps / 2
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Dashboard statistics retrieved successfully",
		"data":    response,
		"filters": gin.H{
			"start_date": startDate.Format("2006-01-02"),
			"end_date":   endDate.Format("2006-01-02"),
			"doctor_id":  doctorID,
		},
	})
}

// PatientStatsHandler handles GET requests for patient statistics
func PatientStatsHandler(c *gin.Context) {
	// Get query parameters
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "10")
	status := c.Query("status")
	ageGroup := c.Query("age_group")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)

	// TODO: Implement database queries for patient statistics
	// For now, return mock data
	mockPatients := []gin.H{
		{
			"id":          "1",
			"full_name":   "John Doe",
			"age":         35,
			"gender":      "Male",
			"last_visit":  time.Now().Add(-7 * 24 * time.Hour),
			"visit_count": 5,
			"status":      "active",
			"blood_type":  "O+",
			"phone":       "+1234567890",
			"email":       "john.doe@example.com",
		},
		{
			"id":          "2",
			"full_name":   "Jane Smith",
			"age":         28,
			"gender":      "Female",
			"last_visit":  time.Now().Add(-3 * 24 * time.Hour),
			"visit_count": 3,
			"status":      "active",
			"blood_type":  "A+",
			"phone":       "+1234567891",
			"email":       "jane.smith@example.com",
		},
		{
			"id":          "3",
			"full_name":   "Bob Johnson",
			"age":         45,
			"gender":      "Male",
			"last_visit":  time.Now().Add(-14 * 24 * time.Hour),
			"visit_count": 8,
			"status":      "inactive",
			"blood_type":  "B+",
			"phone":       "+1234567892",
			"email":       "bob.johnson@example.com",
		},
	}

	// Apply filters
	filteredPatients := mockPatients
	if status != "" {
		var filtered []gin.H
		for _, patient := range filteredPatients {
			if patient["status"] == status {
				filtered = append(filtered, patient)
			}
		}
		filteredPatients = filtered
	}

	if ageGroup != "" {
		var filtered []gin.H
		for _, patient := range filteredPatients {
			age := patient["age"].(int)
			switch ageGroup {
			case "0-18":
				if age >= 0 && age <= 18 {
					filtered = append(filtered, patient)
				}
			case "19-35":
				if age >= 19 && age <= 35 {
					filtered = append(filtered, patient)
				}
			case "36-50":
				if age >= 36 && age <= 50 {
					filtered = append(filtered, patient)
				}
			case "50+":
				if age > 50 {
					filtered = append(filtered, patient)
				}
			}
		}
		filteredPatients = filtered
	}

	// Calculate pagination
	total := len(filteredPatients)
	offset := (page - 1) * limit
	end := offset + limit

	if offset >= total {
		filteredPatients = []gin.H{}
	} else if end > total {
		filteredPatients = filteredPatients[offset:]
	} else {
		filteredPatients = filteredPatients[offset:end]
	}

	response := gin.H{
		"success": true,
		"message": "Patient statistics retrieved successfully",
		"data":    filteredPatients,
		"pagination": gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": (total + limit - 1) / limit,
		},
		"summary": gin.H{
			"total_patients":         total,
			"active_patients":        len(filteredPatients),
			"average_age":            36,
			"most_common_blood_type": "O+",
		},
	}

	c.JSON(http.StatusOK, response)
}

// VisitStatsHandler handles GET requests for visit statistics
func VisitStatsHandler(c *gin.Context) {
	// Get query parameters
	startDateStr := c.Query("start_date")
	endDateStr := c.Query("end_date")
	visitType := c.Query("visit_type")
	status := c.Query("status")

	// Parse dates
	var startDate, endDate time.Time
	var err error

	if startDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start_date format. Use YYYY-MM-DD"})
			return
		}
	} else {
		startDate = time.Now().AddDate(0, -1, 0) // Default to 1 month ago
	}

	if endDateStr != "" {
		endDate, err = time.Parse("2006-01-02", endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end_date format. Use YYYY-MM-DD"})
			return
		}
	} else {
		endDate = time.Now() // Default to now
	}

	// TODO: Implement database queries for visit statistics
	// For now, return mock data
	mockVisits := []gin.H{
		{
			"id":           "1",
			"patient_name": "John Doe",
			"doctor_name":  "Dr. Smith",
			"visit_type":   "general",
			"visit_date":   time.Now().Add(-2 * 24 * time.Hour),
			"status":       "completed",
			"diagnosis":    "Regular checkup",
			"duration":     30,
		},
		{
			"id":           "2",
			"patient_name": "Jane Smith",
			"doctor_name":  "Dr. Johnson",
			"visit_type":   "dental",
			"visit_date":   time.Now().Add(-1 * 24 * time.Hour),
			"status":       "in_progress",
			"diagnosis":    "Cavity treatment",
			"duration":     45,
		},
		{
			"id":           "3",
			"patient_name": "Bob Johnson",
			"doctor_name":  "Dr. Smith",
			"visit_type":   "emergency",
			"visit_date":   time.Now().Add(-6 * time.Hour),
			"status":       "completed",
			"diagnosis":    "Minor injury",
			"duration":     20,
		},
	}

	// Apply filters
	filteredVisits := mockVisits
	if visitType != "" {
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["visit_type"] == visitType {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	if status != "" {
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["status"] == status {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	response := gin.H{
		"success": true,
		"message": "Visit statistics retrieved successfully",
		"data":    filteredVisits,
		"summary": gin.H{
			"total_visits":       len(filteredVisits),
			"completed_visits":   2,
			"in_progress_visits": 1,
			"average_duration":   32,
			"most_common_type":   "general",
		},
		"filters": gin.H{
			"start_date": startDate.Format("2006-01-02"),
			"end_date":   endDate.Format("2006-01-02"),
			"visit_type": visitType,
			"status":     status,
		},
	}

	c.JSON(http.StatusOK, response)
}
