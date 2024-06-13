import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";

const backgroundImage =
  'url("https://unsplash.com/es/fotos/minimalist-photography-of-open-door-5i0GnoTTjSE")';

export default function Home() {
  const primColor = useTheme().palette.primary.main;
  return (
    <>
      <Box
        sx={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Gestión eficiente del hogar con{" "}
            <span style={{ color: { primColor } }}>MyHome</span>
          </Typography>
          <Typography variant="h5" paragraph>
            Simplifica y organiza la administración de tu hogar con módulos
            especializados en tareas domésticas, alimentación, compras y
            finanzas.
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mr: 2 }}
              onClick={() => {
                window.location.href = "/auth/login";
              }}
            >
              Comienza ahora
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => {
                window.location.href = "/modulos";
              }}
            >
              Descubre más
            </Button>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Características Principales
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <HomeWorkIcon fontSize="large" color="primary" />
                <Typography variant="h6" component="h3" gutterBottom>
                  Gestión de Tareas Domésticas
                </Typography>
                <Typography color="textSecondary">
                  Organiza y controla todas las tareas del hogar de manera
                  eficiente.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <KitchenIcon fontSize="large" color="primary" />
                <Typography variant="h6" component="h3" gutterBottom>
                  Alimentación Familiar
                </Typography>
                <Typography color="textSecondary">
                  Planifica las comidas de tu familia y lleva un registro de las
                  recetas favoritas.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <ShoppingCartIcon fontSize="large" color="primary" />
                <Typography variant="h6" component="h3" gutterBottom>
                  Compras
                </Typography>
                <Typography color="textSecondary">
                  Gestiona las compras del hogar de manera sencilla y
                  organizada.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <AccountBalanceWalletIcon fontSize="large" color="primary" />
                <Typography variant="h6" component="h3" gutterBottom>
                  Finanzas del Hogar
                </Typography>
                <Typography color="textSecondary">
                  Controla y administra las finanzas de tu hogar con facilidad.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
