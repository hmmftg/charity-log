package patients

import (
	"healthcare/models"

	"github.com/hmmftg/requestCore/libQuery"
)

var QueryMap = map[string]libQuery.QueryCommand{
	models.QuerySingle: {
		Name: models.QuerySingle,
		Command: `--sql
			SELECT 
				p.id,
				p.profile_id,
				p.patient_id,
				p.emergency_contact_name,
				p.emergency_contact_phone,
				p.allergies,
				p.current_medications,
				p.insurance_info,
				p.medical_history,
				p.blood_type,
				p.height,
				p.weight,
				p.date_of_birth,
				p.gender,
				p.address,
				p.phone,
				p.email,
				p.full_name,
				p.created_at,
				p.updated_at
			FROM public.patients p
			WHERE p.id = :1`,
		Type: libQuery.QuerySingle,
		Args: []any{"id"},
	},
	models.QueryAll: {
		Name: models.QueryAll,
		Command: `--sql
			SELECT 
				p.id,
				p.profile_id,
				p.patient_id,
				p.emergency_contact_name,
				p.emergency_contact_phone,
				p.allergies,
				p.current_medications,
				p.insurance_info,
				p.medical_history,
				p.blood_type,
				p.height,
				p.weight,
				p.date_of_birth,
				p.gender,
				p.address,
				p.phone,
				p.email,
				p.full_name,
				p.created_at,
				p.updated_at
			FROM public.patients p
			ORDER BY p.created_at DESC`,
		Type: libQuery.QueryAll,
	},
}
