import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SCenteredContainer } from "../../styles/StyledComponents";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackBar } from "../../contexts/SnackBarContext";

export default function ConfirmEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpen, setMessage, setSeverity } = useSnackBar();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      const jwt = decodeJwt(token);
      async function confirmEmail() {
        try {
          const response = await axios.put(
            `http://localhost:8081/api/auth/confirm`,
            { token: jwt }
          );
          setMessage(response.data.message);
          setSeverity("success");
          handleOpen();
          navigate("/auth/login");
        } catch (error) {
          if (error.response.status === 409) {
            setMessage("El usuario ya ha sido confirmado");
            setSeverity("error");
            handleOpen();
            navigate("/error/unauthorized");
          }
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

  return (
    <SCenteredContainer>
      <Box textAlign={"center"}>
        <Typography variant="h3" gutterBottom>
          Confirmación de correo
        </Typography>
        <Typography variant="body1" gutterBottom>
          Estamos confirmando tu correo electrónico...
        </Typography>
        <CircularProgress />
      </Box>
    </SCenteredContainer>
  );
}
