import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { ThemedSiderV2 } from "@refinedev/mui";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { useRoleBasedResources } from "../../resources/RoleBasedResources";

export const RoleBasedSidebar: React.FC = () => {
  const theme = useTheme();
  const { data: identity } = useGetIdentity();
  const roleBasedResources = useRoleBasedResources();

  const userRole = identity?.role || 'Patient';
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator": return "error";
      case "Doctor": return "primary";
      case "Nurse": return "success";
      case "Patient": return "info";
      default: return "default";
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* User Role Indicator */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Logged in as:
          </Typography>
        </Box>
        <Chip
          label={userRole}
          color={getRoleColor(userRole) as any}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* Role-based Navigation */}
      <Box sx={{ flex: 1 }}>
        <ThemedSiderV2
          resources={roleBasedResources}
          Title={({ collapsed }) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  display: collapsed ? "none" : "block",
                }}
              >
                Healthcare System
              </Typography>
            </Box>
          )}
        />
      </Box>

      {/* Footer with role info */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {userRole} Access Level
        </Typography>
      </Box>
    </Box>
  );
};
