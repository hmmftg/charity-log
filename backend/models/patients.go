package models

import (
	"time"
	"github.com/hmmftg/requestCore/libQuery"
)

// PatientRequest represents the request structure for patient operations
type PatientRequest struct {
	ID                      string    `json:"id"`
	ProfileID               string    `json:"profile_id"`
	PatientID               string    `json:"patient_id"`
	EmergencyContactName    string    `json:"emergency_contact_name"`
	EmergencyContactPhone   string    `json:"emergency_contact_phone"`
	Allergies               string    `json:"allergies"`
	CurrentMedications      string    `json:"current_medications"`
	InsuranceInfo           string    `json:"insurance_info"`
	MedicalHistory          string    `json:"medical_history"`
	BloodType               string    `json:"blood_type"`
	Height                  float64   `json:"height"`
	Weight                  float64   `json:"weight"`
	DateOfBirth             time.Time `json:"date_of_birth"`
	Gender                  string    `json:"gender"`
	Address                 string    `json:"address"`
	Phone                   string    `json:"phone"`
	Email                   string    `json:"email"`
	FullName                string    `json:"full_name"`
}

// PatientResponse represents the response structure for patient operations
type PatientResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

// PatientRow represents a single patient record
type PatientRow struct {
	ID                      string    `form:"id" uri:"id" json:"id" db:"ID"`
	ProfileID               string    `json:"profile_id" db:"PROFILE_ID"`
	PatientID               string    `json:"patient_id" db:"PATIENT_ID"`
	EmergencyContactName    string    `json:"emergency_contact_name" db:"EMERGENCY_CONTACT_NAME"`
	EmergencyContactPhone   string    `json:"emergency_contact_phone" db:"EMERGENCY_CONTACT_PHONE"`
	Allergies               string    `json:"allergies" db:"ALLERGIES"`
	CurrentMedications      string    `json:"current_medications" db:"CURRENT_MEDICATIONS"`
	InsuranceInfo           string    `json:"insurance_info" db:"INSURANCE_INFO"`
	MedicalHistory          string    `json:"medical_history" db:"MEDICAL_HISTORY"`
	BloodType               string    `json:"blood_type" db:"BLOOD_TYPE"`
	Height                  float64   `json:"height" db:"HEIGHT"`
	Weight                  float64   `json:"weight" db:"WEIGHT"`
	DateOfBirth             time.Time `json:"date_of_birth" db:"DATE_OF_BIRTH"`
	Gender                  string    `json:"gender" db:"GENDER"`
	Address                 string    `json:"address" db:"ADDRESS"`
	Phone                   string    `json:"phone" db:"PHONE"`
	Email                   string    `json:"email" db:"EMAIL"`
	FullName                string    `json:"full_name" db:"FULL_NAME"`
	CreatedAt               time.Time `json:"created_at" db:"CREATED_AT"`
	UpdatedAt               time.Time `json:"updated_at" db:"UPDATED_AT"`
}

// VisitRequest represents the request structure for visit operations
type VisitRequest struct {
	ID                  string    `json:"id"`
	PatientID           string    `json:"patient_id"`
	DoctorID            string    `json:"doctor_id"`
	VisitType           string    `json:"visit_type"`
	VisitDate           time.Time `json:"visit_date"`
	Status              string    `json:"status"`
	ChiefComplaint      string    `json:"chief_complaint"`
	Symptoms            string    `json:"symptoms"`
	Diagnosis           string    `json:"diagnosis"`
	TreatmentPlan        string    `json:"treatment_plan"`
	MedicationsPrescribed string  `json:"medications_prescribed"`
	Notes               string    `json:"notes"`
	FollowUpDate        time.Time `json:"follow_up_date"`
	VitalSigns          string    `json:"vital_signs"`
	ExaminationNotes    string    `json:"examination_notes"`
	LabResults          string    `json:"lab_results"`
}

// VisitResponse represents the response structure for visit operations
type VisitResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

