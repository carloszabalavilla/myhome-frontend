import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Outpages = ["Modulos", "Tarifas", "Soporte"];

export default function LoggedOutAppBar() {
  const secColor = useTheme().palette.secondary.main;

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <DesktopBar secColor={secColor} />
          <MobileBar secColor={secColor} />
          <LoginButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function DesktopBar({ secColor }) {
  return (
    <>
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
    </>
  );
}

function MobileBar(props) {
  const { secColor } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
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
    </>
  );
}

function LoginButtons() {
  return (
    <>
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
    </>
  );
}
