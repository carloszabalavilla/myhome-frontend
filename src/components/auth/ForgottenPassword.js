import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import { RecoveryPassword } from "../../services/AuthService";
import GoBack from "../custom/GoBack";



function ForgottenPassword() {
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;

  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage(await RecoveryPassword(email, setMessage));
    if (message === null) {
      setSeverity("error");
    }
    setShowAlert(true);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <GoBack display={"flex"} justifyContent={"left"} />
      <Container sx={{ scale: "1.02" }}>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: primColor,
              ":hover": { bgcolor: secColor, transition: "all 0.2s" },
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperacion de contraseña
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              sx={{
                m: 1,
                ":hover": {
                  transition: "all 0.2s",
                  transform: "scale(1.02)",
                },
              }}
            />
            {showAlert && <Alert severity={severity} sx={{m: 1}}>{message}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                m: 1,
                ":hover": {
                  transition: "all 0.2s",
                  transform: "scale(1.02)",
                },
              }}
              disabled={!email}
            >
              Enviar correo de recuperacion
            </Button>
            <Container>
              <Link
                href="/auth/login"
                sx={{
                  m: 1,
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
              >
                ¿O tal vez quieras volver a intentarlo? Inicia sesión
              </Link>
            </Container>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default ForgottenPassword;
