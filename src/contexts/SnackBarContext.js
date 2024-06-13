import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage("");
    setSeverity("error");
  }

  return (
    <SnackBarContext.Provider value={{ handleOpen, setMessage, setSeverity }}>
      {children}
      <Snackbar autoHideDuration={5000} open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => useContext(SnackBarContext);
