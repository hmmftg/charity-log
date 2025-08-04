import React from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

import type { IconButtonProps } from "@mui/material/IconButton";
import { useThemedLayoutContext } from "@refinedev/mui";

const HamburgerIcon = (props: IconButtonProps) => (
  <IconButton aria-label="open drawer" edge="start" {...props}>
    <Menu />
  </IconButton>
);

export const HamburgerMenu: React.FC<{color: string}> = ({color}) => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <>
      <HamburgerIcon
        onClick={() => setSiderCollapsed(!siderCollapsed)}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          color:{color},
          ...(!siderCollapsed && { display: "none" }),
        }}
      />
      <HamburgerIcon
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          color:{color},
          ...(mobileSiderOpen && { display: "none" }),
        }}
      />
    </>
  );
};
