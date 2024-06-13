import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SCenteredContainer } from "../../../styles/StyledComponents";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    sleep(5000).then(() => {
      navigate("/auth/login");
    });
  }, [navigate]);

  function handleBackToHome() {
    navigate("/auth/login");
  }

  return (
    <SCenteredContainer>
      <Box textAlign={"center"}>
        <Typography variant="h3" gutterBottom>
          Registro exitoso
        </Typography>
        <Typography variant="body1" gutterBottom>
          Se ha enviado un correo para que confirmes el registro.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          sx={{ mt: 1 }}
        >
          Iniciar sesion
        </Button>
      </Box>
    </SCenteredContainer>
  );
}
