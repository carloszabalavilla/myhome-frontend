import React from "react";
import { useUser } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Badge,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 240;
const Outpages = ["Modulos", "Tarifas", "Soporte"];
const Inpages = ["tareas", "finanzas", "nutricion"];

const settings = ["Perfil", "Cuenta", "Dashboard", "Salir"];

function Navbar() {
  const { user } = useUser();
  const location = useLocation();
  const isLoggedIn = user !== null;

  const isNoNavPage =
    location.pathname.startsWith("/auth/") ||
    location.pathname.startsWith("/error/") ||
    location.pathname.startsWith("/user/");

  return (
    <div>
      {isNoNavPage ? null : isLoggedIn ? (
        <LoggedInNavbar />
      ) : (
        <LoggedOutNavbar />
      )}
    </div>
  );
}

function LoggedInNavbar() {}

function LoggedOutNavbar() {
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {/* Appbar desktop */}
          <Button
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              ":hover": { color: secColor },
              textTransform: "none",
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyHome
            </Typography>
          </Button>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {Outpages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`/${page.toLowerCase()}`}
                  sx={{
                    mx: 1,
                    color: "black",
                    ":hover": { color: secColor, fontWeight: 700 },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Stack>
          </Box>
          {/* Appbar mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ ":hover": { color: "white" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Outpages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`/${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black",
              ":hover": { color: secColor },
              textTransform: "none",
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyHome
            </Typography>
          </Button>
          {/* Botones de inicio de sesion */}
          <IconButton
            size="large"
            aria-label="login"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{
              display: { xs: "flex", sm: "none" },
              whiteSpace: "normal",
              ":hover": { color: "white" },
              ml: 3,
            }}
            href="/auth/login"
          >
            <PersonOutlinedIcon></PersonOutlinedIcon>
          </IconButton>

          <Button
            variant="contained"
            href="/auth/login"
            color="secondary"
            sx={{ display: { xs: "none", sm: "flex", ml: 3 } }}
          >
            Iniciar sesion
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
