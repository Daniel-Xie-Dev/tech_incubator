import React, { createContext, useContext, useState } from "react";

// create your global store and init with empty or initial state object
const GlobalContext = createContext({});

// create a provider to share your store accross your entire app
export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentTask, setCurrentTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const store = {
    user,
    setUser,
    currentTask,
    setCurrentTask,
    completedTask,
    setCompletedTask,
  };
  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>;
};

// create a consummer to be called in your components and avoid importing both context and useContext everywhere
export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};
