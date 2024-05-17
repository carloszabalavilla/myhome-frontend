import { createTheme } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[200],
    },
    secondary: {
      main: orange[200],
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[700], // Puedes ajustar estos colores según tus preferencias
    },
    secondary: {
      main: orange[400], // Puedes ajustar estos colores según tus preferencias
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});
