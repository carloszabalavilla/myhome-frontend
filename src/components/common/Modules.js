import React from "react";
import { Container, Typography, Paper, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Modules() {
  return (
    <Container maxWidth="md" sx={{ py: 7 }}>
      <Typography variant="overline" color="text.secondary">
        MYHOME / ESTA VERSIÓN
      </Typography>
      <Typography component="h1" variant="h4" sx={{ my: 2 }}>
        Lo que puedes hacer.
      </Typography>
      <Stack spacing={3} sx={{ my: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h2" variant="h6">
            Organizar tareas
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Crear, consultar, editar y eliminar tareas con fecha y horario en el
            calendario.
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h2" variant="h6">
            Crear tu grupo familiar
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Guardar el nombre y la descripción de tu grupo y volver a
            consultarlos.
          </Typography>
        </Paper>
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Finanzas, nutrición, perfil e invitaciones todavía no están
        implementados. Esta demo no ofrece planes de pago.
      </Typography>
      <Button component={Link} to="/auth/login" variant="contained">
        Entrar en MyHome
      </Button>
    </Container>
  );
}
