
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import { Route } from "react-router";
import { PrescriptionList } from './list';
import { PrescriptionShow } from './show';
import { PrescriptionEdit } from './edit';
import { PrescriptionCreate } from './create';
import { ResourceProps } from '@refinedev/core';

export function PrescriptionResources(translate: (key: string, options?: any, defaultMessage?: string) => string, parent: string):ResourceProps[]{
    return [
        {
          name: "prescription",
          list: `/${parent}/prescription`,
          show: `/${parent}/prescription/show/:id`,
          create: `/${parent}/prescription/create`,
          edit: `/${parent}/prescription/edit/:id`,
          clone: `/${parent}/prescription/clone/:id`,
          meta: {
            canDelete: true,
            icon: <RocketLaunchTwoToneIcon />,
            label: translate("layout.sidebar.prescription"),
            parent: parent
          },
        },
    ];
  }


export function PrescriptionRoutes() {
  return <Route path="prescription">
  <Route index element={<PrescriptionList />} />
  <Route path="show/:id" element={<PrescriptionShow />} />
  <Route path="edit/:id" element={<PrescriptionEdit />} />
  <Route path="create" element={<PrescriptionCreate />} />
  <Route path="clone/:id" element={<PrescriptionCreate />} />
</Route>
}