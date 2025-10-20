import React from "react";
import { TherapyScheduleManagement } from "../../components/therapy/TherapyScheduleManagement";

export const TherapySchedulePage: React.FC = () => {
  const handleSaveSchedule = (schedule: any) => {
    console.log("Saving therapy schedule:", schedule);
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log("Cancelling therapy schedule management");
    // TODO: Navigate back or reset form
  };

  return (
    <TherapyScheduleManagement
      onSaveSchedule={handleSaveSchedule}
      onCancel={handleCancel}
    />
  );
};
