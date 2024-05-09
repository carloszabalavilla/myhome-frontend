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

function LoggedInNavbar() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar open={open}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          {/* Appbar desktop */}
          <Button
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              ":hover": { color: "#ffcc80" },
              textTransform: "none",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              MyDashboard
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
              {Inpages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`/${page.toLowerCase()}`}
                  sx={{
                    mx: 1,
                    color: "black",
                    ":hover": { color: "#ffcc80", fontWeight: 700 },
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
              ":hover": { color: "#ffcc80" },
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
          {/* Boton perfil */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Boton notis */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

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
            href="/login"
          >
            <PersonOutlinedIcon></PersonOutlinedIcon>
          </IconButton>

          <Button
            variant="contained"
            href="/login"
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
