// Mock data for healthcare management system demo
// This data simulates a real healthcare system and can be easily replaced with backend APIs

export interface MockPatient {
  id: string;
  profile_id: string;
  patient_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  blood_type: string;
  allergies: string[];
  current_medications: string[];
  medical_history: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  insurance_info: string;
  height: number;
  weight: number;
  status: 'active' | 'pending' | 'inactive';
  last_visit: string;
  created_at: string;
  updated_at: string;
}

export interface MockDoctor {
  id: string;
  profile_id: string;
  license_number: string;
  full_name: string;
  email: string;
  phone: string;
  specialization: string;
  years_experience: number;
  created_at: string;
  updated_at: string;
}

export interface MockVisit {
  id: string;
  patient_id: string;
  doctor_id: string;
  visit_type: 'general' | 'dentistry' | 'specialist' | 'emergency' | 'followup';
  visit_date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  chief_complaint: string;
  symptoms: string;
  diagnosis: string;
  treatment_plan: string;
  medications_prescribed: string[];
  notes: string;
  follow_up_date: string;
  vital_signs: {
    blood_pressure: string;
    heart_rate: string;
    temperature: string;
    weight: string;
    height: string;
  };
  examination_notes: string;
  lab_results: string;
  created_at: string;
  updated_at: string;
}

export interface MockTherapySchedule {
  id: string;
  patient_id: string;
  doctor_id: string;
  therapy_type: string;
  description: string;
  start_date: string;
  end_date: string;
  frequency: string;
  instructions: string;
  is_active: boolean;
  duration: number;
  session_count: number;
  created_at: string;
  updated_at: string;
}

export interface MockMedication {
  id: string;
  visit_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  side_effects: string;
  contraindications: string;
  created_at: string;
  updated_at: string;
}

export interface MockDashboardStats {
  total_patients: number;
  total_visits: number;
  active_therapies: number;
  pending_follow_ups: number;
  monthly_visits: Array<{
    month: string;
    count: number;
  }>;
  visit_types: Array<{
    type: string;
    count: number;
  }>;
  top_diagnoses: Array<{
    diagnosis: string;
    count: number;
  }>;
}

export interface MockActivity {
  id: string;
  type: 'visit' | 'therapy' | 'followup' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'pending' | 'warning';
  patient_id?: string;
  doctor_id?: string;
}

// Mock Data
export const mockPatients: MockPatient[] = [
  {
    id: "1",
    profile_id: "profile-1",
    patient_id: "PAT001",
    full_name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    date_of_birth: "1985-03-15",
    gender: "Female",
    blood_type: "O+",
    allergies: ["Penicillin", "Shellfish"],
    current_medications: ["Metformin 500mg", "Lisinopril 10mg"],
    medical_history: "Type 2 Diabetes, Hypertension",
    emergency_contact_name: "Carlos Garcia",
    emergency_contact_phone: "+1 (555) 123-4568",
    insurance_info: "Blue Cross Blue Shield - Policy #BC123456",
    height: 165,
    weight: 70,
    status: "active",
    last_visit: "2024-01-15",
    created_at: "2023-06-15T10:00:00Z",
    updated_at: "2024-01-15T14:30:00Z"
  },
  {
    id: "2",
    profile_id: "profile-2",
    patient_id: "PAT002",
    full_name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, City, State 12345",
    date_of_birth: "1990-07-22",
    gender: "Male",
    blood_type: "A+",
    allergies: ["None"],
    current_medications: ["Ibuprofen 200mg"],
    medical_history: "Previous knee surgery (2022)",
    emergency_contact_name: "Susan Wilson",
    emergency_contact_phone: "+1 (555) 234-5679",
    insurance_info: "Aetna - Policy #AE789012",
    height: 180,
    weight: 85,
    status: "active",
    last_visit: "2024-01-16",
    created_at: "2023-08-20T09:15:00Z",
    updated_at: "2024-01-16T11:45:00Z"
  },
  {
    id: "3",
    profile_id: "profile-3",
    patient_id: "PAT003",
    full_name: "Anna Smith",
    email: "anna.smith@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, City, State 12345",
    date_of_birth: "1978-11-08",
    gender: "Female",
    blood_type: "B+",
    allergies: ["Latex"],
    current_medications: ["Levothyroxine 75mcg"],
    medical_history: "Hypothyroidism, Migraine",
    emergency_contact_name: "Robert Smith",
    emergency_contact_phone: "+1 (555) 345-6790",
    insurance_info: "Cigna - Policy #CI345678",
    height: 160,
    weight: 65,
    status: "pending",
    last_visit: "2024-01-10",
    created_at: "2023-09-10T14:20:00Z",
    updated_at: "2024-01-10T16:00:00Z"
  },
  {
    id: "4",
    profile_id: "profile-4",
    patient_id: "PAT004",
    full_name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, City, State 12345",
    date_of_birth: "1992-05-12",
    gender: "Male",
    blood_type: "AB+",
    allergies: ["Aspirin"],
    current_medications: ["Atorvastatin 20mg"],
    medical_history: "High Cholesterol",
    emergency_contact_name: "Jane Doe",
    emergency_contact_phone: "+1 (555) 456-7891",
    insurance_info: "UnitedHealth - Policy #UH456789",
    height: 175,
    weight: 80,
    status: "inactive",
    last_visit: "2023-12-20",
    created_at: "2023-10-05T11:30:00Z",
    updated_at: "2023-12-20T13:15:00Z"
  },
  {
    id: "5",
    profile_id: "profile-5",
    patient_id: "PAT005",
    full_name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, City, State 12345",
    date_of_birth: "1988-12-03",
    gender: "Female",
    blood_type: "A-",
    allergies: ["Peanuts", "Dust mites"],
    current_medications: ["Albuterol inhaler", "Fluticasone nasal spray"],
    medical_history: "Asthma, Seasonal allergies",
    emergency_contact_name: "Michael Johnson",
    emergency_contact_phone: "+1 (555) 567-8902",
    insurance_info: "Kaiser Permanente - Policy #KP567890",
    height: 170,
    weight: 60,
    status: "active",
    last_visit: "2024-01-18",
    created_at: "2023-11-15T08:45:00Z",
    updated_at: "2024-01-18T10:20:00Z"
  }
];

