import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SCenteredContainer } from "../../styles/StyledComponents";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { LetRecoveryPassword } from "../../services/AuthService";

export default function LetPasswordChange() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpen, setMessage, setSeverity } = useSnackBar();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      const jwt = decodeJwt(token);
      async function confirmEmail() {
        console.log("Token decodificado: ", jwt);
        try {
          const response = await LetRecoveryPassword(jwt);
          console.log("Datos de respuesta del servidor: ", response.data);
          const email = encodeEmail(response.data.email);
          navigate("/auth/reset-password?email=" + email + "&token=" + token);
        } catch (error) {
          console.log("Error: ", error);
          setMessage("El token no es valido");
          setSeverity("error");
          handleOpen();
          navigate("/error/unauthorized");
        }
      }
      confirmEmail();
    } else {
      navigate("/error/unauthorized");
    }
  }, [location, navigate, handleOpen, setMessage, setSeverity]);

  function decodeJwt(encodedJwt) {
    return atob(encodedJwt);
  }

  function encodeEmail(email) {
    return btoa(email);
  }

  return (
    <SCenteredContainer>
      <Box textAlign={"center"}>
        <Typography variant="h3" gutterBottom>
          Cambio de contraseña
        </Typography>
        <Typography variant="body1" gutterBottom>
          Se esta comprobando el cambio...
        </Typography>
        <CircularProgress />
      </Box>
    </SCenteredContainer>
  );
}
