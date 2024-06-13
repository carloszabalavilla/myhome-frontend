import React from "react";
import Footer from "../Footer";
import { Container, Typography, Box } from "@mui/material";

function About() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, minHeight: "75vh" }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Acerca de
        </Typography>
        <Box>
          <Typography variant="body1" paragraph>
            MyHome surge en respuesta a la necesidad de una gestión eficiente
            del hogar. Con módulos especializados, la aplicación facilita el
            control de tareas domésticas, alimentación, compras y finanzas del
            hogar.
          </Typography>
          <Typography variant="body1" paragraph>
            Nuestro objetivo es hacer que la administración de tu hogar sea lo
            más sencilla y organizada posible, permitiéndote dedicar más tiempo
            a lo que realmente importa.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default About;
