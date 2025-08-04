import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import { Route } from "react-router";
import { ResourceProps } from "@refinedev/core";
import { VisitList } from "./list";
import { VisitShow } from "./show";
import { VisitEdit } from "./edit";
import { VisitCreate } from "./create";

export function VisitResources(
  translate: (key: string, options?: any, defaultMessage?: string) => string,
  parent: string,
): ResourceProps[] {
  return [
    {
      name: "visit",
      list: `/${parent}/visit`,
      show: `/${parent}/visit/show/:id`,
      create: `/${parent}/visit/create`,
      edit: `/${parent}/visit/edit/:id`,
      clone: `/${parent}/visit/clone/:id`,
      meta: {
        canDelete: true,
        icon: <RocketLaunchTwoToneIcon />,
        label: translate("layout.sidebar.visit"),
        parent: parent,
      },
    },
  ];
}

export function VisitRoutes() {
  return (
    <Route path="visit">
      <Route index element={<VisitList />} />
      <Route path="show/:id" element={<VisitShow />} />
      <Route path="edit/:id" element={<VisitEdit />} />
      <Route path="create" element={<VisitCreate />} />
      <Route path="clone/:id" element={<VisitCreate />} />
    </Route>
  );
}
