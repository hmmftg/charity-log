
import { DataProviders } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { dataProvider as mockDataProvider } from "./mockDataProvider";

export const dataProviders = (): DataProviders => ({
    default: mockDataProvider(),
    fake: dataProvider("http://api.fake-rest.refine.dev")
})