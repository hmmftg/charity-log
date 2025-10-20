import { ResourceProps } from '@refinedev/core';
import { useGetIdentity } from '@refinedev/core';

// Define role-based permissions
export const ROLE_PERMISSIONS = {
  Administrator: [
    'dashboard',
    'patients',
    'visits', 
    'doctors',
    'therapy-schedules',
    'medications',
    'definitions'
  ],
  Doctor: [
    'dashboard',
    'patients',
    'visits',
    'therapy-schedules',
    'medications'
  ],
  Nurse: [
    'dashboard',
    'patients',
    'visits'
  ],
  Patient: [
    'dashboard'
  ]
};

// Base resources configuration
export const BASE_RESOURCES: ResourceProps[] = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      label: "Dashboard",
      icon: "🏥",
    },
  },
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
    name: "medications",
    list: "/medications",
    create: "/medications/create",
    edit: "/medications/edit/:id",
    show: "/medications/show/:id",
    meta: {
      label: "Medications",
      icon: "💊",
    },
  },
  {
    name: "definitions",
    list: "/definitions",
    meta: {
      label: "System Management",
      icon: "⚙️",
    },
  },
];

// Hook to get role-based resources
export const useRoleBasedResources = (): ResourceProps[] => {
  const { data: identity } = useGetIdentity();
  
  if (!identity) {
    return [];
  }

  const userRole = identity.role || 'Patient';
  const allowedResources = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.Patient;
  
  return BASE_RESOURCES.filter(resource => 
    allowedResources.includes(resource.name)
  );
};

// Function to get role-based resources (for non-hook usage)
export const getRoleBasedResources = (userRole: string): ResourceProps[] => {
  const allowedResources = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.Patient;
  
  return BASE_RESOURCES.filter(resource => 
    allowedResources.includes(resource.name)
  );
};