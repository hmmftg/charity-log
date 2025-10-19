import { ResourceProps } from '@refinedev/core';
import { Route } from 'react-router';
import { DefinitionResources, DefinitionRoutes } from './pages/definition';
import { VisitsResources, VisitsRoutes } from './pages/visits';
import { DashboardPage } from './pages/dashboard';
import { PatientManagementPage } from './pages/patients';
import { VisitLoggingPage } from './pages/visits';
import { DefinitionPage } from './pages/definition';

// Role-based resource definitions
const getRoleBasedResources = (userRole: string): ResourceProps[] => {
  const baseResources: ResourceProps[] = [
    // Dashboard - Available to all roles
    {
      name: "dashboard",
      list: "/dashboard",
      meta: {
        label: "Dashboard",
        icon: "🏥",
      },
    },
  ];

  // Admin resources - Full access
  if (userRole === "administrator" || userRole === "admin") {
    return [
      ...baseResources,
      {
        name: "patients",
        list: "/patients",
        create: "/patients/create",
        edit: "/patients/edit/:id",
        show: "/patients/show/:id",
        meta: {
          label: "Patients",
          icon: "👥",
        },
      },
      {
        name: "visits",
        list: "/visits",
        create: "/visits/create",
        edit: "/visits/edit/:id",
        show: "/visits/show/:id",
        meta: {
          label: "Visits",
          icon: "🏥",
        },
      },
      {
        name: "doctors",
        list: "/doctors",
        create: "/doctors/create",
        edit: "/doctors/edit/:id",
        show: "/doctors/show/:id",
        meta: {
          label: "Doctors",
          icon: "👨‍⚕️",
        },
      },
      {
        name: "therapy-schedules",
        list: "/therapy-schedules",
        create: "/therapy-schedules/create",
        edit: "/therapy-schedules/edit/:id",
        show: "/therapy-schedules/show/:id",
        meta: {
          label: "Therapy Schedules",
          icon: "📅",
        },
      },
      {
        name: "reports",
        list: "/reports",
        meta: {
          label: "Reports",
          icon: "📊",
        },
      },
      {
        name: "settings",
        list: "/settings",
        meta: {
          label: "Settings",
          icon: "⚙️",
        },
      },
      ...DefinitionResources(() => ""),
      ...VisitsResources(() => ""),
    ];
  }

  // Doctor resources - Medical workflow
  if (userRole === "doctor") {
    return [
      ...baseResources,
      {
        name: "patients",
        list: "/patients",
        create: "/patients/create",
        edit: "/patients/edit/:id",
        show: "/patients/show/:id",
        meta: {
          label: "My Patients",
          icon: "👥",
        },
      },
      {
        name: "visits",
        list: "/visits",
        create: "/visits/create",
        edit: "/visits/edit/:id",
        show: "/visits/show/:id",
        meta: {
          label: "Patient Visits",
          icon: "🏥",
        },
      },
      {
        name: "therapy-schedules",
        list: "/therapy-schedules",
        create: "/therapy-schedules/create",
        edit: "/therapy-schedules/edit/:id",
        show: "/therapy-schedules/show/:id",
        meta: {
          label: "Therapy Plans",
          icon: "📅",
        },
      },
      {
        name: "prescriptions",
        list: "/prescriptions",
        create: "/prescriptions/create",
        meta: {
          label: "Prescriptions",
          icon: "💊",
        },
      },
      ...VisitsResources(() => ""),
    ];
  }

  // Nurse resources - Patient care
  if (userRole === "nurse") {
    return [
      ...baseResources,
      {
        name: "patients",
        list: "/patients",
        show: "/patients/show/:id",
        meta: {
          label: "Patient Care",
          icon: "👥",
        },
      },
      {
        name: "visits",
        list: "/visits",
        create: "/visits/create",
        show: "/visits/show/:id",
        meta: {
          label: "Patient Visits",
          icon: "🏥",
        },
      },
      {
        name: "vital-signs",
        list: "/vital-signs",
        create: "/vital-signs/create",
        meta: {
          label: "Vital Signs",
          icon: "📊",
        },
      },
      {
        name: "medications",
        list: "/medications",
        meta: {
          label: "Medications",
          icon: "💊",
        },
      },
    ];
  }

  // Patient resources - Personal records
  if (userRole === "patient") {
    return [
      ...baseResources,
      {
        name: "my-records",
        list: "/my-records",
        show: "/my-records/show/:id",
        meta: {
          label: "My Medical Records",
          icon: "📋",
        },
      },
      {
        name: "appointments",
        list: "/appointments",
        create: "/appointments/create",
        show: "/appointments/show/:id",
        meta: {
          label: "My Appointments",
          icon: "📅",
        },
      },
      {
        name: "medications",
        list: "/medications",
        show: "/medications/show/:id",
        meta: {
          label: "My Medications",
          icon: "💊",
        },
      },
      {
        name: "lab-results",
        list: "/lab-results",
        show: "/lab-results/show/:id",
        meta: {
          label: "Lab Results",
          icon: "🧪",
        },
      },
    ];
  }

  // Default fallback - Admin resources
  return [
    ...baseResources,
    {
      name: "patients",
      list: "/patients",
      create: "/patients/create",
      edit: "/patients/edit/:id",
      show: "/patients/show/:id",
      meta: {
        label: "Patients",
        icon: "👥",
      },
    },
    {
      name: "visits",
      list: "/visits",
      create: "/visits/create",
      edit: "/visits/edit/:id",
      show: "/visits/show/:id",
      meta: {
        label: "Visits",
        icon: "🏥",
      },
    },
  ];
};

