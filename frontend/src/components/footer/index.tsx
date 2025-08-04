import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { RefineThemedLayoutV2Props } from "@refinedev/mui";
import React from "react";
import { useTheme } from "@mui/material/styles";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export const Footer: React.FC<RefineThemedLayoutV2Props> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "block",
          padding: "20px",
          width: "100%",
          height: "64px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "64px",
          padding: "20px",
          position: "fixed",
          left: "0",
          bottom: "0",
          borderTop: "1px solid #E7E7E7",
          backgroundColor: theme.appBar.color,
        }}
      >
        Pooya.ir 2024
        <Tooltip title="hmmftg 1402-10">
          <Button variant="text" color="error">
            <TipsAndUpdatesIcon />
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};
