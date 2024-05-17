import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Typography,
  Box,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Footer from "./Footer";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/user/dashboard");
    }
  });
  return (
    <Container>
      <Grid container spacing={6} mt={8}>
        <Grid item xs={12} xl={6}>
          <Slogan />
        </Grid>

        <Grid item xs={12} xl={6}>
          <Info />
        </Grid>

        <Grid item xs={12} align="center">
          <Divider orientation="horizontal" flexItem sx={{ my: 5 }} />
          <Panels />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Home;

function Slogan() {
  return (
    <Card>
      <CardContent
        align="center"
        p={5}
        sx={{
          borderRadius: 1,
          backgroundImage: "url('https://source.unsplash.com/1600x900/?home')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          display={"inline-block"}
          p={5}
          m={1}
          borderRadius={5}
          bgcolor={"#eeeeee"}
        >
          <Typography variant="h1" fontFamily={"Lato"}>
            Simple. Facil.
          </Typography>
          <Typography
            variant="h5"
            fontFamily={"Lato"}
            sx={{ color: "#494949", fontWeight: 600 }}
          >
            Gestion del hogar, tu espacio y tu lugar.
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"Lato"}
            sx={{ color: "#494949", fontWeight: 200 }}
          >
            Controla tus gastos, tus tareas y tus compras.
          </Typography>
          <Button variant="contained" color="primary" sx={{ my: 3 }}>
            Comenzar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function Info() {
  return (
    <Grid orientation="horizontal" spacing={5}>
      <Grid item xs={12} xl={6}>
        <Stack spacing={1} alignItems={"center"}>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} xl={6}>
        <Stack spacing={1} alignItems={"center"}>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
          <Typography>
            <FamilyRestroomIcon /> Para toda la familia
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

function Panels() {
  return (
    <Stack spacing={1}>
      <Box
        align="center"
        py={5}
        sx={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?tasks')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Box bgcolor={"rgba(50, 50, 50, 0.4)"} px={4}>
          <Typography variant="h2" sx={{ opacity: "100%" }}>
            Organiza tus tareas
          </Typography>
          <Typography variant="h5">
            Crea listas de tareas y organiza tu tiempo de forma optioma.
          </Typography>
        </Box>
      </Box>

      <Box
        align="center"
        py={5}
        sx={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?money')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Box bgcolor={"rgba(50, 50, 50, 0.4)"} px={4}>
          <Typography variant="h2">Protege tu economia</Typography>
          <Typography variant="h5">
            Lleva un control de tus gastos y tus ingresos.
          </Typography>
        </Box>
      </Box>

      <Box
        align="center"
        py={5}
        sx={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?food')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Box bgcolor={"rgba(50, 50, 50, 0.4)"} px={4}>
          <Typography variant="h2">Controla tu alimentacion</Typography>
          <Typography variant="h5">
            Añade y crea platos. Controla tus calorias y tus macros.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
