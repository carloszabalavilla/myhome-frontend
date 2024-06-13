import React, { createContext, useState, useContext } from "react";

export const AppBarContext = createContext();

export const AppBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBarContext.Provider value={{ open, setOpen, toggleDrawer }}>
      {children}
    </AppBarContext.Provider>
  );
};

export const useAppBar = () => useContext(AppBarContext);
