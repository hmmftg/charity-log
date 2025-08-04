/*
  # Demo Data for Healthcare Management System

  ## Overview
  This migration inserts demo data for testing the healthcare management system.

  ## 1. Demo Users
  - Admin user: admin@clinic.com
  - Doctor user: doctor@clinic.com  
  - Patient user: patient@clinic.com

  ## 2. Demo Patients
  - Sample patient records with medical history
  - Various demographics and conditions

  ## 3. Demo Visits
  - Recent visits with different types
  - Sample diagnoses and treatments

  ## 4. Demo Appointments
  - Upcoming and past appointments
  - Different appointment types and statuses
*/

-- Insert demo users (Note: These will need to be created via Supabase Auth first)
-- This is just the profile data that will be linked to auth.users

-- Demo patients with sample data
DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  doctor_id uuid := gen_random_uuid();
  patient1_id uuid := gen_random_uuid();
  patient2_id uuid := gen_random_uuid();
  patient3_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES 
    (
        '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
        admin_id, -- Generate a new UUID for the user
        'authenticated', 'authenticated', 'admin@clinic.com',
        crypt('123', gen_salt('bf')), -- Hash the password
        now(), -- Set email_confirmed_at to now for immediate confirmation
        '{"provider":"email","providers":["email"]}', -- Basic app metadata
        '{}', -- Empty user metadata
        now(), now()
    ),
    (
        '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
        doctor_id, -- Generate a new UUID for the user
        'authenticated', 'authenticated', 'doctor@clinic.com',
        crypt('123', gen_salt('bf')), -- Hash the password
        now(), -- Set email_confirmed_at to now for immediate confirmation
        '{"provider":"email","providers":["email"]}', -- Basic app metadata
        '{}', -- Empty user metadata
        now(), now()
    ),
    (
        '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
        patient1_id, -- Generate a new UUID for the user
        'authenticated', 'authenticated', 'patient1@clinic.com',
        crypt('123', gen_salt('bf')), -- Hash the password
        now(), -- Set email_confirmed_at to now for immediate confirmation
        '{"provider":"email","providers":["email"]}', -- Basic app metadata
        '{}', -- Empty user metadata
        now(), now()
    ),
    (
        '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
        patient2_id, -- Generate a new UUID for the user
        'authenticated', 'authenticated', 'patient2@clinic.com',
        crypt('123', gen_salt('bf')), -- Hash the password
        now(), -- Set email_confirmed_at to now for immediate confirmation
        '{"provider":"email","providers":["email"]}', -- Basic app metadata
        '{}', -- Empty user metadata
        now(), now()
    ),
    (
        '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
        patient3_id, -- Generate a new UUID for the user
        'authenticated', 'authenticated', 'patient3@clinic.com',
        crypt('123', gen_salt('bf')), -- Hash the password
        now(), -- Set email_confirmed_at to now for immediate confirmation
        '{"provider":"email","providers":["email"]}', -- Basic app metadata
        '{}', -- Empty user metadata
        now(), now()
    );
  -- Insert demo user profiles (these would normally be created via auth signup)
  INSERT INTO users (id, email, role, first_name, last_name, phone) VALUES
  (admin_id, 'admin@clinic.com', 'admin', 'Admin', 'User', '+1-555-0101'),
  (doctor_id, 'doctor@clinic.com', 'doctor', 'Doctor', 'Ali', '+1-555-0102'),
  (patient1_id, 'patient1@clinic.com', 'patient', 'Patient', 'No1', '+1-555-0103'),
  (patient2_id, 'patient2@clinic.com', 'patient', 'Patient', 'No2', '+1-555-0104'),
  (patient3_id, 'patient3@clinic.com', 'patient', 'Patient', 'No3', '+1-555-0105');

  -- Insert demo patients
  INSERT INTO patients (user_id, date_of_birth, gender, address, emergency_contact_name, emergency_contact_phone, medical_history, allergies, current_medications) VALUES
  (patient1_id, '1990-05-15', 'female', '123 Main St, Anytown, ST 12345', 'Robert Wilson', '+1-555-0201', 'Hypertension, managed with medication', 'Penicillin', 'Lisinopril 10mg daily'),
  (patient2_id, '1985-08-22', 'male', '456 Oak Ave, Somewhere, ST 67890', 'Mary Doe', '+1-555-0202', 'Type 2 Diabetes, diet controlled', 'None known', 'Metformin 500mg twice daily'),
  (patient3_id, '1992-12-03', 'female', '789 Pine Rd, Elsewhere, ST 11111', 'Tom Smith', '+1-555-0203', 'Asthma, well controlled', 'Shellfish, Dust mites', 'Albuterol inhaler as needed');

  -- Insert demo visits
  INSERT INTO visits (patient_id, doctor_id, visit_type, visit_date, status, chief_complaint, diagnosis, treatment_plan, notes) VALUES
  (
    (SELECT id FROM patients WHERE user_id = patient1_id),
    doctor_id,
    'general',
    now() - interval '2 days',
    'completed',
    'Routine checkup and blood pressure monitoring',
    'Hypertension, well controlled',
    'Continue current medication, follow-up in 3 months',
    'Patient reports feeling well, BP 130/85'
  ),
  (
    (SELECT id FROM patients WHERE user_id = patient2_id),
    doctor_id,
    'general',
    now() - interval '1 week',
    'completed',
    'Blood sugar monitoring and medication review',
    'Type 2 Diabetes Mellitus',
    'Continue Metformin, dietary counseling',
    'HbA1c improved to 7.2%, good compliance'
  ),
  (
    (SELECT id FROM patients WHERE user_id = patient3_id),
    doctor_id,
    'dental',
    now() - interval '3 days',
    'completed',
    'Tooth pain and sensitivity',
    'Dental caries, upper right molar',
    'Filling required, fluoride treatment',
    'Good oral hygiene, scheduled for dental work'
  );

  -- Insert demo appointments
  INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, type, status, notes) VALUES
  (
    (SELECT id FROM patients WHERE user_id = patient1_id),
    doctor_id,
    CURRENT_DATE + interval '1 week',
    '09:00:00',
    'follow_up',
    'scheduled',
    'Blood pressure follow-up appointment'
  ),
  (
    (SELECT id FROM patients WHERE user_id = patient2_id),
    doctor_id,
    CURRENT_DATE + interval '3 days',
    '14:30:00',
    'consultation',
    'confirmed',
    'Diabetes management consultation'
  ),
  (
    (SELECT id FROM patients WHERE user_id = patient3_id),
    doctor_id,
    CURRENT_DATE + interval '2 weeks',
    '11:00:00',
    'therapy',
    'scheduled',
    'Breathing therapy session for asthma management'
  );

END $$;