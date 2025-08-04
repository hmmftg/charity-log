package main

import (
	"healthcare/cmd/healthcare/docs"
	"healthcare/controllers/doctors"
	"healthcare/controllers/ums"
	"healthcare/models"
	"net/http"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hmmftg/requestCore"
	initiator "github.com/hmmftg/requestCore/libApplication"
	"github.com/hmmftg/requestCore/libParams"
	"github.com/swaggo/swag/v2"
)

type Application struct {
	engine *gin.Engine
}

var Version = "0.0.0"

func (a Application) Title() string {
	return "healthcare Api"
}
func (a Application) Name() string {
	return "healthcare"
}
func (a Application) Version() string {
	return Version
}
func (a Application) BasePath() string {
	return ""
}
func (a Application) HasSwagger() bool {
	return true
}
func (a Application) SwaggerSpec() *swag.Spec {
	return docs.SwaggerInfoCartino
}
func (a Application) RequestFields() string {
	return initiator.DefaultRequestFields
}
func (a Application) AddRoutes(
	model *requestCore.RequestCoreModel,
	wsParams *libParams.ApplicationParams[models.ApplicationParams],
	roleMap map[string]string,
	rg *gin.RouterGroup,
) {

	api := rg.Group("api/v1")
	ums.AddumsRoutes(model, wsParams, rg, api, false)
	doctors.AdddoctorsRoutes(model, wsParams, roleMap, api, false)
	if wsParams.Network[""].Port == wsParams.Network[""].StaticPort && len(wsParams.Specific.StaticBaseUrl) > 0 && len(wsParams.Network[""].StaticPath) > 0 {
		rg.Static("/"+wsParams.Specific.StaticBaseUrl, wsParams.Network[""].StaticPath)

		// Redirect root requests to '/ui'
		rg.GET("/", func(c *gin.Context) {
			c.Redirect(301, "/"+wsParams.Specific.StaticBaseUrl)
		})

		a.engine.NoRoute(func(c *gin.Context) {
			// Catch-all route for React app
			if strings.HasPrefix(c.Request.RequestURI, "/"+wsParams.Specific.StaticBaseUrl) {
				c.File(wsParams.Network[""].StaticPath + "/index.html")
			} else {
				c.JSON(http.StatusNotFound, gin.H{"code": "PAGE_NOT_FOUND", "message": "404 page not found"})
			}
		})
	}

}

func (a *Application) InitGinApp(engine *gin.Engine) {
	a.engine = engine
}
func (a Application) GetCorsConfig() *cors.Config {
	return &cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Request-Id", "Branch-Id", "Person-Id", "User-Id", "X-Total-Count"},
		ExposeHeaders:    []string{"X-Total-Count"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
}

func (a Application) GetDbList() []string {
	return []string{a.Name()}
}
func (a Application) GetKeys() [][]byte {
	return [][]byte{
		{0xeb, 0xb2, 0x25, 0xcc, 0xe7, 0xfb, 0xa1, 0x5e, 0x32, 0xc6, 0xbb, 0xd0, 0xfd, 0x92, 0x05, 0x21},
		{0x4b, 0xdb, 0x3f, 0x59, 0xe9, 0x53, 0xb1, 0x16, 0xf2, 0x4d, 0xb0, 0xbe, 0xed, 0xcc, 0x12, 0x1d},
	}
}

func (a Application) InitParams(wsParams *libParams.ApplicationParams[models.ApplicationParams]) {

}

// @title           سامانه سرویس های Health Care
// @version         V0.0.0

// @description     های simulator مربوط به سامانه پرداخت با کارتapi مجموعه

// @contact.name   پشتیبانی
// @contact.url    http://www.pooya.ir/support
// @contact.email  support@pooya.ir

// @servers.url http://localhost:9000/card/cartino
// @servers.description محیط توسعه

// @securityDefinitions.oauth2.application احرازهویت-سرویس
// @tokenUrl /card/cartino/auth/service/login
// @scope.login احراز هویت مشتری با رمز یکبار مصرف
// @scope.check کنترل کدملی و شماره موبایل بوسیله شاهکار
// @in header
// @name احراز هویت درگاه
// @clientId pooya
// @clientSecret pooya123
// @description مقادیر client-id و client-secret در هدر Authorization ارسال می گردد

// @securityDefinitions.bearerauth  احرازهویت-مشتری
// @bearerFormat: JWT
// @type: http
func main() {
	initiator.InitializeApp(&Application{})
}
