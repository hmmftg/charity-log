package visits

import (
	"net/http"
	"time"

	"healthcare/models"
	"healthcare/utils/api"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore/libQuery"
)

func mockVisits() []gin.H {
	now := time.Now()
	return []gin.H{
		{
			"id": "1", "patient_id": "1", "doctor_id": "1",
			"visit_type": "general", "visit_date": now,
			"status": "completed", "diagnosis": "Regular checkup",
			"treatment_plan": "Prescribed medication", "notes": "Patient is in good health",
			"created_at": now.Add(-24 * time.Hour), "updated_at": now,
		},
		{
			"id": "2", "patient_id": "2", "doctor_id": "1",
			"visit_type": "dental", "visit_date": now.Add(-2 * time.Hour),
			"status": "in_progress", "diagnosis": "Cavity detected",
			"treatment_plan": "Dental filling", "notes": "Patient needs follow-up",
			"created_at": now.Add(-2 * time.Hour), "updated_at": now.Add(-1 * time.Hour),
		},
	}
}

func VisitPostHandler(c *gin.Context) {
	var visit models.VisitRequest
	if err := c.ShouldBindJSON(&visit); err != nil {
		api.WriteError(c, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}
	api.WriteDML(c, http.StatusCreated, libQuery.DmlResult{RowsAffected: 1})
}

func VisitPutHandler(c *gin.Context) {
	if c.Param("id") == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid visit ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func VisitDeleteHandler(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid visit ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func VisitGetHandler(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid visit ID")
		return
	}
	for _, visit := range mockVisits() {
		if visit["id"] == id {
			api.WriteOne(c, visit)
			return
		}
	}
	api.WriteError(c, http.StatusNotFound, "NOT_FOUND", "Visit not found")
}

func VisitGetAllHandler(c *gin.Context) {
	page := api.ParsePageRange(c)
	items := mockVisits()
	total := len(items)
	api.WriteList(c, api.SlicePage(items, page), total)
}
