import React from "react";
import { MedicationManagement } from "../../components/medications/MedicationManagement";

export const MedicationPage: React.FC = () => {
  const handleSaveMedication = (medication: any) => {
    console.log("Saving medication:", medication);
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log("Cancelling medication management");
    // TODO: Navigate back or reset form
  };

  return (
    <MedicationManagement
      onSaveMedication={handleSaveMedication}
      onCancel={handleCancel}
    />
  );
};
