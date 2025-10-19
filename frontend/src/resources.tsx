import { ResourceProps } from '@refinedev/core';
import { Route } from 'react-router';
import { DefinitionResources, DefinitionRoutes } from './pages/definition';
import { VisitsResources, VisitsRoutes } from './pages/visits';
import { DashboardPage } from './pages/dashboard';
import { PatientManagementPage } from './pages/patients';
import { VisitLoggingPage } from './pages/visits';
import { DefinitionPage } from './pages/definition';

export function AppResources(translate: (key: string, options?: any, defaultMessage?: string) => string):ResourceProps[]{
    return [
        // Dashboard
        {
            name: "dashboard",
            list: "/dashboard",
            meta: {
                label: "Dashboard",
                icon: "🏥",
            },
        },
        // Patients
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
        // Visits
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
        // Doctors
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
        // Therapy Schedules
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
        ...DefinitionResources(translate),
        ...VisitsResources(translate),
    ];
  }
  
  export function AppRoutes(){ 
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
          
          {DefinitionRoutes()}
          {VisitsRoutes()}
          </>
  }