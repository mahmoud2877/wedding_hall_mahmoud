import { createContext, useState } from "react";

const hallsContext = createContext();

export function HallsProvider({ children }) {
  const [halls, setHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);

  return (
    <hallsContext.Provider
      value={{ halls, setHalls, filteredHalls, setFilteredHalls }}
    >
      {children}
    </hallsContext.Provider>
  );
}

export default hallsContext;
