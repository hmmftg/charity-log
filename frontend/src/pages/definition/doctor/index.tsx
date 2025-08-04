
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import { Route } from "react-router";
import { ResourceProps } from '@refinedev/core';
import { DoctorList } from './list';
import { DoctorShow } from './show';
import { DoctorEdit } from './edit';
import { DoctorCreate } from './create';

export function DoctorResources(translate: (key: string, options?: any, defaultMessage?: string) => string, parent: string):ResourceProps[]{
    return [
        {
          name: "doctors",
          list: `/${parent}/doctors`,
          show: `/${parent}/doctors/show/:id`,
          create: `/${parent}/doctors/create`,
          edit: `/${parent}/doctors/edit/:id`,
          clone: `/${parent}/doctors/clone/:id`,
          meta: {
            canDelete: true,
            icon: <RocketLaunchTwoToneIcon />,
            label: translate("layout.sidebar.doctors"),
            parent: parent
          },
        },
    ];
  }


export function DoctorRoutes() {
  return <Route path="doctors">
  <Route index element={<DoctorList />} />
  <Route path="show/:id" element={<DoctorShow />} />
  <Route path="edit/:id" element={<DoctorEdit />} />
  <Route path="create" element={<DoctorCreate />} />
  <Route path="clone/:id" element={<DoctorCreate />} />
</Route>
}