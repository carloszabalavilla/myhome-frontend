import { styled } from "@mui/system";
import { Container, Box, FormControl, TextField, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

/* Containers */
export const SContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
}));

export const SBox = styled(Box)(({ theme }) => ({
  "& > *": { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "100%",
}));

/* Forms */
export const SFormControl = styled(FormControl)({
  transition: "all 0.2s",
  ":hover": {
    transform: "scale(1.02)",
  },
});

export const STextField = styled(TextField)({
  transition: "all 0.2s",
  ":hover": {
    transform: "scale(1.02)",
  },
});

/* Avatars */
export const SAvatar = styled(Avatar)(() => ({
  backgroundColor: useTheme().palette.primary.main,
  transition: "all 0.4s",

  ":hover": {
    backgroundColor: useTheme().palette.secondary.main,
    transform: "rotateY(180deg)",
  },
}));

/* AppBar */
const drawerWidth = 240;

export const SAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
