package patients

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

type patientsEnv struct {
	Params    libParams.ParamInterface
	Interface requestCore.RequestCoreInterface
}

func (env *patientsEnv) GetInterface() requestCore.RequestCoreInterface {
	return env.Interface
}
func (env *patientsEnv) GetParams() libParams.ParamInterface {
	return env.Params
}
func (env *patientsEnv) SetInterface(core requestCore.RequestCoreInterface) {
	env.Interface = core
}
func (env *patientsEnv) SetParams(parameters libParams.ParamInterface) {
	env.Params = parameters
}

type patientsHandler struct {
	Name string
}

// returns handler title
func (h patientsHandler) Parameters() handlers.HandlerParameters {
	return handlers.HandlerParameters{
		Title:          "patients",
		Body:           libRequest.JSON,
		ValidateHeader: true,
		SaveToRequest:  false,
		Path:           "/patients",
	}
}

// runs after validating request
func (h patientsHandler) Initializer(req handlers.HandlerRequest[models.PatientRequest, *models.PatientResponse]) error {
	return nil
}

// Handler is the main method that handles request and returns the response
func (h patientsHandler) Handler(req handlers.HandlerRequest[models.PatientRequest, *models.PatientResponse]) (*models.PatientResponse, error) {
	switch h.Name {
	case "patients-post":
		result, err := req.Core.GetDB().InsertRow(`--sql
			INSERT INTO public.patients (
				profile_id, patient_id, emergency_contact_name, emergency_contact_phone,
				allergies, current_medications, insurance_info, medical_history,
				blood_type, height, weight, date_of_birth, gender, address, phone, email, full_name
			) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12, :13, :14, :15, :16, :17)
		`, req.Request.ProfileID, req.Request.PatientID, req.Request.EmergencyContactName,
			req.Request.EmergencyContactPhone, req.Request.Allergies, req.Request.CurrentMedications,
			req.Request.InsuranceInfo, req.Request.MedicalHistory, req.Request.BloodType,
			req.Request.Height, req.Request.Weight, req.Request.DateOfBirth, req.Request.Gender,
			req.Request.Address, req.Request.Phone, req.Request.Email, req.Request.FullName)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_INSERT", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.PatientResponse{
			Result: dmlResult,
		}
		return req.Response, nil

	case "patients-put":
		result, err := req.Core.GetDB().InsertRow(`--sql
			UPDATE public.patients SET
				emergency_contact_name = :1,
				emergency_contact_phone = :2,
				allergies = :3,
				current_medications = :4,
				insurance_info = :5,
				medical_history = :6,
				blood_type = :7,
				height = :8,
				weight = :9,
				date_of_birth = :10,
				gender = :11,
				address = :12,
				phone = :13,
				email = :14,
				full_name = :15,
				updated_at = NOW()
			WHERE id = :16
		`, req.Request.EmergencyContactName, req.Request.EmergencyContactPhone,
			req.Request.Allergies, req.Request.CurrentMedications, req.Request.InsuranceInfo,
			req.Request.MedicalHistory, req.Request.BloodType, req.Request.Height,
			req.Request.Weight, req.Request.DateOfBirth, req.Request.Gender,
			req.Request.Address, req.Request.Phone, req.Request.Email, req.Request.FullName,
			req.Request.ID)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_UPDATE", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.PatientResponse{
			Result: dmlResult,
		}
		return req.Response, nil

	case "patients-delete":
		result, err := req.Core.GetDB().InsertRow(`--sql
			DELETE FROM public.patients WHERE id = :1
		`, req.Request.ID)
		if err != nil {
			return nil, libError.New(http.StatusInternalServerError, "ERROR_DELETE", err.Error())
		}
		dmlResult := libQuery.GetDmlResult(result, nil)
		req.Response = &models.PatientResponse{
			Result: dmlResult,
		}
		return req.Response, nil
	}
	return nil, libError.NewWithDescription(http.StatusInternalServerError, "UNKNOWN_METHOD", "method not defined: %s", h.Name)
}

// Simulation returns a simulated response
func (h patientsHandler) Simulation(req handlers.HandlerRequest[models.PatientRequest, *models.PatientResponse]) (*models.PatientResponse, error) {
	return req.Response, nil
}

// runs after sending back response
func (h patientsHandler) Finalizer(req handlers.HandlerRequest[models.PatientRequest, *models.PatientResponse]) {
}

// patientsPostHandler godoc
// @Summary Create a new patient
// @Description Create a new patient record
// @Tags patients
// @Accept json
// @Produce json
// @Param Request-Id header string true "Request ID"
// @Param patient body models.PatientRequest true "Patient information"
// @Router /patients [post]
// @Security OAuth2Password
// @Success 200 {object} models.PatientResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env patientsEnv) patientsPostHandler(simulation bool) any {
	return handlers.BaseHandler[models.PatientRequest, *models.PatientResponse, patientsHandler](env.Interface, patientsHandler{Name: "patients-post"}, simulation)
}

// patientsPutHandler godoc
// @Summary Update a patient
// @Description Update an existing patient record
// @Tags patients
// @Accept json
// @Produce json
// @Param Request-Id header string true "Request ID"
// @Param id path string true "Patient ID"
// @Param patient body models.PatientRequest true "Patient information"
// @Router /patients/:id [put]
// @Security OAuth2Password
// @Success 200 {object} models.PatientResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env patientsEnv) patientsPutHandler(simulation bool) any {
	return handlers.BaseHandler[models.PatientRequest, *models.PatientResponse, patientsHandler](env.Interface, patientsHandler{Name: "patients-put"}, simulation)
}

// patientsDeleteHandler godoc
// @Summary Delete a patient
// @Description Delete a patient record
// @Tags patients
// @Accept json
// @Produce json
// @Param Request-Id header string true "Request ID"
// @Param id path string true "Patient ID"
// @Router /patients/:id [delete]
// @Security OAuth2Password
// @Success 200 {object} models.PatientResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env patientsEnv) patientsDeleteHandler(simulation bool) any {
	return handlers.BaseHandler[models.PatientRequest, *models.PatientResponse, patientsHandler](env.Interface, patientsHandler{Name: "patients-delete"}, simulation)
}

// patientsGetHandler godoc
// @Summary Get a patient by ID
// @Description Get a single patient record by ID
// @Tags patients
// @Accept json
// @Produce json
// @Param Request-Id header string true "Request ID"
// @Param id path string true "Patient ID"
// @Router /patients/:id [get]
// @Security OAuth2Password
// @Success 200 {object} []models.PatientRow
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env patientsEnv) patientsGetHandler(simulation bool) any {
	return handlers.QueryHandlerWithCaching[models.PatientRow](
		"patients-get", models.QuerySingle, "/patients/:id",
		QueryMap, env.Interface, libRequest.URI,
		true, simulation, nil,
		&handlers.CachingArgs{
			Cache:       true,
			CacheMaxAge: time.Hour,
		},
	)
}

// patientsGetAllHandler godoc
// @Summary Get all patients
// @Description Get all patient records
// @Tags patients
// @Accept json
// @Produce json
// @Param Request-Id header string true "Request ID"
// @Router /patients/all [get]
// @Security OAuth2Password
// @Success 200 {object} []models.PatientRow
// @Failure 400 {object} response.ErrorResponse
// @Failure 401 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
func (env patientsEnv) patientsGetAllHandler(simulation bool) any {
	return handlers.QueryHandler[models.PatientRow]("patients-get-all", models.QueryAll, "/patients/all", QueryMap, env.Interface, libRequest.Query, true, simulation, nil)
}
