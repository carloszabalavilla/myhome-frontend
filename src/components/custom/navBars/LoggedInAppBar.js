import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import { SAppBar } from "../../../styles/StyledComponents";
import AvatarProfile from "../AvatarProfile";
import DarkModeSwitch from "../DarkModeSwitch";
import SecondaryAppBar from "./SecondaryAppBar";
import TertiaryAppBar from "./TertiaryAppBar";
import { useAppBar } from "../../../contexts/AppBarContext";

export default function LoggedInAppBar() {
  const position = useAppBarPosition();
  const { open } = useAppBar();
  const color = useTheme().palette.secondary.main;

  return (
    <>
      <SAppBar position={position} open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            disabled={true}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
              display: { sm: "flex", xl: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Container sx={{ maxWidth: "lg", display: "flex" }}>
            <Button
              href="/user/dashboard"
              className="dashboard-button"
              color="inherit"
              sx={{
                ":hover": { color: color, backgroundColor: "transparent" },
                textTransform: "none",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                fontWeight={700}
                ml={22}
                letterSpacing=".4rem"
                color="inherit"
              >
                MyDashboard
              </Typography>
            </Button>
            <AvatarProfile />
            <IconButton color="inherit" sx={{ flexGrow: 0 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <DarkModeSwitch />
          </Container>
        </Toolbar>
      </SAppBar>
      <SecondaryAppBar />
      <TertiaryAppBar />
    </>
  );
}

function useAppBarPosition() {
  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    function handleResize() {
      setPosition(getPosition());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return position;
}

function getPosition() {
  const xl = "1536px";
  return window.matchMedia("(min-width: " + xl + ")").matches
    ? "static"
    : "absolute";
}
