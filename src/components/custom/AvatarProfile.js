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

const settings = ["Perfil", "Cuenta", "Configuracion", "Salir"];

export default function AvatarProfile() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const user = useUser().user;
  console.log("Usuario: ", user);
  const username = user.name;
  const firstLetter = username.charAt(0);

  const secColor = useTheme().palette.secondary.main;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleItemClick = (action) => {
    // Aquí puedes definir la lógica para cada acción
    switch (action) {
      case "Cuenta":
        console.log("Ir a la cuenta");
        navigate("/user/account");
        break;
      case "Perfil":
        console.log("Ir al perfil");
        navigate("/user/settings");
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleItemClick(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
