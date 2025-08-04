package doctors

import (
	"healthcare/models"

	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore"
	"github.com/hmmftg/requestCore/libGin"
	"github.com/hmmftg/requestCore/libParams"
)

func AdddoctorsRoutes(
	model *requestCore.RequestCoreModel,
	wsParams *libParams.ApplicationParams[models.ApplicationParams],
	_ map[string]string,
	rg *gin.RouterGroup,
	simulation bool,
) {
	env := &doctorsEnv{
		Interface: model,
		Params:    wsParams,
	}
	root := rg.Group("/doctors")
	root.GET("all", libGin.Gin(env.doctorsGetAllHandler(simulation)))
	root.GET(":id", libGin.Gin(env.doctorsGetHandler(simulation)))
	root.POST("", libGin.Gin(env.doctorsPostHandler(simulation)))
	root.PUT(":id", libGin.Gin(env.doctorsPutHandler(simulation)))
	root.DELETE(":id", libGin.Gin(env.doctorsDeleteHandler(simulation)))
}
