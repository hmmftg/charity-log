package medications

import (
	"net/http"
	"time"

	"healthcare/models"
	"healthcare/utils/api"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore/libQuery"
)

func mockMedications() []gin.H {
	now := time.Now()
	return []gin.H{
		{
			"id": "1", "visit_id": "1", "medication_name": "Paracetamol",
			"dosage": "500mg", "frequency": "3 times daily", "duration": "7 days",
			"instructions": "Take with food", "start_date": now,
			"end_date": now.Add(7 * 24 * time.Hour), "is_active": true,
			"created_at": now.Add(-24 * time.Hour), "updated_at": now,
		},
		{
			"id": "2", "visit_id": "2", "medication_name": "Ibuprofen",
			"dosage": "400mg", "frequency": "2 times daily", "duration": "5 days",
			"instructions": "Take after meals", "start_date": now.Add(-2 * time.Hour),
			"end_date": now.Add(5 * 24 * time.Hour), "is_active": true,
			"created_at": now.Add(-2 * time.Hour), "updated_at": now.Add(-1 * time.Hour),
		},
	}
}

func MedicationPostHandler(c *gin.Context) {
	var medication models.MedicationRequest
	if err := c.ShouldBindJSON(&medication); err != nil {
		api.WriteError(c, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}
	api.WriteDML(c, http.StatusCreated, libQuery.DmlResult{RowsAffected: 1})
}

func MedicationPutHandler(c *gin.Context) {
	if c.Param("id") == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid medication ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func MedicationDeleteHandler(c *gin.Context) {
	if c.Param("id") == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid medication ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func MedicationGetHandler(c *gin.Context) {
	id := c.Param("id")
	for _, item := range mockMedications() {
		if item["id"] == id {
			api.WriteOne(c, item)
			return
		}
	}
	api.WriteError(c, http.StatusNotFound, "NOT_FOUND", "Medication not found")
}

func MedicationGetAllHandler(c *gin.Context) {
	page := api.ParsePageRange(c)
	items := mockMedications()
	api.WriteList(c, api.SlicePage(items, page), len(items))
}
