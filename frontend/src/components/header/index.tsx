import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/material";

import { ColorModeContext } from "../../contexts/color-mode";
import { HamburgerMenu } from "./hamburger-menu";
import { LanguageSwitcher } from "../../themes/language-switcher";

type IUser = {
  id: string;
  name: string;
  person: string;
  branch: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();
  const theme = useTheme();

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar sx={{ backgroundColor: theme.appBar.color }}>
        <Box sx={{ flexShrink: 0 }}>
          <HamburgerMenu color="secondary" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack
              direction="row"
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <LanguageSwitcher />
              <IconButton
                color="secondary"
                onClick={() => {
                  setMode();
                }}
              >
                {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>

              {user?.name && (
                <Stack
                  direction="row"
                  gap="16px"
                  alignItems="center"
                  justifyContent="center"
                >
                  {user?.name && (
                    <Typography color="secondary"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline-block",
                        },
                      }}
                      variant="subtitle2"
                    >
                      {user?.name}
                    </Typography>
                  )}
                  <Avatar alt={user?.name}>
                    <FaceIcon />
                  </Avatar>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
