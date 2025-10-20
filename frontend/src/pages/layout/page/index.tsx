import React from "react";
import { ThemedLayout, ThemedTitle } from "@refinedev/mui";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Authenticated, useTranslate } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { Box } from "@mui/material";
import { Header } from "../../../components/header/Header";
import { Footer } from "../../../components";
import { RoleBasedSidebar } from "../../../components/sidebar/RoleBasedSidebar";

export interface PageParams {
  children: React.ReactElement;
}

export const Page: React.FC<PageParams> = ({ children }) => {
  const translate = useTranslate();
  return (
    <>
      <ThemedLayout
        Header={Header}
        Sider={RoleBasedSidebar}
        Title={({ collapsed }) => (
          <ThemedTitle
            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
            collapsed={collapsed}
            icon={<LocalHospitalIcon fontSize="large" />}
            text="Healthcare System"
          />
        )}
        Footer={Footer}
      >
        <Authenticated
          key={children.type.toString()}
          fallback={<CatchAllNavigate to={`/login`} />}
        >
          <Box sx={{ minHeight: "100vh", background: "transparent" }}>
            {children}
          </Box>
        </Authenticated>
      </ThemedLayout>
    </>
  );
};
