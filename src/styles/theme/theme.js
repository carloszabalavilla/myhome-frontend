import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/x-date-pickers/locales";
const blue = "#83ddf5";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue,
    },
    secondary: {
      main: "#ffcc80",
      darker: "#ffb74d",
      lighter: "#ffe0b2",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
  esES,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#05829a",
    },
    secondary: {
      main: "#9c009f",
      darker: "#8a0098",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
  esES,
});
