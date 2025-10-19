"use client"

import { useEffect, useMemo } from "react";

import { Refine, Authenticated, type I18nProvider } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Fade } from "@mui/material"
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
  NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { useTranslation } from "react-i18next";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(jalaliday);
dayjs.extend(localizedFormat);

import { authProvider } from "./providers/ums/authProvider";
import { Page } from "./pages/layout/page";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AppResources, AppRoutes } from "./resources";
import { AuthPagesRoutes } from "./pages/auth";
import { TitleHandler } from "./title";
import { DirectionalProvider } from "./rtl";
import { dataProviders } from "./providers/data"

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key, params) => t(key, params).toString(),
    changeLocale: (lang: string) => {
      return i18n.changeLanguage(lang);
    },
    getLocale: () => i18n.language,
  };

  // Determine direction based on current language
  const direction = useMemo(() => {
    return i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Update document direction and html lang when language changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Update HTML attributes
    htmlElement.setAttribute("dir", direction);
    htmlElement.setAttribute("lang", i18n.language);

    // Update body direction for better compatibility
    bodyElement.style.direction = direction;

    // Update dayjs locale based on language
    if (i18n.language === "fa") {
      dayjs.locale("fa");
    } else {
      dayjs.locale("en");
    }
  }, [direction, i18n.language]);

  return (
    <DirectionalProvider direction={direction}>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              WebkitFontSmoothing: "auto",
              // Ensure smooth transitions when direction changes
              transition: "direction 0.3s ease-in-out",
            },
            body: {
              // Ensure body follows the direction
              transition: "direction 0.3s ease-in-out",
            },
          }}
        />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <RefineKbarProvider>
            <RefineSnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: direction === "rtl" ? "right" : "left",
              }}
              TransitionComponent={Fade}
            >
                <DevtoolsProvider>
                  <Refine
                    dataProvider={dataProviders()}
                    resources={AppResources(i18nProvider.translate)}
                    notificationProvider={useNotificationProvider}
                    routerProvider={routerBindings}
                    authProvider={authProvider}
                    i18nProvider={i18nProvider}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      metrics: true,
                      disableTelemetry: true,
                      projectId: "He9np2-eJT4qT-Ce1wrs",
                    }}
                  >
                    <DocumentTitleHandler handler={TitleHandler} />
                    <Routes>
                      <Route
                        element={
                          <Page>
                            <Outlet />
                          </Page>
                        }
                      >
                        <Route
                          index
                          element={
                            <NavigateToResource resource="dashboard" />
                          }
                        />
                        {AppRoutes()}
                        <Route path="*" element={<ErrorComponent />} />
                      </Route>
                      <Route
                        element={
                          <Authenticated key="ums-pages" fallback={<Outlet />}>
                            <NavigateToResource />
                          </Authenticated>
                        }
                      >
                        {AuthPagesRoutes()}
                      </Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                  </Refine>
                  <DevtoolsPanel />
                </DevtoolsProvider>
              </RefineSnackbarProvider>
          </RefineKbarProvider>
        </BrowserRouter>
      </ColorModeContextProvider>
    </DirectionalProvider>
  );
}

export default App;
