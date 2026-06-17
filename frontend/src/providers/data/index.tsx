import { DataProviders } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { isMockMode } from "../../lib/authStorage";
import { healthcareDataProvider } from "./health-care/dataProvider";
import { dataProvider as mockDataProvider } from "./mockDataProvider";

export const dataProviders = (): DataProviders => {
  if (isMockMode()) {
    return {
      default: mockDataProvider(),
      fake: dataProvider("http://api.fake-rest.refine.dev"),
    };
  }

  return {
    default: healthcareDataProvider(),
    fake: dataProvider("http://api.fake-rest.refine.dev"),
  };
};
