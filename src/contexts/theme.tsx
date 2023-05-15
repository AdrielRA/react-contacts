import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
} from "@mui/material";
import { ThemeContextProps } from "contexts-types";
import "global/styles";
import { GlobalStyle } from "global/styles";
import { getMuiTheme } from "global/styles/themes";
import dark from "global/styles/themes/dark";
import light from "global/styles/themes/light";
import { usePersistedState } from "hooks";
import { Props } from "props";
import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const Theme: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = usePersistedState<PaletteMode>(
    "@react_contacts_theme_mode",
    "light",
  );

  const theme = React.useMemo(
    () => getMuiTheme(mode === "light" ? light : dark),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light",
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        toggleColorMode,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={mode === "light" ? light : dark}>
          <CssBaseline />
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme: () => ThemeContextProps = () => useContext(ThemeContext);

export default Theme;