export const mockDoctors: MockDoctor[] = [
  {
    id: "1",
    profile_id: "doctor-profile-1",
    license_number: "MD123456",
    full_name: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinic.com",
    phone: "+1 (555) 100-2000",
    specialization: "General Medicine",
    years_experience: 10,
    created_at: "2020-01-15T09:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    profile_id: "doctor-profile-2",
    license_number: "DDS789012",
    full_name: "Dr. Emily Davis",
    email: "emily.davis@clinic.com",
    phone: "+1 (555) 200-3000",
    specialization: "Dentistry",
    years_experience: 8,
    created_at: "2021-03-20T09:00:00Z",
    updated_at: "2024-01-16T11:00:00Z"
  },
  {
    id: "3",
    profile_id: "doctor-profile-3",
    license_number: "MD345678",
    full_name: "Dr. Michael Brown",
    email: "michael.brown@clinic.com",
    phone: "+1 (555) 300-4000",
    specialization: "Cardiology",
    years_experience: 15,
    created_at: "2019-06-10T09:00:00Z",
    updated_at: "2024-01-17T12:00:00Z"
  }
];

export const mockVisits: MockVisit[] = [
  {
    id: "1",
    patient_id: "1",
    doctor_id: "1",
    visit_type: "general",
    visit_date: "2024-01-15T10:00:00Z",
    status: "completed",
    chief_complaint: "Fever and headache",
    symptoms: "High fever (102°F), severe headache, body aches, fatigue",
    diagnosis: "Viral infection",
    treatment_plan: "Rest, fluids, symptomatic treatment",
    medications_prescribed: ["Acetaminophen 500mg", "Ibuprofen 400mg"],
    notes: "Patient advised to rest and drink plenty of fluids. Return if symptoms worsen.",
    follow_up_date: "2024-01-22",
    vital_signs: {
      blood_pressure: "120/80",
      heart_rate: "85 bpm",
      temperature: "102°F",
      weight: "70 kg",
      height: "165 cm"
    },
    examination_notes: "Throat slightly red, no signs of bacterial infection",
    lab_results: "Pending - CBC and CRP ordered",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T11:30:00Z"
  },
  {
    id: "2",
    patient_id: "2",
    doctor_id: "2",
    visit_type: "dentistry",
    visit_date: "2024-01-16T14:00:00Z",
    status: "completed",
    chief_complaint: "Tooth pain",
    symptoms: "Sharp pain in upper right molar, sensitivity to hot/cold",
    diagnosis: "Dental caries",
    treatment_plan: "Dental filling required",
    medications_prescribed: ["Ibuprofen 400mg"],
    notes: "Scheduled for filling procedure next week",
    follow_up_date: "2024-01-23",
    vital_signs: {
      blood_pressure: "118/75",
      heart_rate: "72 bpm",
      temperature: "98.6°F",
      weight: "85 kg",
      height: "180 cm"
    },
    examination_notes: "Cavity detected in tooth #14, no signs of infection",
    lab_results: "N/A",
    created_at: "2024-01-16T14:00:00Z",
    updated_at: "2024-01-16T15:30:00Z"
  },
  {
    id: "3",
    patient_id: "3",
    doctor_id: "1",
    visit_type: "followup",
    visit_date: "2024-01-10T09:30:00Z",
    status: "completed",
    chief_complaint: "Thyroid medication follow-up",
    symptoms: "Feeling better, more energy",
    diagnosis: "Hypothyroidism - well controlled",
    treatment_plan: "Continue current medication",
    medications_prescribed: ["Levothyroxine 75mcg"],
    notes: "Thyroid levels stable, continue current dose",
    follow_up_date: "2024-04-10",
    vital_signs: {
      blood_pressure: "115/70",
      heart_rate: "68 bpm",
      temperature: "98.4°F",
      weight: "65 kg",
      height: "160 cm"
    },
    examination_notes: "Thyroid gland normal size, no nodules",
    lab_results: "TSH: 2.1 mIU/L (normal), Free T4: 1.2 ng/dL (normal)",
    created_at: "2024-01-10T09:30:00Z",
    updated_at: "2024-01-10T10:45:00Z"
  }
];

