export interface User {
  id: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_history?: string;
  allergies?: string;
  current_medications?: string;
  created_at: string;
  updated_at: string;
}

export interface Visit {
  id: string;
  patient_id: string;
  doctor_id: string;
  visit_type: 'dental' | 'general' | 'therapy' | 'emergency';
  visit_date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  chief_complaint?: string;
  diagnosis?: string;
  treatment_plan?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: User;
}

export interface Treatment {
  id: string;
  visit_id: string;
  treatment_type: string;
  description: string;
  medications?: string;
  dosage?: string;
  instructions?: string;
  follow_up_date?: string;
  cost?: number;
  created_at: string;
  updated_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  record_type: 'lab_result' | 'xray' | 'prescription' | 'note' | 'image';
  title: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  type: 'consultation' | 'therapy' | 'follow_up' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: User;
}

export interface DashboardStats {
  total_patients: number;
  total_visits_today: number;
  total_visits_month: number;
  pending_appointments: number;
  completed_treatments: number;
}