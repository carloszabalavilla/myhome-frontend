import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeSwitch from "../theme/DarkModeSwitch";
import SecondaryAppBar from "./SecondaryAppBar";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";

const settings = ["Perfil", "Cuenta", "Configuracion", "Salir"];

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
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

export default function MyAppBar({ open }) {
  const position = useAppBarPosition();

  const color = useTheme().palette.secondary.main;

  return (
    <>
      <AppBar position={position} open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            disabled="true"
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
      </AppBar>
      <SecondaryAppBar />
    </>
  );
}

function AvatarProfile() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = localStorage.getItem("user");
  const username = JSON.parse(user).name;
  const firstLetter = username.charAt(0);
  const secColor = useTheme().palette.secondary.main;
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleItemClick = (action) => {
    // Aquí puedes definir la lógica para cada acción
    switch (action) {
      case 'Cuenta':
        console.log('Ir a la cuenta');
        navigate('/user/account');
        break;
      case 'Perfil':
        console.log('Ir al perfil');
        navigate('/user/settings');
        break;
      case 'Configuracion':
        console.log('Ir a la configuración');
        navigate('/user/settings');
        break;
      case 'Salir':
        handleLogout();
        console.log('Usuario desconectado');
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  function handleLogout (){
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }} mx>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: secColor}}>{firstLetter}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem disabled>
          <Typography textAlign="center">{username}</Typography>
        </MenuItem>
        <Divider />
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleItemClick(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
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
