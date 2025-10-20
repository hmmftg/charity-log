package visits

import (
	"net/http"
	"strconv"
	"time"

	"charity-log/backend/models"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore/libQuery"
)

// VisitPostHandler handles POST requests for creating new visits
func VisitPostHandler(c *gin.Context) {
	var visit models.VisitRequest
	if err := c.ShouldBindJSON(&visit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate required fields
	if visit.PatientID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient_id is required"})
		return
	}
	if visit.DoctorID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor_id is required"})
		return
	}
	if visit.VisitType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "visit_type is required"})
		return
	}

	// Set default values
	if visit.VisitDate.IsZero() {
		visit.VisitDate = time.Now()
	}
	if visit.Status == "" {
		visit.Status = "scheduled"
	}

	// TODO: Implement database insertion
	// For now, return a mock response
	response := models.VisitResponse{
		Result: libQuery.DmlResult{
			Success: true,
			Message: "Visit created successfully",
		},
	}

	c.JSON(http.StatusCreated, response)
}

// VisitPutHandler handles PUT requests for updating visits
func VisitPutHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid visit ID"})
		return
	}

	var visit models.VisitRequest
	if err := c.ShouldBindJSON(&visit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Implement database update
	// For now, return a mock response
	response := models.VisitResponse{
		Result: libQuery.DmlResult{
			Success: true,
			Message: "Visit updated successfully",
		},
	}

	c.JSON(http.StatusOK, response)
}

// VisitDeleteHandler handles DELETE requests for visits
func VisitDeleteHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid visit ID"})
		return
	}

	// TODO: Implement database deletion
	// For now, return a mock response
	response := gin.H{
		"success": true,
		"message": "Visit deleted successfully",
		"id":      idStr,
	}

	c.JSON(http.StatusOK, response)
}

// VisitGetHandler handles GET requests for a specific visit
func VisitGetHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid visit ID"})
		return
	}

	// TODO: Implement database retrieval
	// For now, return a mock response
	response := gin.H{
		"success": true,
		"message": "Visit retrieved successfully",
		"data": gin.H{
			"id":         idStr,
			"patient_id": "1",
			"doctor_id":  "1",
			"visit_type": "general",
			"visit_date": time.Now(),
			"status":     "completed",
			"diagnosis":  "Regular checkup",
			"treatment":  "Prescribed medication",
			"notes":      "Patient is in good health",
			"created_at": time.Now().Add(-24 * time.Hour),
			"updated_at": time.Now(),
		},
	}

	c.JSON(http.StatusOK, response)
}

// VisitGetAllHandler handles GET requests for all visits
func VisitGetAllHandler(c *gin.Context) {
	// Get query parameters
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "10")
	patientID := c.Query("patient_id")
	doctorID := c.Query("doctor_id")
	status := c.Query("status")
	visitType := c.Query("visit_type")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)

	// TODO: Implement database retrieval with filters
	// For now, return mock data
	mockVisits := []gin.H{
		{
			"id":         "1",
			"patient_id": "1",
			"doctor_id":  "1",
			"visit_type": "general",
			"visit_date": time.Now(),
			"status":     "completed",
			"diagnosis":  "Regular checkup",
			"treatment":  "Prescribed medication",
			"notes":      "Patient is in good health",
			"created_at": time.Now().Add(-24 * time.Hour),
			"updated_at": time.Now(),
		},
		{
			"id":         "2",
			"patient_id": "2",
			"doctor_id":  "1",
			"visit_type": "dental",
			"visit_date": time.Now().Add(-2 * time.Hour),
			"status":     "in_progress",
			"diagnosis":  "Cavity detected",
			"treatment":  "Dental filling",
			"notes":      "Patient needs follow-up",
			"created_at": time.Now().Add(-2 * time.Hour),
			"updated_at": time.Now().Add(-1 * time.Hour),
		},
	}

	// Apply basic filtering (simplified for demo)
	filteredVisits := mockVisits
	if patientID != "" {
		// Filter by patient ID
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["patient_id"] == patientID {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	if doctorID != "" {
		// Filter by doctor ID
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["doctor_id"] == doctorID {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	if status != "" {
		// Filter by status
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["status"] == status {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	if visitType != "" {
		// Filter by visit type
		var filtered []gin.H
		for _, visit := range filteredVisits {
			if visit["visit_type"] == visitType {
				filtered = append(filtered, visit)
			}
		}
		filteredVisits = filtered
	}

	// Calculate pagination
	total := len(filteredVisits)
	offset := (page - 1) * limit
	end := offset + limit

	if offset >= total {
		filteredVisits = []gin.H{}
	} else if end > total {
		filteredVisits = filteredVisits[offset:]
	} else {
		filteredVisits = filteredVisits[offset:end]
	}

	response := gin.H{
		"success": true,
		"message": "Visits retrieved successfully",
		"data":    filteredVisits,
		"pagination": gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": (total + limit - 1) / limit,
		},
	}

	c.JSON(http.StatusOK, response)
}
