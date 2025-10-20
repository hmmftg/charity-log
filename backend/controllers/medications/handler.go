package medications

import (
	"net/http"
	"strconv"
	"time"

	"charity-log/backend/models"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore/libQuery"
)

// MedicationPostHandler handles POST requests for creating new medications
func MedicationPostHandler(c *gin.Context) {
	var medication models.MedicationRequest
	if err := c.ShouldBindJSON(&medication); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate required fields
	if medication.VisitID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "visit_id is required"})
		return
	}
	if medication.MedicationName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medication_name is required"})
		return
	}
	if medication.Dosage == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dosage is required"})
		return
	}

	// Set default values
	if medication.StartDate.IsZero() {
		medication.StartDate = time.Now()
	}
	if !medication.IsActive {
		medication.IsActive = true
	}

	// TODO: Implement database insertion
	// For now, return a mock response
	response := models.MedicationResponse{
		Result: libQuery.DmlResult{
			Success: true,
			Message: "Medication created successfully",
		},
	}

	c.JSON(http.StatusCreated, response)
}

// MedicationPutHandler handles PUT requests for updating medications
func MedicationPutHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid medication ID"})
		return
	}

	var medication models.MedicationRequest
	if err := c.ShouldBindJSON(&medication); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Implement database update
	// For now, return a mock response
	response := models.MedicationResponse{
		Result: libQuery.DmlResult{
			Success: true,
			Message: "Medication updated successfully",
		},
	}

	c.JSON(http.StatusOK, response)
}

// MedicationDeleteHandler handles DELETE requests for medications
func MedicationDeleteHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid medication ID"})
		return
	}

	// TODO: Implement database deletion
	// For now, return a mock response
	response := gin.H{
		"success": true,
		"message": "Medication deleted successfully",
		"id":      idStr,
	}

	c.JSON(http.StatusOK, response)
}

// MedicationGetHandler handles GET requests for a specific medication
func MedicationGetHandler(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid medication ID"})
		return
	}

	// TODO: Implement database retrieval
	// For now, return a mock response
	response := gin.H{
		"success": true,
		"message": "Medication retrieved successfully",
		"data": gin.H{
			"id":                idStr,
			"visit_id":          "1",
			"medication_name":   "Paracetamol",
			"dosage":            "500mg",
			"frequency":         "3 times daily",
			"duration":          "7 days",
			"instructions":      "Take with food",
			"start_date":        time.Now(),
			"end_date":          time.Now().Add(7 * 24 * time.Hour),
			"is_active":         true,
			"side_effects":      "May cause drowsiness",
			"contraindications": "Not for children under 12",
			"created_at":        time.Now().Add(-24 * time.Hour),
			"updated_at":        time.Now(),
		},
	}

	c.JSON(http.StatusOK, response)
}

// MedicationGetAllHandler handles GET requests for all medications
func MedicationGetAllHandler(c *gin.Context) {
	// Get query parameters
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "10")
	visitID := c.Query("visit_id")
	isActive := c.Query("is_active")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)

	// TODO: Implement database retrieval with filters
	// For now, return mock data
	mockMedications := []gin.H{
		{
			"id":                "1",
			"visit_id":          "1",
			"medication_name":   "Paracetamol",
			"dosage":            "500mg",
			"frequency":         "3 times daily",
			"duration":          "7 days",
			"instructions":      "Take with food",
			"start_date":        time.Now(),
			"end_date":          time.Now().Add(7 * 24 * time.Hour),
			"is_active":         true,
			"side_effects":      "May cause drowsiness",
			"contraindications": "Not for children under 12",
			"created_at":        time.Now().Add(-24 * time.Hour),
			"updated_at":        time.Now(),
		},
		{
			"id":                "2",
			"visit_id":          "2",
			"medication_name":   "Ibuprofen",
			"dosage":            "400mg",
			"frequency":         "2 times daily",
			"duration":          "5 days",
			"instructions":      "Take after meals",
			"start_date":        time.Now().Add(-2 * time.Hour),
			"end_date":          time.Now().Add(5 * 24 * time.Hour),
			"is_active":         true,
			"side_effects":      "May cause stomach upset",
			"contraindications": "Not for patients with ulcers",
			"created_at":        time.Now().Add(-2 * time.Hour),
			"updated_at":        time.Now().Add(-1 * time.Hour),
		},
	}

	// Apply basic filtering
	filteredMedications := mockMedications
	if visitID != "" {
		var filtered []gin.H
		for _, medication := range filteredMedications {
			if medication["visit_id"] == visitID {
				filtered = append(filtered, medication)
			}
		}
		filteredMedications = filtered
	}

	if isActive != "" {
		var filtered []gin.H
		for _, medication := range filteredMedications {
			if medication["is_active"] == (isActive == "true") {
				filtered = append(filtered, medication)
			}
		}
		filteredMedications = filtered
	}

	// Calculate pagination
	total := len(filteredMedications)
	offset := (page - 1) * limit
	end := offset + limit

	if offset >= total {
		filteredMedications = []gin.H{}
	} else if end > total {
		filteredMedications = filteredMedications[offset:]
	} else {
		filteredMedications = filteredMedications[offset:end]
	}

	response := gin.H{
		"success": true,
		"message": "Medications retrieved successfully",
		"data":    filteredMedications,
		"pagination": gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": (total + limit - 1) / limit,
		},
	}

	c.JSON(http.StatusOK, response)
}