// VisitRow represents a single visit record
type VisitRow struct {
	ID                  string    `form:"id" uri:"id" json:"id" db:"ID"`
	PatientID           string    `json:"patient_id" db:"PATIENT_ID"`
	DoctorID            string    `json:"doctor_id" db:"DOCTOR_ID"`
	VisitType           string    `json:"visit_type" db:"VISIT_TYPE"`
	VisitDate           time.Time `json:"visit_date" db:"VISIT_DATE"`
	Status              string    `json:"status" db:"STATUS"`
	ChiefComplaint      string    `json:"chief_complaint" db:"CHIEF_COMPLAINT"`
	Symptoms            string    `json:"symptoms" db:"SYMPTOMS"`
	Diagnosis           string    `json:"diagnosis" db:"DIAGNOSIS"`
	TreatmentPlan        string    `json:"treatment_plan" db:"TREATMENT_PLAN"`
	MedicationsPrescribed string  `json:"medications_prescribed" db:"MEDICATIONS_PRESCRIBED"`
	Notes               string    `json:"notes" db:"NOTES"`
	FollowUpDate        time.Time `json:"follow_up_date" db:"FOLLOW_UP_DATE"`
	VitalSigns          string    `json:"vital_signs" db:"VITAL_SIGNS"`
	ExaminationNotes    string    `json:"examination_notes" db:"EXAMINATION_NOTES"`
	LabResults          string    `json:"lab_results" db:"LAB_RESULTS"`
	CreatedAt           time.Time `json:"created_at" db:"CREATED_AT"`
	UpdatedAt           time.Time `json:"updated_at" db:"UPDATED_AT"`
}

// VisitImageRequest represents the request structure for visit image operations
type VisitImageRequest struct {
	ID          string `json:"id"`
	VisitID     string `json:"visit_id"`
	ImageURL    string `json:"image_url"`
	Description string `json:"description"`
	ImageType   string `json:"image_type"`
	FileName    string `json:"file_name"`
	FileSize    int64  `json:"file_size"`
	MimeType    string `json:"mime_type"`
}

// VisitImageResponse represents the response structure for visit image operations
type VisitImageResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

// VisitImageRow represents a single visit image record
type VisitImageRow struct {
	ID          string    `form:"id" uri:"id" json:"id" db:"ID"`
	VisitID     string    `json:"visit_id" db:"VISIT_ID"`
	ImageURL    string    `json:"image_url" db:"IMAGE_URL"`
	Description string    `json:"description" db:"DESCRIPTION"`
	ImageType   string    `json:"image_type" db:"IMAGE_TYPE"`
	FileName    string    `json:"file_name" db:"FILE_NAME"`
	FileSize    int64     `json:"file_size" db:"FILE_SIZE"`
	MimeType    string    `json:"mime_type" db:"MIME_TYPE"`
	CreatedAt   time.Time `json:"created_at" db:"CREATED_AT"`
}

// TherapyScheduleRequest represents the request structure for therapy schedule operations
type TherapyScheduleRequest struct {
	ID           string    `json:"id"`
	PatientID    string    `json:"patient_id"`
	DoctorID     string    `json:"doctor_id"`
	TherapyType  string    `json:"therapy_type"`
	Description  string    `json:"description"`
	StartDate    time.Time `json:"start_date"`
	EndDate      time.Time `json:"end_date"`
	Frequency    string    `json:"frequency"`
	Instructions string    `json:"instructions"`
	IsActive     bool      `json:"is_active"`
	Duration     int       `json:"duration"`
	SessionCount int       `json:"session_count"`
}

// TherapyScheduleResponse represents the response structure for therapy schedule operations
type TherapyScheduleResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

