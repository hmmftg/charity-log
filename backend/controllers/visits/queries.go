package visits

import (
	"database/sql"
	"fmt"
	"time"
)

// VisitQueries contains all database queries for visits
type VisitQueries struct {
	db *sql.DB
}

// NewVisitQueries creates a new instance of VisitQueries
func NewVisitQueries(db *sql.DB) *VisitQueries {
	return &VisitQueries{db: db}
}

// CreateVisit inserts a new visit into the database
func (q *VisitQueries) CreateVisit(patientID, doctorID int, visitType, diagnosis, treatment, notes, status string, visitDate time.Time) (int64, error) {
	query := `
		INSERT INTO visits (patient_id, doctor_id, visit_type, visit_date, status, diagnosis, treatment, notes, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		RETURNING id
	`

	var id int64
	err := q.db.QueryRow(query, patientID, doctorID, visitType, visitDate, status, diagnosis, treatment, notes, time.Now(), time.Now()).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create visit: %w", err)
	}

	return id, nil
}

// GetVisitByID retrieves a visit by its ID
func (q *VisitQueries) GetVisitByID(id int) (*VisitRow, error) {
	query := `
		SELECT id, patient_id, doctor_id, visit_type, visit_date, status, diagnosis, treatment, notes, created_at, updated_at
		FROM visits
		WHERE id = $1
	`

	visit := &VisitRow{}
	err := q.db.QueryRow(query, id).Scan(
		&visit.ID,
		&visit.PatientID,
		&visit.DoctorID,
		&visit.VisitType,
		&visit.VisitDate,
		&visit.Status,
		&visit.Diagnosis,
		&visit.Treatment,
		&visit.Notes,
		&visit.CreatedAt,
		&visit.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("visit not found")
		}
		return nil, fmt.Errorf("failed to get visit: %w", err)
	}

	return visit, nil
}

// UpdateVisit updates an existing visit
func (q *VisitQueries) UpdateVisit(id int, patientID, doctorID int, visitType, diagnosis, treatment, notes, status string, visitDate time.Time) error {
	query := `
		UPDATE visits
		SET patient_id = $2, doctor_id = $3, visit_type = $4, visit_date = $5, status = $6, diagnosis = $7, treatment = $8, notes = $9, updated_at = $10
		WHERE id = $1
	`

	result, err := q.db.Exec(query, id, patientID, doctorID, visitType, visitDate, status, diagnosis, treatment, notes, time.Now())
	if err != nil {
		return fmt.Errorf("failed to update visit: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("visit not found")
	}

	return nil
}

// DeleteVisit deletes a visit by its ID
func (q *VisitQueries) DeleteVisit(id int) error {
	query := `DELETE FROM visits WHERE id = $1`

	result, err := q.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete visit: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("visit not found")
	}

	return nil
}

