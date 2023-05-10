import { AuthContextProps } from "contexts-types";
import { usePersistedState } from "hooks";
import { Props } from "props";
import React, { createContext, useCallback, useContext } from "react";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const Auth: React.FC<Props> = ({ children }) => {
  const [logged, setLogged] = usePersistedState<boolean | undefined>(
    "@react_contacts_logged",
    undefined
  );

  const signIn = useCallback(() => {
    setLogged(true);
  }, [setLogged]);

  const signOut = useCallback(() => {
    setLogged(undefined);
  }, [setLogged]);

  return (
    <AuthContext.Provider
      value={{
        logged,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: () => AuthContextProps = () => useContext(AuthContext);

export default Auth;
