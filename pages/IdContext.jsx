import { createContext, useState } from "react";

const IdContext = createContext();

export function IdProvider({ children }) {
  const [id, setId] = useState(null);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}

export default IdContext;
