import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { useUser } from "../../contexts/UserContext";

const options = ["Perfil", "Cuenta", "Configuracion", "Salir"];

export default function AvatarProfile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const firstLetter = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
  const username = user.firstName.charAt(0).toUpperCase() + firstLetter.slice(1);
  const secColor = useTheme().palette.secondary.main;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleItemClick = (action) => {
    switch (action) {
      case "Cuenta":
        console.log("Ir a la cuenta");
        navigate("/user/account");
        break;
      case "Perfil":
        console.log("Ir al perfil");
        navigate("/user/profile");
        break;
      case "Configuracion":
        console.log("Ir a la configuración");
        navigate("/user/settings");
        break;
      case "Salir":
        logout();
        console.log("Usuario desconectado");
        navigate("/auth/login");
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }} mx>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: secColor }}>{firstLetter}</Avatar>
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
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleItemClick(option)}>
            <Typography textAlign="center">{option}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
