import React from "react";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Authenticated, useTranslate } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { Grid2 } from "@mui/material";
import { Header } from "../../../components";
import { Footer } from "../../../components";

export interface PageParams {
  children: React.ReactElement;
}

export const Page: React.FC<PageParams> = ({ children }) => {
  const translate = useTranslate();
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
            collapsed={collapsed}
            icon={<SettingsSuggestIcon fontSize="large" />}
            text={translate("layout.header.title")}
          />
        )}
        Footer={Footer}
      >
        <Authenticated
          key={children.type.toString()}
          fallback={<CatchAllNavigate to={`/login`} />}
        >
          <Grid2 container columns={1} spacing={2}>
            <Grid2 size={6}>{children}</Grid2>
          </Grid2>
        </Authenticated>
      </ThemedLayoutV2>
    </>
  );
};
