import { createContext, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  console.log(profile, "authenProfile");

  return (
    <authContext.Provider value={{ profile, setProfile }}>
      {children}
    </authContext.Provider>
  );
}
