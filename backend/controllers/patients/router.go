package patients

import (
	"healthcare/models"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore"
	"github.com/hmmftg/requestCore/libGin"
	"github.com/hmmftg/requestCore/libParams"
)

func AddPatientsRoutes(
	model *requestCore.RequestCoreModel,
	wsParams *libParams.ApplicationParams[models.ApplicationParams],
	_ map[string]string,
	rg *gin.RouterGroup,
	simulation bool,
) {
	env := &patientsEnv{
		Interface: model,
		Params:    wsParams,
	}
	root := rg.Group("/patients")
	root.GET("all", libGin.Gin(env.patientsGetAllHandler(simulation)))
	root.GET(":id", libGin.Gin(env.patientsGetHandler(simulation)))
	root.POST("", libGin.Gin(env.patientsPostHandler(simulation)))
	root.PUT(":id", libGin.Gin(env.patientsPutHandler(simulation)))
	root.DELETE(":id", libGin.Gin(env.patientsDeleteHandler(simulation)))
}
