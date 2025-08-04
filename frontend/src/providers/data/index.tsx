
import { DataProviders } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { dataProvider as healthCare } from "./health-care/dataProvider";

export const dataProviders = (): DataProviders => ({
    default: healthCare(),
    fake: dataProvider("http://api.fake-rest.refine.dev")
})