// Mock API service for healthcare management system
// This simulates backend API calls and can be easily replaced with real API calls

import {
  MockPatient,
  MockDoctor,
  MockVisit,
  MockTherapySchedule,
  MockMedication,
  MockDashboardStats,
  MockActivity,
  mockPatients,
  mockDoctors,
  mockVisits,
  mockTherapySchedules,
  mockMedications,
  mockDashboardStats,
  mockActivities
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Response interface
interface MockApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}

// Generic mock API function
const mockApiCall = async <T>(
  data: T | T[],
  delayMs: number = 500,
  shouldFail: boolean = false
): Promise<MockApiResponse<T>> => {
  await delay(delayMs);
  
  if (shouldFail) {
    throw new Error('Mock API Error: Request failed');
  }
  
  const isArray = Array.isArray(data);
  return {
    data: data as T,
    total: isArray ? (data as T[]).length : undefined,
    message: 'Success'
  };
};

// Patient API Mock
export const patientApi = {
  // Get all patients
  getAll: async (params?: { search?: string; status?: string; page?: number; limit?: number }) => {
    let filteredPatients = [...mockPatients];
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredPatients = filteredPatients.filter(patient =>
        patient.full_name.toLowerCase().includes(search) ||
        patient.email.toLowerCase().includes(search) ||
        patient.phone.includes(search) ||
        patient.patient_id.toLowerCase().includes(search)
      );
    }
    
    if (params?.status && params.status !== 'all') {
      filteredPatients = filteredPatients.filter(patient => patient.status === params.status);
    }
    
    return mockApiCall(filteredPatients, 300);
  },

  // Get patient by ID
  getById: async (id: string) => {
    const patient = mockPatients.find(p => p.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return mockApiCall(patient, 200);
  },

  // Create new patient
  create: async (patientData: Partial<MockPatient>) => {
    const newPatient: MockPatient = {
      id: `patient-${Date.now()}`,
      profile_id: `profile-${Date.now()}`,
      patient_id: `PAT${String(mockPatients.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
      allergies: [],
      current_medications: [],
      ...patientData
    } as MockPatient;
    
    mockPatients.push(newPatient);
    return mockApiCall(newPatient, 400);
  },

  // Update patient
  update: async (id: string, patientData: Partial<MockPatient>) => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }
    
    mockPatients[index] = {
      ...mockPatients[index],
      ...patientData,
      updated_at: new Date().toISOString()
    };
    
    return mockApiCall(mockPatients[index], 300);
  },

  // Delete patient
  delete: async (id: string) => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }
    
    mockPatients.splice(index, 1);
    return mockApiCall({ success: true }, 200);
  }
};

// Doctor API Mock
export const doctorApi = {
  getAll: async () => {
    return mockApiCall(mockDoctors, 200);
  },

  getById: async (id: string) => {
    const doctor = mockDoctors.find(d => d.id === id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return mockApiCall(doctor, 200);
  },

  create: async (doctorData: Partial<MockDoctor>) => {
    const newDoctor: MockDoctor = {
      id: `doctor-${Date.now()}`,
      profile_id: `doctor-profile-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...doctorData
    } as MockDoctor;
    
    mockDoctors.push(newDoctor);
    return mockApiCall(newDoctor, 400);
  },

  update: async (id: string, doctorData: Partial<MockDoctor>) => {
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    mockDoctors[index] = {
      ...mockDoctors[index],
      ...doctorData,
      updated_at: new Date().toISOString()
    };
    
    return mockApiCall(mockDoctors[index], 300);
  },

  delete: async (id: string) => {
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    mockDoctors.splice(index, 1);
    return mockApiCall({ success: true }, 200);
  }
};

