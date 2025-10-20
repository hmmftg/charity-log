package medications

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all medication-related routes
func SetupRoutes(r *gin.RouterGroup) {
	medications := r.Group("/medications")
	{
		medications.POST("", MedicationPostHandler)         // Create new medication
		medications.GET("", MedicationGetAllHandler)        // Get all medications with filters
		medications.GET("/:id", MedicationGetHandler)       // Get specific medication
		medications.PUT("/:id", MedicationPutHandler)       // Update medication
		medications.DELETE("/:id", MedicationDeleteHandler) // Delete medication
	}
}
