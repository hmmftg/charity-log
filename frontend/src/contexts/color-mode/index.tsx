"use client"

import React, { type PropsWithChildren, createContext, useEffect, useState, useContext } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import { LightThemeWithResponsiveFontSizes } from "../../themes/light"
import { DarkThemeWithResponsiveFontSizes } from "../../themes/dark"

type ColorModeContextType = {
  mode: string
  setMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType)

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const [mode, setMode] = useState("light")

  useEffect(() => {
    const mode = localStorage.getItem("colorMode")
    if (mode) {
      setMode(mode)
    }
  }, [])

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark")
      localStorage.setItem("colorMode", "dark")
    } else {
      setMode("light")
      localStorage.setItem("colorMode", "light")
    }
  }

  // Create theme with proper direction based on current language
  const currentTheme = React.useMemo(() => {
    const baseTheme = mode === "dark" ? DarkThemeWithResponsiveFontSizes : LightThemeWithResponsiveFontSizes

    // Update theme direction based on current language
    const direction = i18n.language === "fa" ? "rtl" : "ltr"

    return {
      ...baseTheme,
      direction,
    }
  }, [mode, i18n.language])

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}
