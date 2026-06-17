import React from "react";
import { AppErrorBoundary } from "../../components/AppErrorBoundary";
import { Dashboard } from "../../components/dashboard/Dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <AppErrorBoundary title="Dashboard failed to load">
      <Dashboard />
    </AppErrorBoundary>
  );
};
