package doctors

import (
	"healthcare/models"
	"net/http"
	"time"

	"github.com/hmmftg/requestCore"
	"github.com/hmmftg/requestCore/handlers"
	"github.com/hmmftg/requestCore/libError"
	"github.com/hmmftg/requestCore/libParams"
	"github.com/hmmftg/requestCore/libQuery"
	"github.com/hmmftg/requestCore/libRequest"
)

type doctorsEnv struct {
	Params    libParams.ParamInterface
	Interface requestCore.RequestCoreInterface
}

func (env *doctorsEnv) GetInterface() requestCore.RequestCoreInterface {
	return env.Interface
}
func (env *doctorsEnv) GetParams() libParams.ParamInterface {
	return env.Params
}
func (env *doctorsEnv) SetInterface(core requestCore.RequestCoreInterface) {
	env.Interface = core
}
func (env *doctorsEnv) SetParams(parameters libParams.ParamInterface) {
	env.Params = parameters
}

type doctorsHandler struct {
	Name string
}

// returns handler title
//
//	Request Bodymode
//	and validate header option
//	and save to request table option
//	and url path of handler
func (h doctorsHandler) Parameters() handlers.HandlerParameters {
	return handlers.HandlerParameters{
		Title:          "doctors",
		Body:           libRequest.JSON,
		ValidateHeader: true,
		SaveToRequest:  false,
		Path:           "/doctors",
	}
}

// runs after validating request
func (h doctorsHandler) Initializer(req handlers.HandlerRequest[models.DoctorsRequest, *models.DoctorsResponse]) error {
	return nil
}

// Handler is the main method that handles request and returns the response,
// if there is a need for calling another api this is the place to call that api.
func (h doctorsHandler) Handler(req handlers.HandlerRequest[models.DoctorsRequest, *models.DoctorsResponse]) (*models.DoctorsResponse, error) {
	switch h.Name {
	case "doctors-post":
		result, err := req.Core.GetDB().InsertRow(`--sql
			insert into simulator.doctors (id, name)
			values(:1, :2)
		`, req.Request.ID, req.Request.Name)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_INSERT", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.DoctorsResponse{
			Result: dmlResult,
		}
		return req.Response, nil
	case "doctors-put":
		result, err := req.Core.GetDB().InsertRow(`--sql
			update simulator.doctors 
			   set name=:1
			 where id=:2
		`, req.Request.Name, req.Request.ID)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_UPDATE", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.DoctorsResponse{
			Result: dmlResult,
		}
		return req.Response, nil
	case "doctors-delete":
		result, err := req.Core.GetDB().InsertRow(`--sql
			delete from simulator.servers 
			 where id=:1
		`, req.Request.ID)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_DELETE", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.DoctorsResponse{
			Result: dmlResult,
		}
		return req.Response, nil
	}
	return nil, libError.NewWithDescription(http.StatusInternalServerError, "UNKNOWN_METHOD", "method not defined: %s", h.Name)
}

// Simulation returns a simulated response.
func (h doctorsHandler) Simulation(req handlers.HandlerRequest[models.DoctorsRequest, *models.DoctorsResponse]) (*models.DoctorsResponse, error) {
	return req.Response, nil
}

// runs after sending back response
func (h doctorsHandler) Finalizer(req handlers.HandlerRequest[models.DoctorsRequest, *models.DoctorsResponse]) {
}

// doctorsPostHandler godoc
// @Summary doctorsPostHandler
// @Schemes
// @Description  doctorsPostHandler
// @Tags doctors
// @Accept json
// @Produce json
// @Param Request-Id header string true "شناسه درخواست"
// @Param ورودی body models.DoctorsRequest true "اطلاعات ورودی"
// @Router /doctors [post]
// @Security  OAuth2Password
// @Success 200 {object} models.DoctorsResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env doctorsEnv) doctorsPostHandler(simulation bool) any {
	return handlers.BaseHandler[models.DoctorsRequest, *models.DoctorsResponse, doctorsHandler](env.Interface, doctorsHandler{Name: "doctors-post"}, simulation)
}

// doctorsPutHandler godoc
// @Summary doctorsPutHandler
// @Schemes
// @Description  doctorsPutHandler
// @Tags doctors
// @Accept json
// @Produce json
// @Param Request-Id header string true "شناسه درخواست"
// @Param ورودی body models.DoctorsRequest true "اطلاعات ورودی"
// @Param id path string true "شناسه"
// @Router /doctors/:id [put]
// @Security  OAuth2Password
// @Success 200 {object} models.DoctorsResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env doctorsEnv) doctorsPutHandler(simulation bool) any {
	return handlers.BaseHandler[models.DoctorsRequest, *models.DoctorsResponse, doctorsHandler](env.Interface, doctorsHandler{Name: "doctors-put"}, simulation)
}

// doctorsPutHandler godoc
// @Summary doctorsPutHandler
// @Schemes
// @Description  doctorsPutHandler
// @Tags doctors
// @Accept json
// @Produce json
// @Param Request-Id header string true "شناسه درخواست"
// @Param ورودی body models.DoctorsRequest true "اطلاعات ورودی"
// @Param id path string true "شناسه"
// @Router /doctors/:id [put]
// @Security  OAuth2Password
// @Success 200 {object} models.DoctorsResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env doctorsEnv) doctorsDeleteHandler(simulation bool) any {
	return handlers.BaseHandler[models.DoctorsRequest, *models.DoctorsResponse, doctorsHandler](env.Interface, doctorsHandler{Name: "doctors-delete"}, simulation)
}

// doctorsGetHandler godoc
// @Summary doctorsGetHandler
// @Schemes
// @Description  doctorsGetHandler
// @Tags doctors
// @Accept json
// @Produce json
// @Param Request-Id header string true "شناسه درخواست"
// @Param ورودی query DoctorsRow true "اطلاعات ورودی"
// @Router /doctors [get]
// @Security  OAuth2Password
// @Success 200 {object} []DoctorsRow
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env doctorsEnv) doctorsGetHandler(simulation bool) any {
	return handlers.QueryHandlerWithCaching[models.DoctorsRow](
		"doctors-get", models.QuerySingle, "/doctors/:id",
		QueryMap, env.Interface, libRequest.URI,
		true, simulation, nil,
		&handlers.CachingArgs{
			Cache:       true,
			CacheMaxAge: time.Hour,
		},
	)
}

// doctorsGetAllHandler godoc
// @Summary doctorsGetAllHandler
// @Schemes
// @Description  doctorsGetAllHandler
// @Tags doctors
// @Accept json
// @Produce json
// @Param Request-Id header string true "شناسه درخواست"
// @Router /doctors/all [get]
// @Security  OAuth2Password
// @Success 200 {object} []DoctorsRow
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env doctorsEnv) doctorsGetAllHandler(simulation bool) any {
	return handlers.QueryHandler[models.DoctorsRow]("doctors-get-all", models.QueryAll, "/doctors/all", QueryMap, env.Interface, libRequest.Query, true, simulation, nil)
}
