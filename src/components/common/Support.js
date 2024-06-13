import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Collapse,
  Alert,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useFormik } from "formik";
import Footer from "./Footer";

const categories = [
  { value: "Pagos y Tarifas", label: "Pagos y Tarifas" },
  { value: "Funciones de la aplicacion", label: "Funciones de la aplicación" },
  { value: "Feedback", label: "Feedback" },
];

export default function Support() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const formik = useFormik({
    initialValues: {
      category: "",
      email: "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setShowAlert(true);
      setSeverity("success");
      setMessage("Su mensaje ha sido enviado correctamente. Gracias por su tiempo.");
    },
  });
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
          Descarga nuestras aplicaciones móviles
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6} align="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AppleIcon />}
              sx={{ width: "80%", height: "80px", fontSize: "1.2rem" }}
            >
              Descargar para iOS
            </Button>
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AndroidIcon />}
              sx={{ width: "80%", height: "80px", fontSize: "1.2rem" }}
            >
              Descargar para Android
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Sugerencias
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              label="Categoría"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              fullWidth
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Correo Electrónico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              label="Mensaje"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <Collapse in={showAlert}>
              <Alert cursor="none" severity={severity}>
                {message}
              </Alert>
            </Collapse>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </form>
      </Container>
      <Footer />
    </>
  );
}