// Visit API Mock
export const visitApi = {
  getAll: async (params?: { patient_id?: string; doctor_id?: string; status?: string }) => {
    let filteredVisits = [...mockVisits];
    
    if (params?.patient_id) {
      filteredVisits = filteredVisits.filter(visit => visit.patient_id === params.patient_id);
    }
    
    if (params?.doctor_id) {
      filteredVisits = filteredVisits.filter(visit => visit.doctor_id === params.doctor_id);
    }
    
    if (params?.status) {
      filteredVisits = filteredVisits.filter(visit => visit.status === params.status);
    }
    
    return mockApiCall(filteredVisits, 300);
  },

  getById: async (id: string) => {
    const visit = mockVisits.find(v => v.id === id);
    if (!visit) {
      throw new Error('Visit not found');
    }
    return mockApiCall(visit, 200);
  },

  create: async (visitData: Partial<MockVisit>) => {
    const newVisit: MockVisit = {
      id: `visit-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'scheduled',
      medications_prescribed: [],
      vital_signs: {
        blood_pressure: '',
        heart_rate: '',
        temperature: '',
        weight: '',
        height: ''
      },
      ...visitData
    } as MockVisit;
    
    mockVisits.push(newVisit);
    return mockApiCall(newVisit, 400);
  },

  update: async (id: string, visitData: Partial<MockVisit>) => {
    const index = mockVisits.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Visit not found');
    }
    
    mockVisits[index] = {
      ...mockVisits[index],
      ...visitData,
      updated_at: new Date().toISOString()
    };
    
    return mockApiCall(mockVisits[index], 300);
  },

  delete: async (id: string) => {
    const index = mockVisits.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Visit not found');
    }
    
    mockVisits.splice(index, 1);
    return mockApiCall({ success: true }, 200);
  }
};

// Therapy Schedule API Mock
export const therapyApi = {
  getAll: async (params?: { patient_id?: string; is_active?: boolean }) => {
    let filteredTherapies = [...mockTherapySchedules];
    
    if (params?.patient_id) {
      filteredTherapies = filteredTherapies.filter(therapy => therapy.patient_id === params.patient_id);
    }
    
    if (params?.is_active !== undefined) {
      filteredTherapies = filteredTherapies.filter(therapy => therapy.is_active === params.is_active);
    }
    
    return mockApiCall(filteredTherapies, 300);
  },

  getById: async (id: string) => {
    const therapy = mockTherapySchedules.find(t => t.id === id);
    if (!therapy) {
      throw new Error('Therapy schedule not found');
    }
    return mockApiCall(therapy, 200);
  },

  create: async (therapyData: Partial<MockTherapySchedule>) => {
    const newTherapy: MockTherapySchedule = {
      id: `therapy-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      duration: 0,
      session_count: 0,
      ...therapyData
    } as MockTherapySchedule;
    
    mockTherapySchedules.push(newTherapy);
    return mockApiCall(newTherapy, 400);
  },

  update: async (id: string, therapyData: Partial<MockTherapySchedule>) => {
    const index = mockTherapySchedules.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Therapy schedule not found');
    }
    
    mockTherapySchedules[index] = {
      ...mockTherapySchedules[index],
      ...therapyData,
      updated_at: new Date().toISOString()
    };
    
    return mockApiCall(mockTherapySchedules[index], 300);
  },

  delete: async (id: string) => {
    const index = mockTherapySchedules.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Therapy schedule not found');
    }
    
    mockTherapySchedules.splice(index, 1);
    return mockApiCall({ success: true }, 200);
  }
};

// Dashboard API Mock
export const dashboardApi = {
  getStats: async () => {
    return mockApiCall(mockDashboardStats, 200);
  },

  getActivities: async (limit?: number) => {
    const activities = limit ? mockActivities.slice(0, limit) : mockActivities;
    return mockApiCall(activities, 300);
  }
};

// Medication API Mock
export const medicationApi = {
  getAll: async (params?: { visit_id?: string; is_active?: boolean }) => {
    let filteredMedications = [...mockMedications];
    
    if (params?.visit_id) {
      filteredMedications = filteredMedications.filter(med => med.visit_id === params.visit_id);
    }
    
    if (params?.is_active !== undefined) {
      filteredMedications = filteredMedications.filter(med => med.is_active === params.is_active);
    }
    
    return mockApiCall(filteredMedications, 300);
  },

  getById: async (id: string) => {
    const medication = mockMedications.find(m => m.id === id);
    if (!medication) {
      throw new Error('Medication not found');
    }
    return mockApiCall(medication, 200);
  },

  create: async (medicationData: Partial<MockMedication>) => {
    const newMedication: MockMedication = {
      id: `medication-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      side_effects: '',
      contraindications: '',
      ...medicationData
    } as MockMedication;
    
    mockMedications.push(newMedication);
    return mockApiCall(newMedication, 400);
  },

  update: async (id: string, medicationData: Partial<MockMedication>) => {
    const index = mockMedications.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Medication not found');
    }
    
    mockMedications[index] = {
      ...mockMedications[index],
      ...medicationData,
      updated_at: new Date().toISOString()
    };
    
    return mockApiCall(mockMedications[index], 300);
  },

  delete: async (id: string) => {
    const index = mockMedications.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Medication not found');
    }
    
    mockMedications.splice(index, 1);
    return mockApiCall({ success: true }, 200);
  }
};

// Export all APIs
export const mockApi = {
  patients: patientApi,
  doctors: doctorApi,
  visits: visitApi,
  therapies: therapyApi,
  medications: medicationApi,
  dashboard: dashboardApi
};

// Utility function to simulate API errors (for testing)
export const simulateApiError = (shouldFail: boolean = true) => {
  return shouldFail;
};

// Utility function to get mock data directly (for components that need immediate data)
export const getMockData = {
  patients: () => mockPatients,
  doctors: () => mockDoctors,
  visits: () => mockVisits,
  therapies: () => mockTherapySchedules,
  medications: () => mockMedications,
  dashboardStats: () => mockDashboardStats,
  activities: () => mockActivities
};
