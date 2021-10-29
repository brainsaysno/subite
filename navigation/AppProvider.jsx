import React, { createContext, useState } from "react";

export const AppContext = createContext({
  user: null,
  setUser: () => {},
  isDriver: null,
  setIsDriver: () => {},
  usingDarkMode: null,
  setUsingDarkMode: () => {},
});

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isDriver, setIsDriver] = useState(true);

  // TODO: Decide on dark vs light default
  const [usingDarkMode, setUsingDarkMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isDriver,
        setIsDriver,
        usingDarkMode,
        setUsingDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
