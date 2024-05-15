import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Asumiendo que estás usando React Router
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
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

export default function MyDrawer({ open, toggleDrawer }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1530 && open) {
        toggleDrawer();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, toggleDrawer]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={toggleDrawer}
      onMouseLeave={toggleDrawer}
      sx={{ display: { sm: "flex", xl: "none" } }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ cursor: "default" }}
        >
          Menu
        </Typography>
        <IconButton disabled="true">
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <MyList />
    </Drawer>
  );
}

function MyList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSecondary, setShowSecondary] = React.useState(false);

  return (
    <List component="nav">
      {mainListItems.map((item) => (
        <ListItem
          key={item.text}
          disableGutters
          sx={{
            ...(location.pathname === item.href && {
              backgroundColor: "secondary.main",
            }),
          }}
        >
          <ListItemButton
            sx={{
              ...(location.pathname === item.href && {
                cursor: "default",
                "&:hover": { backgroundColor: "transparent" },
              }),
              ...(location.pathname !== item.href && {
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                  fontWeight: "bold",
                },
              }),
            }}
            className={location.pathname === item.href ? "disabled-link" : ""}
            onClick={() => {
              if (location.pathname !== item.href) {
                navigate(item.href);
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider sx={{ my: 1 }} />
    </List>
  );
}