// GetVisits retrieves visits with optional filters and pagination
func (q *VisitQueries) GetVisits(patientID, doctorID *int, status, visitType *string, page, limit int) ([]VisitRow, int, error) {
	// Build the base query
	baseQuery := `
		SELECT id, patient_id, doctor_id, visit_type, visit_date, status, diagnosis, treatment, notes, created_at, updated_at
		FROM visits
		WHERE 1=1
	`

	countQuery := `SELECT COUNT(*) FROM visits WHERE 1=1`

	args := []interface{}{}
	argIndex := 1

	// Add filters
	if patientID != nil {
		baseQuery += fmt.Sprintf(" AND patient_id = $%d", argIndex)
		countQuery += fmt.Sprintf(" AND patient_id = $%d", argIndex)
		args = append(args, *patientID)
		argIndex++
	}

	if doctorID != nil {
		baseQuery += fmt.Sprintf(" AND doctor_id = $%d", argIndex)
		countQuery += fmt.Sprintf(" AND doctor_id = $%d", argIndex)
		args = append(args, *doctorID)
		argIndex++
	}

	if status != nil {
		baseQuery += fmt.Sprintf(" AND status = $%d", argIndex)
		countQuery += fmt.Sprintf(" AND status = $%d", argIndex)
		args = append(args, *status)
		argIndex++
	}

	if visitType != nil {
		baseQuery += fmt.Sprintf(" AND visit_type = $%d", argIndex)
		countQuery += fmt.Sprintf(" AND visit_type = $%d", argIndex)
		args = append(args, *visitType)
		argIndex++
	}

	// Add ordering and pagination
	baseQuery += " ORDER BY visit_date DESC"
	if limit > 0 {
		baseQuery += fmt.Sprintf(" LIMIT $%d", argIndex)
		args = append(args, limit)
		argIndex++

		if page > 1 {
			offset := (page - 1) * limit
			baseQuery += fmt.Sprintf(" OFFSET $%d", argIndex)
			args = append(args, offset)
		}
	}

	// Get total count
	var total int
	err := q.db.QueryRow(countQuery, args...).Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get visits count: %w", err)
	}

	// Get visits
	rows, err := q.db.Query(baseQuery, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get visits: %w", err)
	}
	defer rows.Close()

	var visits []VisitRow
	for rows.Next() {
		var visit VisitRow
		err := rows.Scan(
			&visit.ID,
			&visit.PatientID,
			&visit.DoctorID,
			&visit.VisitType,
			&visit.VisitDate,
			&visit.Status,
			&visit.Diagnosis,
			&visit.Treatment,
			&visit.Notes,
			&visit.CreatedAt,
			&visit.UpdatedAt,
		)
		if err != nil {
			return nil, 0, fmt.Errorf("failed to scan visit: %w", err)
		}
		visits = append(visits, visit)
	}

	if err = rows.Err(); err != nil {
		return nil, 0, fmt.Errorf("error iterating visits: %w", err)
	}

	return visits, total, nil
}

// GetVisitsByPatientID retrieves all visits for a specific patient
func (q *VisitQueries) GetVisitsByPatientID(patientID int) ([]VisitRow, error) {
	query := `
		SELECT id, patient_id, doctor_id, visit_type, visit_date, status, diagnosis, treatment, notes, created_at, updated_at
		FROM visits
		WHERE patient_id = $1
		ORDER BY visit_date DESC
	`

	rows, err := q.db.Query(query, patientID)
	if err != nil {
		return nil, fmt.Errorf("failed to get visits by patient ID: %w", err)
	}
	defer rows.Close()

	var visits []VisitRow
	for rows.Next() {
		var visit VisitRow
		err := rows.Scan(
			&visit.ID,
			&visit.PatientID,
			&visit.DoctorID,
			&visit.VisitType,
			&visit.VisitDate,
			&visit.Status,
			&visit.Diagnosis,
			&visit.Treatment,
			&visit.Notes,
			&visit.CreatedAt,
			&visit.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan visit: %w", err)
		}
		visits = append(visits, visit)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating visits: %w", err)
	}

	return visits, nil
}

// GetVisitsByDoctorID retrieves all visits for a specific doctor
func (q *VisitQueries) GetVisitsByDoctorID(doctorID int) ([]VisitRow, error) {
	query := `
		SELECT id, patient_id, doctor_id, visit_type, visit_date, status, diagnosis, treatment, notes, created_at, updated_at
		FROM visits
		WHERE doctor_id = $1
		ORDER BY visit_date DESC
	`

	rows, err := q.db.Query(query, doctorID)
	if err != nil {
		return nil, fmt.Errorf("failed to get visits by doctor ID: %w", err)
	}
	defer rows.Close()

	var visits []VisitRow
	for rows.Next() {
		var visit VisitRow
		err := rows.Scan(
			&visit.ID,
			&visit.PatientID,
			&visit.DoctorID,
			&visit.VisitType,
			&visit.VisitDate,
			&visit.Status,
			&visit.Diagnosis,
			&visit.Treatment,
			&visit.Notes,
			&visit.CreatedAt,
			&visit.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan visit: %w", err)
		}
		visits = append(visits, visit)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating visits: %w", err)
	}

	return visits, nil
}

// VisitRow represents a visit row from the database
type VisitRow struct {
	ID        int       `json:"id"`
	PatientID int       `json:"patient_id"`
	DoctorID  int       `json:"doctor_id"`
	VisitType string    `json:"visit_type"`
	VisitDate time.Time `json:"visit_date"`
	Status    string    `json:"status"`
	Diagnosis string    `json:"diagnosis"`
	Treatment string    `json:"treatment"`
	Notes     string    `json:"notes"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
