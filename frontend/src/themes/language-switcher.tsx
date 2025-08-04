"use client"

import React from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Box, Typography } from "@mui/material"
import { Check as CheckIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

const languages = [
  {
    code: "fa",
    name: "فارسی",
    flag: "🇮🇷",
    direction: "rtl",
  },
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
]

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode)
      handleClose()
    } catch (error) {
      console.error("Failed to change language:", error)
    }
  }

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  return (
    <>
      <Tooltip title={t("layout.header.change_language")}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={{ fontSize: "1.2rem" }}>{currentLanguage.flag}</Typography>
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 180,
            mt: 1,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1,
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
            sx={{
              direction: language.direction,
              textAlign: language.direction === "rtl" ? "right" : "left",
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography sx={{ fontSize: "1.2rem" }}>{language.flag}</Typography>
            </ListItemIcon>
            <ListItemText
              primary={language.name}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: i18n.language === language.code ? 600 : 400,
                },
              }}
            />
            {i18n.language === language.code && (
              <CheckIcon
                fontSize="small"
                sx={{
                  color: "primary.main",
                  ml: language.direction === "rtl" ? 0 : 1,
                  mr: language.direction === "rtl" ? 1 : 0,
                }}
              />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
