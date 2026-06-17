package therapyschedules

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all therapy schedule-related routes
func SetupRoutes(r *gin.RouterGroup) {
	schedules := r.Group("/therapy-schedules")
	{
		schedules.POST("", TherapySchedulePostHandler)         // Create new therapy schedule
		schedules.GET("/all", TherapyScheduleGetAllHandler)
		schedules.GET("/:id", TherapyScheduleGetHandler)
		schedules.PUT("/:id", TherapySchedulePutHandler)       // Update therapy schedule
		schedules.DELETE("/:id", TherapyScheduleDeleteHandler) // Delete therapy schedule
	}
}
