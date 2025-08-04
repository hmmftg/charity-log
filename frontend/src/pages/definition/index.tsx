import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

import { ResourceProps } from "@refinedev/core";

import { PatientResources, PatientRoutes } from './patient';
import { DoctorResources, DoctorRoutes } from './doctor';
import { Route } from 'react-router';

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
