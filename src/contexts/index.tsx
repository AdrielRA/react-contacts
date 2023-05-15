import { Props } from "props";
import AlertProvider, { useAlert } from "./alert";
import AppProvider, { useApp } from "./app";
import AuthProvider, { useAuth } from "./auth";
import ThemeProvider, { useTheme } from "./theme";

export { useApp, useAuth, useAlert, useTheme };

const GlobalContext: React.FC<Props> = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AlertProvider>
          <AuthProvider>{children}</AuthProvider>
        </AlertProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default GlobalContext;
