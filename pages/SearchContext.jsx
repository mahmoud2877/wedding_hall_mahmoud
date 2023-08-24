import { createContext, useState } from "react";

export const searchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState({});
  console.log(search, "searchProvider");

  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
}
