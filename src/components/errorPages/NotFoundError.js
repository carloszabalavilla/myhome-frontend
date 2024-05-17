// ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography, Button, Box } from "@mui/material";
import "./ErrorPage.css";
import errorImage from "../../images/embarrassed.svg"; // Asegúrate de tener la imagen en la ruta correcta

export default function NotFound() {
  return (
    <Container sx={{ mt: 3,          
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Box
        component="img"
        src={errorImage}
        alt="Error"
        sx={{ maxWidth: "100%", height: "auto", marginBottom: 2 }}
      />
      <Typography m variant="h4"  sx={{fontWeight:700 }} >
        ¡Vaya! Algo va mal
      </Typography>
      <Typography m variant="h8" >
        La página que quisiste ver no está ahí.
      </Typography>
      <Button m variant="contained" color="primary" component={Link} to="/">
        Volver a la página principal
      </Button>
    </Container>
  );
}
