import { createTheme } from "@mui/material";
import { DefaultTheme } from "styled-components";

export const getMuiTheme = (theme: DefaultTheme) =>
  createTheme({
    palette: {
      primary: {
        ...theme.colors.primary,
      },
      secondary: {
        ...theme.colors.secondary,
      },
      background: {
        default: theme.colors.background.main,
        paper: theme.colors.background.light,
      },
      text: {
        primary: theme.colors.text.main,
        secondary: theme.colors.text.light,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: 32,
          },
          outlined: {
            borderRadius: 32,
          },
        },
      },
    },
  });
