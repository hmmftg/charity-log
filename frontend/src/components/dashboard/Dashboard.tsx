import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { AdminDashboard, DoctorDashboard, NurseDashboard, PatientDashboard } from "./RoleBasedDashboards";

export const Dashboard: React.FC = () => {
  const { data: user } = useGetIdentity();

  // Determine which dashboard to show based on user role
  const renderDashboard = () => {
    if (!user) {
      return <AdminDashboard />; // Default fallback
    }

    const role = user.role?.toLowerCase();
    
    switch (role) {
      case "administrator":
      case "admin":
        return <AdminDashboard />;
      case "doctor":
        return <DoctorDashboard />;
      case "nurse":
        return <NurseDashboard />;
      case "patient":
        return <PatientDashboard />;
      default:
        return <AdminDashboard />; // Default fallback
    }
  };

  return renderDashboard();
};
