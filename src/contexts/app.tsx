import { AppContextProps } from "contexts-types";
import { useOnlineStatus } from "hooks";
import { Props } from "props";
import React, { createContext, useContext } from "react";

const AppContext = createContext<AppContextProps>({} as AppContextProps);

const App: React.FC<Props> = ({ children }) => {
  const online = useOnlineStatus();

  return (
    <AppContext.Provider
      value={{
        online,
      }}
    >
      {children}
      {!online && <p>Você está trabalhando offline...</p>}
    </AppContext.Provider>
  );
};

export const useApp: () => AppContextProps = () => useContext(AppContext);

export default App;
