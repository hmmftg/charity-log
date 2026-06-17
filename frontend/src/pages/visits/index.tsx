import React from "react";
import { Route } from 'react-router';
import { ResourceProps } from "@refinedev/core";
import { VisitLogging } from "../../components/visits/VisitLogging";
import { VisitsListPage } from "./list";
import { VisitDetailsPage } from "./show";
import { AppErrorBoundary } from "../../components/AppErrorBoundary";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const VisitLoggingPage: React.FC = () => {
  const handleSaveVisit = (visitData: any) => {
    console.log("Saving visit:", visitData);
  };

  const handleCancel = () => {
    console.log("Cancelling visit logging");
  };

  return (
    <AppErrorBoundary title="Visit logging failed to load">
      <VisitLogging
        onSaveVisit={handleSaveVisit}
        onCancel={handleCancel}
      />
    </AppErrorBoundary>
  );
};

export function VisitsResources(
  translate: (key: string, options?: any, defaultMessage?: string) => string
): ResourceProps[] {
  return [
    {
      name: "visits",
      list: "/visits",
      create: "/visits/create",
      edit: "/visits/edit/:id",
      show: "/visits/show/:id",
      meta: {
        icon: <LocalHospitalIcon />,
        label: "Visits",
      },
    },
  ];
}

export function VisitsRoutes() {
  return (
    <>
      <Route path="/visits" element={<VisitsListPage />} />
      <Route path="/visits/create" element={<VisitLoggingPage />} />
      <Route path="/visits/edit/:id" element={<VisitLoggingPage />} />
      <Route path="/visits/show/:id" element={<VisitDetailsPage />} />
    </>
  );
}