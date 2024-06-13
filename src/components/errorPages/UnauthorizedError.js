import React from "react";
import { SCenteredContainer } from "../../styles/StyledComponents";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";

export default function UnauthorizedError() {
  return (
    <SCenteredContainer>
      <Box textAlign={"center"}>
        <Typography variant="h3" gutterBottom>
          No tienes permisos para acceder a esta página
        </Typography>
        <Typography variant="body1" gutterBottom>
          Por favor, inicia sesión con una cuenta autorizada
        </Typography>
        <Typography variant="body1" gutterBottom>
          Si crees que esto es un error, contacta a soporte
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Volver al inicio
        </Button>
      </Box>
    </SCenteredContainer>
  );
}
