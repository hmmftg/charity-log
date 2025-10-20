package visits

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all visit-related routes
func SetupRoutes(r *gin.RouterGroup) {
	visits := r.Group("/visits")
	{
		visits.POST("", VisitPostHandler)         // Create new visit
		visits.GET("", VisitGetAllHandler)        // Get all visits with filters
		visits.GET("/:id", VisitGetHandler)       // Get specific visit
		visits.PUT("/:id", VisitPutHandler)       // Update visit
		visits.DELETE("/:id", VisitDeleteHandler) // Delete visit
	}
}
