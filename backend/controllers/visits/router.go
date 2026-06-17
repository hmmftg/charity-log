package visits

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all visit-related routes
func SetupRoutes(r *gin.RouterGroup) {
	visits := r.Group("/visits")
	{
		visits.POST("", VisitPostHandler)
		visits.GET("/all", VisitGetAllHandler)
		visits.GET("/:id", VisitGetHandler)
		visits.PUT("/:id", VisitPutHandler)       // Update visit
		visits.DELETE("/:id", VisitDeleteHandler) // Delete visit
	}
}
