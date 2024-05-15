import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../services/AuthService";
import GetUserByToken from "../../services/UserService";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useTheme } from "@mui/material/styles";

function ResetPassword() {
  console.log("Pagina del login iniciando.");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const primColor = useTheme().palette.primary.main;
  const secColor = useTheme().palette.secondary.main;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    console.log("Token: ", token);
    const fetchData = async () => {
      const user = await GetUserByToken(token);
      if (user === null) {
        alert("El token no es válido.");
      }
      setEmail(user.email);
    };
    fetchData();
  }, [token]);

  const handleSubmit = async () => {
    setMessage(await ChangePassword(email, password, password2, setMessage));
    if (message === null) {
      setSeverity("error");
    }
    setShowAlert(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
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
          <Typography m component="h1" variant="h5">
            Restablecer la contraseña
          </Typography>
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
          {showAlert && (
            <Alert severity={severity} sx={{ m: 1 }}>
              {message}
            </Alert>
          )}
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
            disabled={!password || !password2}
          >
            Restablecer contraseña
          </Button>
        </Box>
      </Container>{" "}
    </Container>
  );
}

export default ResetPassword;
