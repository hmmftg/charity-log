import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import { Route } from "react-router";
import { ResourceProps } from "@refinedev/core";
import { PrescriptionResources, PrescriptionRoutes } from "./prescription";
import { VisitResources, VisitRoutes } from "./visit";

export function VisitsResources(
  translate: (key: string, options?: any, defaultMessage?: string) => string
): ResourceProps[] {
  const name = "visits"
  return [
    {
      name: name,
      meta: {
        canDelete: true,
        icon: <RocketLaunchTwoToneIcon />,
        label: translate("layout.sidebar.visits"),
      },
    },
    ...VisitResources(translate, name),
    ...PrescriptionResources(translate, name),
  ];
}

export function VisitsRoutes() {
  return (
    <Route path="visits">
      {VisitRoutes()}
      {PrescriptionRoutes()}
    </Route>
  );
}
