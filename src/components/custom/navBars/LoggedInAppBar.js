import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AvatarProfile from "../AvatarProfile";
import DarkModeSwitch from "../DarkModeSwitch";
import SecondaryAppBar from "./SecondaryAppBar";
import { useAppBar } from "../../../contexts/AppBarContext";
export default function LoggedInAppBar() {
  const { open, toggleDrawer } = useAppBar();
  return (
    <>
      <AppBar
        position="absolute"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={toggleDrawer}
            sx={{ display: { xl: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/user/dashboard"
            sx={{
              fontSize: 22,
              fontWeight: 750,
              letterSpacing: "-.05em",
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            MyHome.
          </Typography>
          <Box sx={{ flex: 1 }} />
          <AvatarProfile />
          <DarkModeSwitch />
        </Toolbar>
      </AppBar>
      <SecondaryAppBar />
    </>
  );
}