// TherapyScheduleRow represents a single therapy schedule record
type TherapyScheduleRow struct {
	ID           string    `form:"id" uri:"id" json:"id" db:"ID"`
	PatientID    string    `json:"patient_id" db:"PATIENT_ID"`
	DoctorID     string    `json:"doctor_id" db:"DOCTOR_ID"`
	TherapyType  string    `json:"therapy_type" db:"THERAPY_TYPE"`
	Description  string    `json:"description" db:"DESCRIPTION"`
	StartDate    time.Time `json:"start_date" db:"START_DATE"`
	EndDate      time.Time `json:"end_date" db:"END_DATE"`
	Frequency    string    `json:"frequency" db:"FREQUENCY"`
	Instructions string    `json:"instructions" db:"INSTRUCTIONS"`
	IsActive     bool      `json:"is_active" db:"IS_ACTIVE"`
	Duration     int       `json:"duration" db:"DURATION"`
	SessionCount int       `json:"session_count" db:"SESSION_COUNT"`
	CreatedAt    time.Time `json:"created_at" db:"CREATED_AT"`
	UpdatedAt    time.Time `json:"updated_at" db:"UPDATED_AT"`
}

// MedicationRequest represents the request structure for medication operations
type MedicationRequest struct {
	ID              string    `json:"id"`
	VisitID         string    `json:"visit_id"`
	MedicationName  string    `json:"medication_name"`
	Dosage          string    `json:"dosage"`
	Frequency       string    `json:"frequency"`
	Duration        string    `json:"duration"`
	Instructions    string    `json:"instructions"`
	StartDate       time.Time `json:"start_date"`
	EndDate         time.Time `json:"end_date"`
	IsActive        bool      `json:"is_active"`
	SideEffects     string    `json:"side_effects"`
	Contraindications string  `json:"contraindications"`
}

// MedicationResponse represents the response structure for medication operations
type MedicationResponse struct {
	Result libQuery.DmlResult `json:"result"`
}

// MedicationRow represents a single medication record
type MedicationRow struct {
	ID              string    `form:"id" uri:"id" json:"id" db:"ID"`
	VisitID         string    `json:"visit_id" db:"VISIT_ID"`
	MedicationName  string    `json:"medication_name" db:"MEDICATION_NAME"`
	Dosage          string    `json:"dosage" db:"DOSAGE"`
	Frequency       string    `json:"frequency" db:"FREQUENCY"`
	Duration        string    `json:"duration" db:"DURATION"`
	Instructions    string    `json:"instructions" db:"INSTRUCTIONS"`
	StartDate       time.Time `json:"start_date" db:"START_DATE"`
	EndDate         time.Time `json:"end_date" db:"END_DATE"`
	IsActive        bool      `json:"is_active" db:"IS_ACTIVE"`
	SideEffects     string    `json:"side_effects" db:"SIDE_EFFECTS"`
	Contraindications string  `json:"contraindications" db:"CONTRAINDICATIONS"`
	CreatedAt       time.Time `json:"created_at" db:"CREATED_AT"`
	UpdatedAt       time.Time `json:"updated_at" db:"UPDATED_AT"`
}

// DashboardStatsRequest represents the request structure for dashboard statistics
type DashboardStatsRequest struct {
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	DoctorID  string    `json:"doctor_id"`
}

// DashboardStatsResponse represents the response structure for dashboard statistics
type DashboardStatsResponse struct {
	TotalPatients     int `json:"total_patients"`
	TotalVisits       int `json:"total_visits"`
	ActiveTherapies   int `json:"active_therapies"`
	PendingFollowUps  int `json:"pending_follow_ups"`
	MonthlyVisits     []MonthlyVisitStats `json:"monthly_visits"`
	VisitTypes        []VisitTypeStats `json:"visit_types"`
	TopDiagnoses      []DiagnosisStats `json:"top_diagnoses"`
}

// MonthlyVisitStats represents monthly visit statistics
type MonthlyVisitStats struct {
	Month string `json:"month"`
	Count int    `json:"count"`
}

// VisitTypeStats represents visit type statistics
type VisitTypeStats struct {
	Type  string `json:"type"`
	Count int    `json:"count"`
}

// DiagnosisStats represents diagnosis statistics
type DiagnosisStats struct {
	Diagnosis string `json:"diagnosis"`
	Count     int    `json:"count"`
}

// Query constants
const (
	QuerySingle = "single"
	QueryAll    = "all"
	QueryStats  = "stats"
)
