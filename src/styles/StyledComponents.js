import { styled } from "@mui/system";
import { Container, Box, FormControl, TextField, Avatar, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";


/* Containers */
export const SContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
}));

export const SCenteredContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "lg",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const SBox = styled(Box)(({ theme }) => ({
  "& > *": { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const SPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  maxWidth: '800px',
  margin: 'auto',
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

export const SDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));