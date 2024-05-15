import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import UserLogin, { ResendConfirmation } from "../../services/AuthService";
import { useUser } from "../../contexts/UserContext";
import SignInIcons from "./SigninIcons";
import GoBack from "../common/GoBack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function SignIn() {
  const navigate = useNavigate();
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;

  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [sendConfLink, setSendConfLink] = React.useState(false);

  const handleSubmit = async () => {
    let user = await UserLogin(email, password, setMessage, setSendConfLink);
    if (user !== null) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/user/dashboard");
    } else {
      setShowError(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResendConfirmation = async () => {
    await ResendConfirmation(email, setMessage);
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
                  transform: "scale(1.02)",
                },
              }}
            />
            <FormControl
              fullWidth
              required
              autoFocus
              variant="outlined"
              sx={{
                ":hover": {
                  transition: "all 0.2s",
                  transform: "scale(1.02)",
                },
                mb: 2,
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="password1"
                label="Password"
                name="password1"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {showError && <Alert severity="error">{message}</Alert>}
            {sendConfLink && (
              <Link
                mt={2}
                onClick={handleResendConfirmation}
                sx={{
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Enviar enlace de confirmación
              </Link>
            )}
            <Grid container justifyContent="space-between" alignItems="center">
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
            <Container>
              <Link
                href="/auth/register"
                sx={{
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.05)",
                  },
                }}
              >
                ¿No tienes una cuenta? Regístrate
              </Link>
              <Typography my>O inicia sesión con:</Typography>
              <SignInIcons />
            </Container>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default SignIn;
