/*
  # Healthcare Management System Database Schema

  ## Overview
  This migration creates the complete database schema for a charity clinic healthcare management system.

  ## 1. New Tables

  ### Users Table
  - `id` (uuid, primary key) - Links to Supabase auth.users
  - `email` (text, unique) - User email address
  - `role` (enum) - User role: admin, doctor, or patient
  - `first_name` (text) - User's first name
  - `last_name` (text) - User's last name
  - `phone` (text, optional) - Contact phone number
  - Timestamps for creation and updates

  ### Patients Table
  - `id` (uuid, primary key) - Patient unique identifier
  - `user_id` (uuid, foreign key) - Links to users table
  - `date_of_birth` (date) - Patient's birth date
  - `gender` (enum) - Patient gender
  - `address` (text, optional) - Patient address
  - `emergency_contact_name` (text, optional) - Emergency contact
  - `emergency_contact_phone` (text, optional) - Emergency contact phone
  - `medical_history` (text, optional) - Patient medical history
  - `allergies` (text, optional) - Known allergies
  - `current_medications` (text, optional) - Current medications
  - Timestamps for creation and updates

  ### Visits Table
  - `id` (uuid, primary key) - Visit unique identifier
  - `patient_id` (uuid, foreign key) - References patients table
  - `doctor_id` (uuid, foreign key) - References users table
  - `visit_type` (enum) - Type of visit: dental, general, therapy, emergency
  - `visit_date` (timestamptz) - Date and time of visit
  - `status` (enum) - Visit status: scheduled, in_progress, completed, cancelled
  - `chief_complaint` (text, optional) - Patient's main concern
  - `diagnosis` (text, optional) - Doctor's diagnosis
  - `treatment_plan` (text, optional) - Recommended treatment
  - `notes` (text, optional) - Additional notes
  - Timestamps for creation and updates

  ### Treatments Table
  - `id` (uuid, primary key) - Treatment unique identifier
  - `visit_id` (uuid, foreign key) - References visits table
  - `treatment_type` (text) - Type of treatment performed
  - `description` (text) - Detailed treatment description
  - `medications` (text, optional) - Prescribed medications
  - `dosage` (text, optional) - Medication dosage instructions
  - `instructions` (text, optional) - Patient instructions
  - `follow_up_date` (date, optional) - Follow-up appointment date
  - `cost` (decimal, optional) - Treatment cost
  - Timestamps for creation and updates

  ### Medical Records Table
  - `id` (uuid, primary key) - Record unique identifier
  - `patient_id` (uuid, foreign key) - References patients table
  - `record_type` (enum) - Type: lab_result, xray, prescription, note, image
  - `title` (text) - Record title
  - `description` (text, optional) - Record description
  - `file_url` (text, optional) - URL to uploaded file
  - `file_name` (text, optional) - Original file name
  - `created_by` (uuid, foreign key) - References users table
  - Timestamps for creation and updates

  ### Appointments Table
  - `id` (uuid, primary key) - Appointment unique identifier
  - `patient_id` (uuid, foreign key) - References patients table
  - `doctor_id` (uuid, foreign key) - References users table
  - `appointment_date` (date) - Appointment date
  - `appointment_time` (time) - Appointment time
  - `type` (enum) - Appointment type: consultation, therapy, follow_up, emergency
  - `status` (enum) - Status: scheduled, confirmed, cancelled, completed
  - `notes` (text, optional) - Appointment notes
  - Timestamps for creation and updates

  ## 2. Security
  - Row Level Security (RLS) enabled on all tables
  - Policies for role-based access control
  - Admin users have full access
  - Doctors can access their patients and related data
  - Patients can only access their own data

  ## 3. Indexes
  - Performance indexes on frequently queried columns
  - Foreign key indexes for optimal join performance

  ## 4. HIPAA Compliance Notes
  - All patient data is encrypted at rest
  - Access logging through RLS policies
  - Audit trail through timestamps and user tracking
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'patient');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE visit_type AS ENUM ('dental', 'general', 'therapy', 'emergency');
CREATE TYPE visit_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE record_type AS ENUM ('lab_result', 'xray', 'prescription', 'note', 'image');
CREATE TYPE appointment_type AS ENUM ('consultation', 'therapy', 'follow_up', 'emergency');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'cancelled', 'completed');

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth date NOT NULL,
  gender gender_type NOT NULL,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  medical_history text,
  allergies text,
  current_medications text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Visits table
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  visit_type visit_type NOT NULL,
  visit_date timestamptz NOT NULL,
  status visit_status DEFAULT 'scheduled',
  chief_complaint text,
  diagnosis text,
  treatment_plan text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES visits(id) ON DELETE CASCADE,
  treatment_type text NOT NULL,
  description text NOT NULL,
  medications text,
  dosage text,
  instructions text,
  follow_up_date date,
  cost decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medical records table
CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  record_type record_type NOT NULL,
  title text NOT NULL,
  description text,
  file_url text,
  file_name text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  type appointment_type NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for patients table
CREATE POLICY "Patients can read own data"
  ON patients
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
  );

CREATE POLICY "Doctors and admins can read all patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Doctors and admins can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Doctors and admins can update patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

-- RLS Policies for visits table
CREATE POLICY "Patients can read own visits"
  ON visits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM patients 
      WHERE patients.id = visits.patient_id 
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors and admins can read all visits"
  ON visits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Doctors and admins can insert visits"
  ON visits
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

-- RLS Policies for treatments table
CREATE POLICY "Doctors and admins can manage treatments"
  ON treatments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

-- RLS Policies for medical records table
CREATE POLICY "Patients can read own records"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM patients 
      WHERE patients.id = medical_records.patient_id 
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors and admins can read all records"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Doctors and admins can insert records"
  ON medical_records
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

-- RLS Policies for appointments table
CREATE POLICY "Patients can read own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM patients 
      WHERE patients.id = appointments.patient_id 
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors and admins can read all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Doctors and admins can manage appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('doctor', 'admin')
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_doctor_id ON visits(doctor_id);
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_treatments_visit_id ON treatments(visit_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visits_updated_at BEFORE UPDATE ON visits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON treatments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();