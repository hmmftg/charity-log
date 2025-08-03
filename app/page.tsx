"use client"

import { Refine } from "@refinedev/core"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"
import { ThemedLayoutV2, ThemedSiderV2, useNotificationProvider } from "@refinedev/mui"
import routerProvider from "@refinedev/nextjs-router"
import { authProvider } from "@/providers/auth-provider"
import { dataProvider } from "@/providers/data-provider"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Dashboard, People, LocalHospital, Schedule, Assignment, AccountCircle } from "@mui/icons-material"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
})

function App() {
  return (
    <RefineKbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: {
                label: "Dashboard",
                icon: <Dashboard />,
              },
            },
            {
              name: "patients",
              list: "/patients",
              create: "/patients/create",
              edit: "/patients/edit/:id",
              show: "/patients/show/:id",
              meta: {
                label: "Patients",
                icon: <People />,
              },
            },
            {
              name: "visits",
              list: "/visits",
              create: "/visits/create",
              edit: "/visits/edit/:id",
              show: "/visits/show/:id",
              meta: {
                label: "Visits",
                icon: <LocalHospital />,
              },
            },
            {
              name: "therapy_schedules",
              list: "/therapy-schedules",
              create: "/therapy-schedules/create",
              edit: "/therapy-schedules/edit/:id",
              show: "/therapy-schedules/show/:id",
              meta: {
                label: "Therapy Schedules",
                icon: <Schedule />,
              },
            },
            {
              name: "doctors",
              list: "/doctors",
              create: "/doctors/create",
              edit: "/doctors/edit/:id",
              show: "/doctors/show/:id",
              meta: {
                label: "Doctors",
                icon: <Assignment />,
              },
            },
            {
              name: "profiles",
              list: "/profiles",
              edit: "/profiles/edit/:id",
              meta: {
                label: "Profile",
                icon: <AccountCircle />,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "medical-visit-logger",
          }}
        >
          <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed />}>
            {/* Routes will be handled by Next.js routing */}
          </ThemedLayoutV2>
          <RefineKbar />
        </Refine>
      </ThemeProvider>
    </RefineKbarProvider>
  )
}

export default App
