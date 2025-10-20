package dashboard

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all dashboard-related routes
func SetupRoutes(r *gin.RouterGroup) {
	dashboard := r.Group("/dashboard")
	{
		dashboard.GET("/stats", DashboardStatsHandler)  // Get dashboard statistics
		dashboard.GET("/patients", PatientStatsHandler) // Get patient statistics
		dashboard.GET("/visits", VisitStatsHandler)     // Get visit statistics
	}
}
