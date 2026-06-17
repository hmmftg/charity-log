package ums

import (
	"net/http"
	"time"

	"github.com/hmmftg/requestCore/handlers"
	"github.com/hmmftg/requestCore/libError"
	"github.com/hmmftg/requestCore/libRequest"
)

type RefreshRequest struct{}

type RefreshResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refreshToken"`
}

type RefreshHandler struct {
	Name string
}

func (env umsEnv) umsRefresh(simulation bool) any {
	return handlers.BaseHandler(env.Interface, RefreshHandler{Name: "ums-refresh"}, simulation)
}

func (h RefreshHandler) Parameters() handlers.HandlerParameters {
	return handlers.HandlerParameters{
		Title:          "ums",
		Body:           libRequest.NoBinding,
		ValidateHeader: false,
		SaveToRequest:  false,
		Path:           "/ums",
	}
}

func (h RefreshHandler) Initializer(req handlers.HandlerRequest[RefreshRequest, *RefreshResponse]) error {
	return nil
}

func (h RefreshHandler) Handler(req handlers.HandlerRequest[RefreshRequest, *RefreshResponse]) (*RefreshResponse, error) {
	switch h.Name {
	case "ums-refresh":
		token, err := GetToken(req.W)
		if err != nil {
			return nil, err
		}

		user, err := ValidateJwtToken(req.Core, token)
		if err != nil {
			return nil, err
		}

		dt := time.Now().UTC()
		accessToken, err := GenerateToken(dt, 36000, "simple",
			[]string{user.BankCode, user.BranchCode, user.PersonID, user.UserName},
			user.UserId)
		if err != nil {
			return nil, libError.New(http.StatusBadRequest, "ERROR_GENERATE_TOKEN", err.Error())
		}

		refreshToken, err := GenerateToken(dt, 72000, "simple",
			[]string{user.BankCode, user.BranchCode, user.PersonID, user.UserName},
			user.UserId)
		if err != nil {
			return nil, libError.New(http.StatusBadRequest, "ERROR_GENERATE_TOKEN", err.Error())
		}

		return &RefreshResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}, nil
	}

	return nil, libError.NewWithDescription(http.StatusInternalServerError, "UNKNOWN_METHOD", "method not defined: %s", h.Name)
}

func (h RefreshHandler) Simulation(req handlers.HandlerRequest[RefreshRequest, *RefreshResponse]) (*RefreshResponse, error) {
	return req.Response, nil
}

func (h RefreshHandler) Finalizer(req handlers.HandlerRequest[RefreshRequest, *RefreshResponse]) {}
