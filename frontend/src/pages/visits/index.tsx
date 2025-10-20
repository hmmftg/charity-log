import React from "react";
import { Route } from 'react-router';
import { ResourceProps } from "@refinedev/core";
import { VisitLogging } from "../../components/visits/VisitLogging";
import { VisitsListPage } from "./list";
import { VisitDetailsPage } from "./show";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const VisitLoggingPage: React.FC = () => {
  const handleSaveVisit = (visitData: any) => {
    console.log("Saving visit:", visitData);
    // Save visit data to backend
  };

  const handleCancel = () => {
    console.log("Cancelling visit logging");
    // Navigate back or reset form
  };

  return (
    <VisitLogging
      onSaveVisit={handleSaveVisit}
      onCancel={handleCancel}
    />
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