import { createContext, useState } from "react";

const FavouriteContext = createContext({});

export function FavouriteProvider({ children }) {
  const [favourite, setFavourite] = useState({});

  return (
    <FavouriteContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;
