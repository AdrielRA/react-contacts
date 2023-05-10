import { Props } from "props";
import AlertProvider, { useAlert } from "./alert";
import AppProvider, { useApp } from "./app";
import AuthProvider, { useAuth } from "./auth";

export { useApp, useAuth, useAlert };

const GlobalContext: React.FC<Props> = ({ children }: Props) => {
  return (
    <AppProvider>
      <AlertProvider>
        <AuthProvider>{children}</AuthProvider>
      </AlertProvider>
    </AppProvider>
  );
};

export default GlobalContext;
