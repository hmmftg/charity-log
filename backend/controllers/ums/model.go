package ums

import (
	"healthcare/models"

	"github.com/hmmftg/requestCore"
	"github.com/hmmftg/requestCore/libParams"
)

type umsEnv struct {
	Params    *libParams.ApplicationParams[models.ApplicationParams]
	Interface requestCore.RequestCoreInterface
}
