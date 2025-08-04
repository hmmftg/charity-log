import { LightTheme as DefaultLightTheme } from "@refinedev/mui"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { fontStyles } from "./fonts"
import { shouldUseAnimations } from "./performance-utils"

const useAnimations = shouldUseAnimations()

const LightTheme = createTheme({
  ...DefaultLightTheme,
  palette: {
    ...DefaultLightTheme.palette,
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748b",
      light: "#94a3b8",
      dark: "#475569",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
      contrastText: "#ffffff",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: '"Dibaj"',
    h1: { fontFamily: '"Dibaj"', fontWeight: 700, fontSize: "1.3rem" },
    h2: { fontFamily: '"Dibaj"', fontWeight: 700, fontSize: "1.3rem" },
    h3: { fontFamily: '"Dibaj"', fontWeight: 600, fontSize: "1.3rem" },
    h4: { fontFamily: '"Dibaj"', fontWeight: 600, fontSize: "1.3rem" },
    h5: { fontFamily: '"Dibaj"', fontWeight: 600, fontSize: "1.3rem" },
    h6: { fontFamily: '"Dibaj"', fontWeight: 600, fontSize: "1.3rem" },
    subtitle1: { fontFamily: '"Dibaj"', fontWeight: 500, fontSize: "1.3rem" },
    subtitle2: { fontFamily: '"Dibaj"', fontWeight: 500, fontSize: "1.0rem" },
    body1: { fontFamily: '"Dibaj"', fontWeight: 400, fontSize: "1.3rem" },
    body2: { fontFamily: '"Dibaj"', fontWeight: 400, fontSize: "1.3rem" },
    button: { fontFamily: '"Dibaj"', fontWeight: 500, textTransform: "none" },
    caption: { fontFamily: '"Dibaj"', fontWeight: 500, fontSize: "1.3rem" },
    overline: { fontFamily: '"Dibaj"', fontWeight: 400, fontSize: "1.3rem" },
  },
  appBar: {
    color: "#ffffff",
    gradient: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) /* @noflip */",
  },
  timeLine: {
    color: {
      pending: "#fef3c7",
      request: "#5ed2f2",
      timeout: "#1e293b",
      failed: "#dc2626",
      successfull: "#0cf055",
    },
    dotColor: {
      pending: "#f59e0b",
      request: "#5ed2f2",
      timeout: "#1e293b",
      failed: "#dc2626",
      successfull: "#10b981",
    },
  },
  components: {
    ...DefaultLightTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        ${fontStyles}
        body {
          background: ${useAnimations ? "linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%) /* @noflip */" : "#f8fafc"};
          min-height: 100vh;
          font-family: 'Dibaj';
        }
        * {
          will-change: auto !important;
        }
        *:not(:hover):not(:focus):not(:active) {
          transition-duration: 0s !important;
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: useAnimations ? "blur(10px)" : "none",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          borderRadius: "12px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          transition: useAnimations ? "all 0.2s ease-out" : "none",
          "&:hover": useAnimations
            ? {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)",
              }
            : {},
          position: "relative",
          overflow: "hidden",
          // Simplified particle effect - only on hover and much lighter
          ...(useAnimations && {
            "&:hover::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: 0,
              background: `
                radial-gradient(1px 1px at 30% 40%, rgba(37, 99, 235, 0.2), transparent),
                radial-gradient(1px 1px at 70% 60%, rgba(59, 130, 246, 0.2), transparent)
              `,
              animation: "cardHover 2s ease-out",
            },
            "@keyframes cardHover": {
              "0%": { opacity: 0 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
          }),
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          padding: "8px 16px",
          transition: useAnimations ? "all 0.15s ease-out" : "none",
          position: "relative",
          overflow: "hidden",
          ...(useAnimations && {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) /* @noflip */",
              transition: "left 0.3s ease-out",
            },
            "&:hover::before": {
              left: "100%",
            },
          }),
        },
        contained: {
          background: useAnimations ? "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%) /* @noflip */" : "#2563eb",
          boxShadow: "0 2px 8px 0 rgba(37, 99, 235, 0.2)",
          "&:hover": useAnimations
            ? {
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) /* @noflip */",
                boxShadow: "0 4px 12px 0 rgba(37, 99, 235, 0.3)",
                transform: "translateY(-1px)",
              }
            : {
                background: "#1d4ed8",
              },
        },
        outlined: {
          borderWidth: "1px",
          background: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            borderWidth: "1px",
            background: "rgba(37, 99, 235, 0.05)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
          transition: useAnimations ? "all 0.15s ease-out" : "none",
          "&:hover": useAnimations
            ? {
                transform: "scale(1.02)",
              }
            : {},
        },
        filled: {
          background: useAnimations
            ? "linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%) /* @noflip */"
            : "rgba(37, 99, 235, 0.8)",
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          position: "relative",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderLeft: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "-2px 0 8px 0 rgba(0, 0, 0, 0.05)",
          position: "relative",
          overflow: "hidden",
          height: "100vh", // Ensure full height
          minHeight: "100vh", // Minimum full height
          // Simplified snowflake effect - much lighter and only if animations enabled
          ...(useAnimations && {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              background: `
                radial-gradient(2px 2px at 20% 20%, rgba(37, 99, 235, 0.3), transparent),
                radial-gradient(1px 1px at 60% 40%, rgba(59, 130, 246, 0.2), transparent),
                radial-gradient(2px 2px at 80% 70%, rgba(37, 99, 235, 0.3), transparent),
                radial-gradient(1px 1px at 30% 80%, rgba(59, 130, 246, 0.2), transparent)
              `,
              backgroundSize: "200px 300px",
              animation: "gentleSnow 8s linear infinite",
            },
            "@keyframes gentleSnow": {
              "0%": {
                transform: "translateY(-50px)",
                opacity: 0,
              },
              "10%": {
                opacity: 1,
              },
              "90%": {
                opacity: 1,
              },
              "100%": {
                transform: "translateY(calc(100vh + 50px))",
                opacity: 0,
              },
            },
          }),
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "2px 4px",
          transition: useAnimations ? "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          position: "relative",
          overflow: "hidden",
          "&::before": useAnimations
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent) /* @noflip */",
                transition: "left 0.4s ease-out",
              }
            : {},
          "&:hover": {
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%) /* @noflip */",
            transform: useAnimations ? "translateX(4px) scale(1.02)" : "none",
            boxShadow: useAnimations ? "0 2px 8px rgba(37, 99, 235, 0.15)" : "none",
          },
          "&:hover::before": useAnimations
            ? {
                left: "100%",
              }
            : {},
          "&.Mui-selected": {
            background: useAnimations ? "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%) /* @noflip */" : "#2563eb",
            color: "#ffffff",
            boxShadow: "0 2px 12px rgba(37, 99, 235, 0.3)",
            "&:hover": {
              background: useAnimations ? "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) /* @noflip */" : "#1d4ed8",
              transform: useAnimations ? "translateX(4px) scale(1.02)" : "none",
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.9)",
            transition: useAnimations ? "all 0.15s ease-out" : "none",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.95)",
            },
            "&.Mui-focused": {
              background: "rgba(255, 255, 255, 1)",
              boxShadow: useAnimations ? "0 0 0 2px rgba(37, 99, 235, 0.2)" : "none",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderRadius: "8px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderRadius: "12px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: "rgba(248, 250, 252, 0.9)",
          borderRadius: "8px",
          padding: "2px",
        },
        indicator: {
          background: useAnimations ? "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%) /* @noflip */" : "#2563eb",
          height: "2px",
          borderRadius: "2px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: 500,
          transition: useAnimations ? "all 0.15s ease-out" : "none",
          "&:hover": {
            background: "rgba(37, 99, 235, 0.05)",
          },
          "&.Mui-selected": {
            background: useAnimations
              ? "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%) /* @noflip */"
              : "rgba(37, 99, 235, 0.1)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: useAnimations ? "all 0.15s ease-out" : "none",
          "&:hover": {
            background: "rgba(37, 99, 235, 0.05)",
            ...(useAnimations && {
              transform: "scale(1.05)",
            }),
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: useAnimations ? "linear-gradient(135deg, #ef4444 0%, #f87171 100%) /* @noflip */" : "#ef4444",
          boxShadow: "0 1px 4px rgba(239, 68, 68, 0.2)",
          fontSize: "1.3rem",
        },
      },
    },
  },
})

LightTheme.direction = "rtl"
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme)
export { LightThemeWithResponsiveFontSizes }
