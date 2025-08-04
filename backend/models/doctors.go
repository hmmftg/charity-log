package models

import (
	"github.com/hmmftg/requestCore/libQuery"
)

type DoctorsRequest struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type DoctorsResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

type DoctorsRow struct {
	ID   string `form:"id" uri:"id" json:"id" db:"ID"`
	Name string `json:"name" db:"NAME"`
}

const (
	QuerySingle = "single"
	QueryAll    = "all"
)
