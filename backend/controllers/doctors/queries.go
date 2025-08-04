package doctors

import (
	"healthcare/models"

	"github.com/hmmftg/requestCore/libQuery"
)

var (
	QueryMap = map[string]libQuery.QueryCommand{
		models.QuerySingle: {
			Name:    models.QuerySingle,
			Command: "select * from doctors where id = :1",
			Type:    libQuery.QuerySingle,
			Args:    []any{"id"},
		},
		models.QueryAll: {
			Name:    models.QueryAll,
			Command: "select * from doctors order by id",
			Type:    libQuery.QueryAll,
		},
	}
)
