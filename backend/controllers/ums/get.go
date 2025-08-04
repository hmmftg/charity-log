package ums

import (
	"net/http"

	"github.com/hmmftg/requestCore/handlers"
	"github.com/hmmftg/requestCore/libError"
	"github.com/hmmftg/requestCore/libRequest"
)

type CheckRequest struct {
}

type CheckResponse struct {
	Authenticated bool     `json:"authenticated"`
	Roles         []string `json:"roles"`
	Flags         []string `json:"flags"`
	BankCode      string   `json:"bank"`
	BranchCode    string   `json:"branch"`
	PersonID      string   `json:"person"`
	UserId        string   `json:"id"`
	UserName      string   `json:"name"`
}

func (u UserData) GetCheckData() *CheckResponse {
	return &CheckResponse{
		BankCode:      u.BankCode,
		BranchCode:    u.BranchCode,
		PersonID:      u.PersonID,
		UserId:        u.UserId,
		UserName:      u.UserName,
		Authenticated: true,
		Roles:         []string{"admin"},
	}
}

func (u UserData) GetPermissonData() *CheckResponse {
	return &CheckResponse{
		Roles: []string{"admin"},
	}
}

func (u UserData) GetIDData() *CheckResponse {
	return &CheckResponse{
		BankCode:      u.BankCode,
		BranchCode:    u.BranchCode,
		PersonID:      u.PersonID,
		UserId:        u.UserId,
		UserName:      u.UserName,
		Authenticated: true,
		Roles:         []string{"admin"},
	}
}

type CheckHandler struct {
	Name   string
	UserID string
}

func (env umsEnv) umsCheck(simulation bool) any {
	return handlers.BaseHandler(env.Interface, CheckHandler{Name: "ums-check"}, simulation)
}

func (env umsEnv) umsPermissions(simulation bool) any {
	return handlers.BaseHandler(env.Interface, CheckHandler{Name: "ums-perm"}, simulation)
}

func (env umsEnv) umsGetUser(simulation bool) any {
	return handlers.BaseHandler(env.Interface, CheckHandler{Name: "ums-get-id"}, simulation)
}

// returns handler title
//
//	Request Bodymode
//	and validate header option
//	and save to request table option
//	and url path of handler
func (h CheckHandler) Parameters() handlers.HandlerParameters {
	return handlers.HandlerParameters{
		Title:          "ums",
		Body:           libRequest.NoBinding,
		ValidateHeader: true,
		SaveToRequest:  false,
		Path:           "/ums",
	}
}

// runs after validating request
func (h CheckHandler) Initializer(req handlers.HandlerRequest[CheckRequest, *CheckResponse]) error {
	return nil
}

// Handler is the main method that handles request and returns the response,
// if there is a need for calling another api this is the place to call that api.
func (h CheckHandler) Handler(req handlers.HandlerRequest[CheckRequest, *CheckResponse]) (*CheckResponse, error) {
	token, err := GetToken(req.W)
	if err != nil {
		return nil, err
	}
	usr, err := ValidateJwtToken(req.Core, token)
	if err != nil {
		return nil, err
	}

	switch h.Name {
	case "ums-check":
		return usr.GetCheckData(), nil
	case "ums-perm":
		return usr.GetPermissonData(), nil
	case "ums-get-id":
		return usr.GetIDData(), nil
	}
	return nil, libError.NewWithDescription(http.StatusInternalServerError, "UNKNOWN_METHOD", "method not defined: %s", h.Name)
}

// Simulation returns a simulated response.
func (h CheckHandler) Simulation(req handlers.HandlerRequest[CheckRequest, *CheckResponse]) (*CheckResponse, error) {
	return req.Response, nil
}

// runs after sending back response
func (h CheckHandler) Finalizer(req handlers.HandlerRequest[CheckRequest, *CheckResponse]) {
}