export function AppResources(translate: (key: string, options?: any, defaultMessage?: string) => string): ResourceProps[] {
  // For demo purposes, we'll return admin resources by default
  // In a real app, you'd get the user role from context or auth provider
  return getRoleBasedResources("admin");
}

export function AppRoutes() {
  return <>
    {/* Dashboard Route */}
    <Route path="/dashboard" element={<DashboardPage />} />
    
    {/* Patient Routes */}
    <Route path="/patients" element={<PatientManagementPage />} />
    <Route path="/patients/create" element={<PatientManagementPage />} />
    <Route path="/patients/edit/:id" element={<PatientManagementPage />} />
    <Route path="/patients/show/:id" element={<PatientManagementPage />} />
    
    {/* Visit Routes */}
    <Route path="/visits" element={<VisitLoggingPage />} />
    <Route path="/visits/create" element={<VisitLoggingPage />} />
    <Route path="/visits/edit/:id" element={<VisitLoggingPage />} />
    <Route path="/visits/show/:id" element={<VisitLoggingPage />} />
    
    {/* Doctor Routes */}
    <Route path="/doctors" element={<DefinitionPage />} />
    <Route path="/doctors/create" element={<DefinitionPage />} />
    <Route path="/doctors/edit/:id" element={<DefinitionPage />} />
    <Route path="/doctors/show/:id" element={<DefinitionPage />} />
    
    {/* Therapy Schedule Routes */}
    <Route path="/therapy-schedules" element={<DefinitionPage />} />
    <Route path="/therapy-schedules/create" element={<DefinitionPage />} />
    <Route path="/therapy-schedules/edit/:id" element={<DefinitionPage />} />
    <Route path="/therapy-schedules/show/:id" element={<DefinitionPage />} />
    
    {/* Additional Routes for Different Roles */}
    <Route path="/reports" element={<DefinitionPage />} />
    <Route path="/settings" element={<DefinitionPage />} />
    <Route path="/prescriptions" element={<DefinitionPage />} />
    <Route path="/vital-signs" element={<DefinitionPage />} />
    <Route path="/medications" element={<DefinitionPage />} />
    <Route path="/my-records" element={<DefinitionPage />} />
    <Route path="/appointments" element={<DefinitionPage />} />
    <Route path="/lab-results" element={<DefinitionPage />} />
    
    {DefinitionRoutes()}
    {VisitsRoutes()}
  </>
}
