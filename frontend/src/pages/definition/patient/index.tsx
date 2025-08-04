
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import { Route } from "react-router";
import { ResourceProps } from '@refinedev/core';
import { PatientList } from './list';
import { PatientShow } from './show';
import { PatientEdit } from './edit';
import { PatientCreate } from './create';

export function PatientResources(translate: (key: string, options?: any, defaultMessage?: string) => string, parent: string):ResourceProps[]{
    return [
        {
          name: "patient",
          list: `/${parent}/patient`,
          show: `/${parent}/patient/show/:id`,
          create: `/${parent}/patient/create`,
          edit: `/${parent}/patient/edit/:id`,
          clone: `/${parent}/patient/clone/:id`,
          meta: {
            canDelete: true,
            icon: <RocketLaunchTwoToneIcon />,
            label: translate("layout.sidebar.patient"),
            parent: parent,
          },
        },
    ];
  }


export function PatientRoutes() {
  return <Route path="patient">
  <Route index element={<PatientList />} />
  <Route path="show/:id" element={<PatientShow />} />
  <Route path="edit/:id" element={<PatientEdit />} />
  <Route path="create" element={<PatientCreate />} />
  <Route path="clone/:id" element={<PatientCreate />} />
</Route>
}