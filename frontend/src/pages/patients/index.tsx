import React from "react";
import { PatientList } from "../../components/patient/PatientList";

export const PatientManagementPage: React.FC = () => {
  const handlePatientClick = (patient: any) => {
    console.log("Patient clicked:", patient);
    // Navigate to patient details
  };

  const handleAddPatient = () => {
    console.log("Add patient clicked");
    // Open add patient dialog
  };

  const handleEditPatient = (patient: any) => {
    console.log("Edit patient:", patient);
    // Open edit patient dialog
  };

  const handleDeletePatient = (patient: any) => {
    console.log("Delete patient:", patient);
    // Confirm and delete patient
  };

  return (
    <PatientList
      onPatientClick={handlePatientClick}
      onAddPatient={handleAddPatient}
      onEditPatient={handleEditPatient}
      onDeletePatient={handleDeletePatient}
    />
  );
};
