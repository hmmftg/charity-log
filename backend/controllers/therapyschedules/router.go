package therapyschedules

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all therapy schedule-related routes
func SetupRoutes(r *gin.RouterGroup) {
	schedules := r.Group("/therapy-schedules")
	{
		schedules.POST("", TherapySchedulePostHandler)         // Create new therapy schedule
		schedules.GET("", TherapyScheduleGetAllHandler)        // Get all therapy schedules with filters
		schedules.GET("/:id", TherapyScheduleGetHandler)       // Get specific therapy schedule
		schedules.PUT("/:id", TherapySchedulePutHandler)       // Update therapy schedule
		schedules.DELETE("/:id", TherapyScheduleDeleteHandler) // Delete therapy schedule
	}
}
