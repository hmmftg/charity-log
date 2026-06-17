package therapyschedules

import (
	"net/http"
	"time"

	"healthcare/models"
	"healthcare/utils/api"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore/libQuery"
)

func mockTherapySchedules() []gin.H {
	now := time.Now()
	return []gin.H{
		{
			"id": "1", "patient_id": "1", "doctor_id": "1",
			"therapy_type": "Physical Therapy", "description": "Post-surgery rehabilitation",
			"start_date": now, "end_date": now.Add(30 * 24 * time.Hour),
			"frequency": "weekly", "instructions": "Perform exercises as directed",
			"is_active": true, "duration": 30, "session_count": 4,
			"created_at": now.Add(-24 * time.Hour), "updated_at": now,
		},
		{
			"id": "2", "patient_id": "2", "doctor_id": "1",
			"therapy_type": "Speech Therapy", "description": "Language development",
			"start_date": now.Add(-7 * 24 * time.Hour), "end_date": now.Add(23 * 24 * time.Hour),
			"frequency": "twice weekly", "instructions": "Practice pronunciation exercises",
			"is_active": true, "duration": 45, "session_count": 8,
			"created_at": now.Add(-7 * 24 * time.Hour), "updated_at": now.Add(-1 * time.Hour),
		},
	}
}

func TherapySchedulePostHandler(c *gin.Context) {
	var schedule models.TherapyScheduleRequest
	if err := c.ShouldBindJSON(&schedule); err != nil {
		api.WriteError(c, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}
	api.WriteDML(c, http.StatusCreated, libQuery.DmlResult{RowsAffected: 1})
}

func TherapySchedulePutHandler(c *gin.Context) {
	if c.Param("id") == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid therapy schedule ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func TherapyScheduleDeleteHandler(c *gin.Context) {
	if c.Param("id") == "" {
		api.WriteError(c, http.StatusBadRequest, "INVALID_ID", "Invalid therapy schedule ID")
		return
	}
	api.WriteDML(c, http.StatusOK, libQuery.DmlResult{RowsAffected: 1})
}

func TherapyScheduleGetHandler(c *gin.Context) {
	id := c.Param("id")
	for _, item := range mockTherapySchedules() {
		if item["id"] == id {
			api.WriteOne(c, item)
			return
		}
	}
	api.WriteError(c, http.StatusNotFound, "NOT_FOUND", "Therapy schedule not found")
}

func TherapyScheduleGetAllHandler(c *gin.Context) {
	page := api.ParsePageRange(c)
	items := mockTherapySchedules()
	api.WriteList(c, api.SlicePage(items, page), len(items))
}
