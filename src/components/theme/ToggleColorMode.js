import React, { useState } from "react";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "@mui/material";

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const currentTheme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
