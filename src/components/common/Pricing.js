import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Footer from "./Footer";

const plans = [
  {
    title: "Gratis",
    price: "0€",
    description: "Plan básico gratuito para uso personal.",
    features: [
      "Acceso limitado a funciones",
      "Modulo de tareas y compras",
      "Un solo usuario",
    ],
    image: "https://picsum.photos/300/200?random=7",
  },
  {
    title: "Básica",
    price: "9.99€/mes",
    description: "Plan estándar para usuarios regulares.",
    features: [
      "Acceso a todas las funciones",
      "Todos los modulos y grupo familiar",
      "Hasta 5 usuarios",
    ],
    image: "https://picsum.photos/300/200?random=8",
  },
  {
    title: "Premium",
    price: "19.99€/mes",
    description: "Plan avanzado para usuarios exigentes.",
    features: [
      "Acceso completo a funciones avanzadas",
      "Funciones avanzadas",
      "Nuevas caracteristicas en desarrollo",
    ],
    image: "https://picsum.photos/300/200?random=9",
  },
];

export default function Pricing() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Planes y Tarifas
        </Typography>
        <Grid container spacing={4}>
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={plan.image}
                  alt={plan.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {plan.description}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Características:
                  </Typography>
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <Typography variant="body2" color="textSecondary">
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
