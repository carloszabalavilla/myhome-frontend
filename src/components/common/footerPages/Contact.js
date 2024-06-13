import React from "react";
import Footer from "../Footer";
import { Container, Typography, Box } from "@mui/material";

function Contact() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, minHeight:"75vh" }} >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Contacto
        </Typography>
        <Box>
          <Typography variant="body1" paragraph>
            Para cualquier consulta, por favor contáctanos en:
          </Typography>
          <Typography variant="body1" paragraph>
            Correo electrónico: myhomeappsupp@gmail.com
          </Typography>
          <Typography variant="body1" paragraph>
            Teléfono: +1 234 567 890
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Contact;
