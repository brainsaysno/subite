import React, { createContext, useState, useEffect } from "react";

export const AuthenticatedUserContext = createContext({
  user: "",
  setUser: () => {},
});

export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("user: " + user);
  }, []);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
