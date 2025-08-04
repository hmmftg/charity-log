-- Insert sample profiles (these would be created through Supabase Auth in real app)
-- Note: In production, these would be created via the auth flow

-- Sample admin user
INSERT INTO public.profiles (id, email, full_name, role, phone) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@medicalcharity.org', 'Dr. Sarah Admin', 'admin', '+1234567890');

-- Sample doctors
INSERT INTO public.profiles (id, email, full_name, role, phone) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'doctor1@medicalcharity.org', 'Dr. John Smith', 'doctor', '+1234567891'),
('550e8400-e29b-41d4-a716-446655440003', 'dentist@medicalcharity.org', 'Dr. Emily Johnson', 'doctor', '+1234567892');

-- Sample patients
INSERT INTO public.profiles (id, email, full_name, role, phone, date_of_birth, address) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'patient1@email.com', 'Maria Garcia', 'patient', '+1234567893', '1985-03-15', '123 Main St, City'),
('550e8400-e29b-41d4-a716-446655440005', 'patient2@email.com', 'James Wilson', 'patient', '+1234567894', '1990-07-22', '456 Oak Ave, City');

-- Insert doctors
INSERT INTO public.doctors (profile_id, license_number, specialization, years_experience) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'MD123456', 'General Medicine', 10),
('550e8400-e29b-41d4-a716-446655440003', 'DDS789012', 'Dentistry', 8);

-- Insert patients
INSERT INTO public.patients (profile_id, patient_id, emergency_contact_name, emergency_contact_phone, allergies) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'PAT001', 'Carlos Garcia', '+1234567895', 'Penicillin'),
('550e8400-e29b-41d4-a716-446655440005', 'PAT002', 'Susan Wilson', '+1234567896', 'None known');

-- Insert sample visits
INSERT INTO public.visits (patient_id, doctor_id, visit_type, visit_date, status, chief_complaint, diagnosis, treatment_plan) VALUES
(
  (SELECT id FROM public.patients WHERE patient_id = 'PAT001'),
  (SELECT id FROM public.doctors WHERE license_number = 'MD123456'),
  'general',
  '2024-01-15 10:00:00+00',
  'completed',
  'Fever and headache',
  'Viral infection',
  'Rest, fluids, paracetamol'
),
(
  (SELECT id FROM public.patients WHERE patient_id = 'PAT002'),
  (SELECT id FROM public.doctors WHERE license_number = 'DDS789012'),
  'dentistry',
  '2024-01-16 14:00:00+00',
  'completed',
  'Tooth pain',
  'Dental caries',
  'Filling required'
);
