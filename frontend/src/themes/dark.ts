import { DarkTheme as DefaultDarkTheme } from "@refinedev/mui"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { fontStyles } from "./fonts"
import { shouldUseAnimations } from "./performance-utils"

const useAnimations = shouldUseAnimations()

const DarkTheme = createTheme({
  ...DefaultDarkTheme,
  palette: {
    ...DefaultDarkTheme.palette,
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a855f7",
      light: "#c084fc",
      dark: "#9333ea",
      contrastText: "#ffffff",
    },
    success: {
      main: "#22c55e",
      light: "#4ade80",
      dark: "#16a34a",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fbbf24",
      light: "#fcd34d",
      dark: "#f59e0b",
      contrastText: "#000000",
    },
    error: {
      main: "#f87171",
      light: "#fca5a5",
      dark: "#ef4444",
      contrastText: "#ffffff",
    },
    info: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0a0f1c",
      paper: "#1a1f2e",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
    },
    divider: "#334155",
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
    caption: { fontFamily: '"Dibaj"', fontWeight: 400, fontSize: "1.3rem" },
    overline: { fontFamily: '"Dibaj"', fontWeight: 400, fontSize: "1.3rem" },
  },
  appBar: {
    color: "#1a1f2e",
    gradient: "linear-gradient(135deg, #232526 0%, #414345 100%) /* @noflip */",
  },
  timeLine: {
    color: {
      pending: "#451a03",
      request: "#0f6072ff",
      timeout: "#1e296b",
      failed: "#850a0a",
      successfull: "#052e16",
    },
    dotColor: {
      pending: "#fbbf24",
      request: "#19a0c0",
      timeout: "#1e296b",
      failed: "#850a0a",
      successfull: "#052e16",
    },
  },
  components: {
    ...DefaultDarkTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        ${fontStyles}
        body {
          background: ${useAnimations ? "linear-gradient(135deg, #0a0f1c 0%, #1a1f2e 100%) /* @noflip */" : "#0a0f1c"};
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
          background: "rgba(26, 31, 46, 0.95)",
          backdropFilter: useAnimations ? "blur(10px)" : "none",
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: useAnimations ? "all 0.2s ease-out" : "none",
          "&:hover": useAnimations
            ? {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
              }
            : {},
          position: "relative",
          overflow: "hidden",
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
                radial-gradient(1px 1px at 30% 40%, rgba(102, 126, 234, 0.3), transparent),
                radial-gradient(1px 1px at 70% 60%, rgba(118, 75, 162, 0.3), transparent)
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
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) ",
              transition: "left 0.3s ease-out",
            },
            "&:hover::before": {
              left: "100%",
            },
          }),
        },
        contained: {
          background: useAnimations ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%) /* @noflip */" : "#667eea",
          boxShadow: "0 2px 8px 0 rgba(102, 126, 234, 0.2)",
          "&:hover": useAnimations
            ? {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%) /* @noflip */",
                boxShadow: "0 4px 12px 0 rgba(102, 126, 234, 0.3)",
                transform: "translateY(-1px)",
              }
            : {
                background: "#5a67d8",
              },
        },
        outlined: {
          borderWidth: "1px",
          background: "rgba(255, 255, 255, 0.05)",
          "&:hover": {
            borderWidth: "1px",
            background: "rgba(102, 126, 234, 0.1)",
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
            ? "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%) /* @noflip */"
            : "rgba(102, 126, 234, 0.8)",
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(26, 31, 46, 0.95)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(26, 31, 46, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(26, 31, 46, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "-2px 0 8px 0 rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden",
          height: "100vh", // Ensure full height
          minHeight: "100vh", // Minimum full height
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
                radial-gradient(2px 2px at 20% 20%, rgba(102, 126, 234, 0.4), transparent) /* @noflip */,
                radial-gradient(1px 1px at 60% 40%, rgba(118, 75, 162, 0.3), transparent) /* @noflip */,
                radial-gradient(2px 2px at 80% 70%, rgba(102, 126, 234, 0.4), transparent) /* @noflip */,
                radial-gradient(1px 1px at 30% 80%, rgba(118, 75, 162, 0.3), transparent) /* @noflip */
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
                background: "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.15), transparent) /* @noflip */",
                transition: "left 0.4s ease-out",
              }
            : {},
          "&:hover": {
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.12) 100%) /* @noflip */",
            transform: useAnimations ? "translateX(4px) scale(1.02)" : "none",
            boxShadow: useAnimations ? "0 2px 8px rgba(102, 126, 234, 0.2)" : "none",
          },
          "&:hover::before": useAnimations
            ? {
                left: "100%",
              }
            : {},
          "&.Mui-selected": {
            background: useAnimations ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%) /* @noflip */" : "#667eea",
            color: "#ffffff",
            boxShadow: "0 2px 12px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: useAnimations ? "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%) /* @noflip */" : "#5a67d8",
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
            background: "rgba(255, 255, 255, 0.05)",
            transition: useAnimations ? "all 0.15s ease-out" : "none",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.08)",
            },
            "&.Mui-focused": {
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: useAnimations ? "0 0 0 2px rgba(102, 126, 234, 0.2)" : "none",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "rgba(26, 31, 46, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "rgba(26, 31, 46, 0.98)",
          backdropFilter: useAnimations ? "blur(8px)" : "none",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          padding: "2px",
        },
        indicator: {
          background: useAnimations ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%) /* @noflip */" : "#667eea",
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
            background: "rgba(102, 126, 234, 0.05)",
          },
          "&.Mui-selected": {
            background: useAnimations
              ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) /* @noflip */"
              : "rgba(102, 126, 234, 0.1)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: useAnimations ? "all 0.15s ease-out" : "none",
          "&:hover": {
            background: "rgba(102, 126, 234, 0.05)",
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
          background: useAnimations ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%) /* @noflip */" : "#f093fb",
          boxShadow: "0 1px 4px rgba(240, 147, 251, 0.2)",
          fontSize: "1.3rem",
        },
      },
    },
  },
})

DarkTheme.direction = "rtl"
const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme)
export { DarkThemeWithResponsiveFontSizes }
