import React, { createContext, Dispatch, useContext, useState } from 'react';

type AppContextType = {
  authenticated: boolean;
  setAuthenticated: Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  authenticated: true,
  setAuthenticated: () => console.error('"setAuthenticated" function not initialized'),
});

export const useAppContext = () => {
  return useContext(AppContext);
};

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(true);

  return <AppContext.Provider value={{ authenticated, setAuthenticated }}>{children}</AppContext.Provider>;
};
