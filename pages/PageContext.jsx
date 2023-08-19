import { createContext, useState } from "react";

const PageContext = createContext();

export function PageProvider({ children }) {
  const [page, setPage] = useState(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export default PageContext;
