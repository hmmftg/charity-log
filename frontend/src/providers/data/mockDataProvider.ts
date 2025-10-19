// Data provider for healthcare management system
// This provider uses mock data for demo but can be easily switched to real APIs

import { DataProvider, HttpError } from "@refinedev/core";
import { mockApi } from "../../services/mockApi";

// Configuration for switching between mock and real APIs
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || 
                     import.meta.env.VITE_DEMO_MODE === 'true' ||
                     !import.meta.env.VITE_API_URL;

// Real API base URL (when not using mock data)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api/v1';

// Helper function to create API URL
const createApiUrl = (resource: string, id?: string, action?: string) => {
  if (USE_MOCK_DATA) {
    return `${API_BASE_URL}/${resource}`;
  }
  
  let url = `${API_BASE_URL}/${resource}`;
  if (id) {
    url += `/${id}`;
  }
  if (action) {
    url += `/${action}`;
  }
  return url;
};

// Helper function to handle API calls
const handleApiCall = async <T>(
  apiCall: () => Promise<{ data: T; total?: number; message?: string }>,
  fallbackData?: T
): Promise<{ data: T; total?: number }> => {
  try {
    const response = await apiCall();
    return {
      data: response.data,
      total: response.total
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // If we have fallback data, use it
    if (fallbackData) {
      return {
        data: fallbackData,
        total: Array.isArray(fallbackData) ? fallbackData.length : undefined
      };
    }
    
    // Otherwise, throw the error
    throw error;
  }
};

export const dataProvider = (): DataProvider => ({
  getApiUrl: () => API_BASE_URL,

  getList: async ({ resource, pagination, filters, sorters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    
    if (USE_MOCK_DATA) {
      // Use mock API
      switch (resource) {
        case "patients":
          const searchFilter = filters?.find(f => f.field === "q");
          const statusFilter = filters?.find(f => f.field === "status");
          return handleApiCall(() => mockApi.patients.getAll({
            search: searchFilter?.value,
            status: statusFilter?.value,
            page: current,
            limit: pageSize
          }));

        case "doctors":
          return handleApiCall(() => mockApi.doctors.getAll());

        case "visits":
          const patientFilter = filters?.find(f => f.field === "patient_id");
          const doctorFilter = filters?.find(f => f.field === "doctor_id");
          const visitStatusFilter = filters?.find(f => f.field === "status");
          return handleApiCall(() => mockApi.visits.getAll({
            patient_id: patientFilter?.value,
            doctor_id: doctorFilter?.value,
            status: visitStatusFilter?.value
          }));

        case "therapy-schedules":
          const therapyPatientFilter = filters?.find(f => f.field === "patient_id");
          const activeFilter = filters?.find(f => f.field === "is_active");
          return handleApiCall(() => mockApi.therapies.getAll({
            patient_id: therapyPatientFilter?.value,
            is_active: activeFilter?.value
          }));

        case "medications":
          const medVisitFilter = filters?.find(f => f.field === "visit_id");
          const medActiveFilter = filters?.find(f => f.field === "is_active");
          return handleApiCall(() => mockApi.medications.getAll({
            visit_id: medVisitFilter?.value,
            is_active: medActiveFilter?.value
          }));

        default:
          return { data: [], total: 0 };
      }
    } else {
      // Use real API
      const params = new URLSearchParams();
      
      if (pagination) {
        params.append('_start', String((current - 1) * pageSize));
        params.append('_end', String(current * pageSize));
      }
      
      if (filters) {
        filters.forEach(filter => {
          if ('field' in filter) {
            params.append(filter.field, String(filter.value));
          }
        });
      }
      
      if (sorters) {
        sorters.forEach(sorter => {
          if ('field' in sorter) {
            params.append('_sort', sorter.field);
            params.append('_order', sorter.order);
          }
        });
      }
      
      const url = `${createApiUrl(resource)}/all?${params.toString()}`;
      
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const total = response.headers.get('X-Total-Count') 
          ? parseInt(response.headers.get('X-Total-Count')!)
          : Array.isArray(data.result) ? data.result.length : 0;
        
        return {
          data: data.result || data,
          total
        };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  },

  getOne: async ({ resource, id }) => {
    if (USE_MOCK_DATA) {
      switch (resource) {
        case "patients":
          return handleApiCall(() => mockApi.patients.getById(id));
        case "doctors":
          return handleApiCall(() => mockApi.doctors.getById(id));
        case "visits":
          return handleApiCall(() => mockApi.visits.getById(id));
        case "therapy-schedules":
          return handleApiCall(() => mockApi.therapies.getById(id));
        case "medications":
          return handleApiCall(() => mockApi.medications.getById(id));
        default:
          throw new Error(`Resource ${resource} not found`);
      }
    } else {
      const url = createApiUrl(resource, id);
      
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
          data: data.result?.[0] || data
        };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  },

  create: async ({ resource, variables }) => {
    if (USE_MOCK_DATA) {
      switch (resource) {
        case "patients":
          return handleApiCall(() => mockApi.patients.create(variables));
        case "doctors":
          return handleApiCall(() => mockApi.doctors.create(variables));
        case "visits":
          return handleApiCall(() => mockApi.visits.create(variables));
        case "therapy-schedules":
          return handleApiCall(() => mockApi.therapies.create(variables));
        case "medications":
          return handleApiCall(() => mockApi.medications.create(variables));
        default:
          throw new Error(`Resource ${resource} not supported`);
      }
    } else {
      const url = createApiUrl(resource);
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          },
          body: JSON.stringify(variables)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  },

  update: async ({ resource, id, variables }) => {
    if (USE_MOCK_DATA) {
      switch (resource) {
        case "patients":
          return handleApiCall(() => mockApi.patients.update(id, variables));
        case "doctors":
          return handleApiCall(() => mockApi.doctors.update(id, variables));
        case "visits":
          return handleApiCall(() => mockApi.visits.update(id, variables));
        case "therapy-schedules":
          return handleApiCall(() => mockApi.therapies.update(id, variables));
        case "medications":
          return handleApiCall(() => mockApi.medications.update(id, variables));
        default:
          throw new Error(`Resource ${resource} not supported`);
      }
    } else {
      const url = createApiUrl(resource, id);
      
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          },
          body: JSON.stringify(variables)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  },

  deleteOne: async ({ resource, id }) => {
    if (USE_MOCK_DATA) {
      switch (resource) {
        case "patients":
          return handleApiCall(() => mockApi.patients.delete(id));
        case "doctors":
          return handleApiCall(() => mockApi.doctors.delete(id));
        case "visits":
          return handleApiCall(() => mockApi.visits.delete(id));
        case "therapy-schedules":
          return handleApiCall(() => mockApi.therapies.delete(id));
        case "medications":
          return handleApiCall(() => mockApi.medications.delete(id));
        default:
          throw new Error(`Resource ${resource} not supported`);
      }
    } else {
      const url = createApiUrl(resource, id);
      
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          },
          body: JSON.stringify({ id })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  },

  custom: async ({ url, method, payload }) => {
    if (USE_MOCK_DATA) {
      // Handle custom mock API calls
      if (url.includes('/dashboard/stats')) {
        return handleApiCall(() => mockApi.dashboard.getStats());
      }
      if (url.includes('/dashboard/activities')) {
        return handleApiCall(() => mockApi.dashboard.getActivities());
      }
      
      // Default response for unknown custom calls
      return { data: { message: 'Mock API response' } };
    } else {
      // Handle real custom API calls
      try {
        const response = await fetch(url, {
          method: method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Request-Id': `demo-${Date.now()}`
          },
          body: payload ? JSON.stringify(payload) : undefined
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Real API Error:', error);
        throw error;
      }
    }
  }
});

// Export configuration for easy switching
export const apiConfig = {
  useMockData: USE_MOCK_DATA,
  apiBaseUrl: API_BASE_URL,
  switchToRealApi: () => {
    // This function can be called to switch to real API
    // In a real implementation, you might want to reload the app or update state
    console.log('Switching to real API...');
    window.location.reload();
  }
};
