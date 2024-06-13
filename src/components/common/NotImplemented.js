import React from "react";
import { SBox, SCenteredContainer } from "../../styles/StyledComponents";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotImplemented() {
  const navigate = useNavigate();
  return (
      <SCenteredContainer>
        <SBox>
          <Typography variant="h1">No disponible todavia</Typography>
          <Typography variant="h4">
            Esta pagina estara disponible muy pronto
          </Typography>
          <Button variant="primary" onClick={() => navigate("/")}>Volver</Button>
        </SBox>
      </SCenteredContainer>
  );
}
