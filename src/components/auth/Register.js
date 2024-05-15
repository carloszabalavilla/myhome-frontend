import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useTheme } from "@mui/material/styles";
import GoBack from "../common/GoBack";
import { NewUser } from "../../services/AuthService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useUser } from "../../contexts/UserContext";
import { Alert, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";

function Register() {
  console.log("Pagina del registro iniciando.");
  const navigate = useNavigate();
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;
  const { user, setUser } = useUser("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const handleSubmit = async () => {
    if (password !== password2) {
      setMessage("Las contraseñas no coinciden");
      setShowError(true);
      return;
    }
    setSuccess(false);
    setLoading(true);
    setUser(await NewUser(email, password));

    if (user === "registerError") {
      setMessage("Error en el registro, pruebe de nuevo mas tarde");
      setShowError(true);
      setLoading(false);
    } else if (user === null) {
      setMessage("Email ya registrado");
      setShowError(true);
      setLoading(false);
    } else {
      console.log("Usuario registrado: ", user);
      setMessage("Usuario registrado exitosamente");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const buttonSx = {
    mt: 2,
    mb: 3,
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
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
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
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
                mb: 2,
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
            <FormControl
              fullWidth
              required
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
                Repita la contraseña
              </InputLabel>
              <OutlinedInput
                id="password2"
                name="password2"
                type={showPassword ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                autoFocus
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
                label="Password"
              />
            </FormControl>
            {showError && <Alert severity="error">{message}</Alert>}
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={buttonSx}
                disabled={!email || !password || !password2 || loading}
              >
                {success ? <CheckIcon /> : "Registrarse"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>

            <Box textAlign="center">
              <Link
                href="/auth/login"
                sx={{
                  ":hover": {
                    transition: "all 0.2s",
                    transform: "scale(1.02)",
                  },
                }}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default Register;
