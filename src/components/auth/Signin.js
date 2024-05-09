import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UserLogin from "../../services/AuthService";
import { useUser } from "../../contexts/UserContext";
import SignInIcons from "./SigninIcons";
import GoBack from "../common/GoBack";
import Footer from "../common/Footer";
import { useTheme } from "@mui/material/styles";

function SignIn() {
  const navigate = useNavigate();
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;

  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    var user = UserLogin(email, password, setShowError);
    if (user !== null) {
      setUser(user);
      navigate("/user/dashboard");
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <GoBack display={"flex"} justifyContent={"left"} />
        <Container sx={{ scale: "1.02" }}>
          <Box
            sx={{
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
              Inicio de sesión
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
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                sx={{
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
              />
              {showError && (
                <Alert severity="error">Usuario o contraseña incorrectos</Alert>
              )}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="secondary"
                        sx={{
                          ":hover": {
                            transition: "all 0.2s",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    }
                    label="Recuérdame"
                  />
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Link
                      href="/auth/forgot-password"
                      sx={{
                        ":hover": {
                          transition: "all 0.2s",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      ¿Olvidó la contraseña?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  mt: 3,
                  mb: 2,
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
                disabled={!email || !password}
              >
                Iniciar sesión
              </Button>
              <Box textAlign="center">
                <Link href="/auth/register">
                  ¿No tienes una cuenta? Regístrate
                </Link>
                <Typography my>O inicia sesión con:</Typography>
                <SignInIcons />
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>{" "}
      <Footer />
    </>
  );
}

export default SignIn;