export const mockTherapySchedules: MockTherapySchedule[] = [
  {
    id: "1",
    patient_id: "2",
    doctor_id: "1",
    therapy_type: "Physical Therapy",
    description: "Post-surgical knee rehabilitation",
    start_date: "2024-01-01",
    end_date: "2024-03-01",
    frequency: "Twice weekly",
    instructions: "Focus on range of motion and strengthening exercises",
    is_active: true,
    duration: 8,
    session_count: 16,
    created_at: "2023-12-15T10:00:00Z",
    updated_at: "2024-01-15T14:00:00Z"
  },
  {
    id: "2",
    patient_id: "5",
    doctor_id: "1",
    therapy_type: "Respiratory Therapy",
    description: "Asthma management and breathing exercises",
    start_date: "2024-01-10",
    end_date: "2024-02-10",
    frequency: "Weekly",
    instructions: "Practice breathing techniques and use inhaler correctly",
    is_active: true,
    duration: 4,
    session_count: 4,
    created_at: "2024-01-05T09:00:00Z",
    updated_at: "2024-01-18T11:00:00Z"
  }
];

export const mockMedications: MockMedication[] = [
  {
    id: "1",
    visit_id: "1",
    medication_name: "Acetaminophen",
    dosage: "500mg",
    frequency: "Every 6 hours",
    duration: "7 days",
    instructions: "Take with food to avoid stomach upset",
    start_date: "2024-01-15",
    end_date: "2024-01-22",
    is_active: true,
    side_effects: "Rare: liver damage with overdose",
    contraindications: "Liver disease, alcohol abuse",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    visit_id: "1",
    medication_name: "Ibuprofen",
    dosage: "400mg",
    frequency: "Every 8 hours",
    duration: "5 days",
    instructions: "Take with food",
    start_date: "2024-01-15",
    end_date: "2024-01-20",
    is_active: true,
    side_effects: "Stomach upset, dizziness",
    contraindications: "Stomach ulcers, kidney disease",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  }
];

export const mockDashboardStats: MockDashboardStats = {
  total_patients: 1247,
  total_visits: 89,
  active_therapies: 23,
  pending_follow_ups: 12,
  monthly_visits: [
    { month: "Jan 2024", count: 89 },
    { month: "Dec 2023", count: 76 },
    { month: "Nov 2023", count: 82 },
    { month: "Oct 2023", count: 95 },
    { month: "Sep 2023", count: 88 },
    { month: "Aug 2023", count: 91 }
  ],
  visit_types: [
    { type: "General Consultation", count: 45 },
    { type: "Dental Care", count: 23 },
    { type: "Specialist Consultation", count: 15 },
    { type: "Follow-up", count: 6 }
  ],
  top_diagnoses: [
    { diagnosis: "Viral Infection", count: 12 },
    { diagnosis: "Hypertension", count: 8 },
    { diagnosis: "Diabetes Type 2", count: 6 },
    { diagnosis: "Dental Caries", count: 5 },
    { diagnosis: "Asthma", count: 4 }
  ]
};

export const mockActivities: MockActivity[] = [
  {
    id: "1",
    type: "visit",
    title: "Dr. Sarah Johnson",
    description: "Completed visit for Maria Garcia - General checkup",
    time: "2 minutes ago",
    status: "completed",
    patient_id: "1",
    doctor_id: "1"
  },
  {
    id: "2",
    type: "therapy",
    title: "Physical Therapy Session",
    description: "James Wilson - Session 3 of 8 completed",
    time: "15 minutes ago",
    status: "completed",
    patient_id: "2",
    doctor_id: "1"
  },
  {
    id: "3",
    type: "followup",
    title: "Follow-up Required",
    description: "Anna Smith - Lab results ready for review",
    time: "1 hour ago",
    status: "pending",
    patient_id: "3",
    doctor_id: "1"
  },
  {
    id: "4",
    type: "alert",
    title: "Medication Alert",
    description: "Patient John Doe missed medication dose",
    time: "2 hours ago",
    status: "warning",
    patient_id: "4",
    doctor_id: "1"
  },
  {
    id: "5",
    type: "visit",
    title: "Dr. Emily Davis",
    description: "Scheduled dental cleaning for Sarah Johnson",
    time: "3 hours ago",
    status: "completed",
    patient_id: "5",
    doctor_id: "2"
  }
];
