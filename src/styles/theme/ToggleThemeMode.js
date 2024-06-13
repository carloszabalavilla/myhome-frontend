import React, { useState } from "react";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "@mui/material";

export default function ToggleThemeMode({ children }) {
  const [mode, setMode] = useState("light");

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const currentTheme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
