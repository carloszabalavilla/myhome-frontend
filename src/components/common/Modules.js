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

const modules = [
  {
    title: "Gestión de Tareas",
    description:
      "Organiza y controla todas las tareas del hogar de manera eficiente.",
    image: "https://picsum.photos/300/200?random=1",
    features: [
      "Lista de tareas",
      "Asignación de tareas",
      "Notificaciones y recordatorios",
    ],
  },
  {
    title: "Compras",
    description:
      "Gestiona las compras del hogar de manera sencilla y organizada.",
    image: "https://picsum.photos/300/200?random=3",
    features: [
      "Lista de compras",
      "Historial de compras",
      "Ofertas y descuentos",
    ],
  },
  {
    title: "Finanzas del Hogar",
    description:
      "Controla y administra las finanzas de tu hogar con facilidad.",
    image: "https://picsum.photos/300/200?random=4",
    features: [
      "Presupuesto familiar",
      "Gastos e ingresos",
      "Informes financieros",
    ],
  },
  {
    title: "Alimentación Personal",
    description:
      "Planifica las comidas de tu familia y lleva un registro de las recetas favoritas.",
    image: "https://picsum.photos/300/200?random=2",
    features: ["Planificador de comidas", "Recetario", "Lista de compras"],
  },
  {
    title: "Grupo Familiar",
    description:
      "Administra la información y actividades de tu familia en un solo lugar.",
    image: "https://picsum.photos/300/200?random=5",
    features: [
      "Asignar tareas a otros",
      "Ver las tareas de la familia",
      "Organizar la casa en conjunto",
    ],
  },
  {
    title: "Supermercados y Tiendas",
    description:
      "Encuentra los productos que necesitas en los supermercados y tiendas cercanas.",
    image: "https://picsum.photos/300/200?random=6",
    features: [
      "Compara los mejores precios",
      "Haz una ruta de supermercados",
      "Encuentra ofertas y descuentos",
    ],
  },
];

export default function Modules() {
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
          Módulos de myHome
        </Typography>
        <Grid container spacing={4}>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={module.image}
                  alt={module.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {module.description}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Características:
                  </Typography>
                  <ul>
                    {module.features.map((feature, index) => (
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
