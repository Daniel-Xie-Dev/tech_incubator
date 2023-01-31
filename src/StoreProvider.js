import React, { createContext, useContext } from "react";

import useAuth from "./hooks/useAuth";
// create your global store and init with empty or initial state object
const GlobalContext = createContext({});

// create a provider to share your store accross your entire app
export const StoreProvider = ({ children }) => {
  const auth = useAuth();

  const store = {
    auth,
  };
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

// create a consummer to be called in your components and avoid importing both context and useContext everywhere
export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};
