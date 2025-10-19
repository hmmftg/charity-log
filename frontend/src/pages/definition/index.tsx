import React from "react";
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { ResourceProps } from "@refinedev/core";
import { PatientResources, PatientRoutes } from './patient';
import { DoctorResources, DoctorRoutes } from './doctor';
import { Route } from 'react-router';

export const DefinitionPage: React.FC = () => {
  return (
    <div>
      <h1>Definition Page</h1>
      <p>This is a placeholder for the definition page.</p>
    </div>
  );
};

export function DefinitionResources(
  translate: (key: string, options?: any, defaultMessage?: string) => string
): ResourceProps[] {
  const name = "definitions"
  return [
    {
      name: name,
      meta: {
        icon: <SettingsTwoToneIcon />,
        label: translate("layout.sidebar.definitions"),
      },
    },
    ...PatientResources(translate, name), 
    ...DoctorResources(translate, name),
];
}

export function DefinitionRoutes() {
  return (
    <Route path="definitions">
      {PatientRoutes()}
      {DoctorRoutes()}
    </Route>
  );
}
