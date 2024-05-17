import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SAvatar, SBox, SContainer } from "../../styles/StyledComponents";
import {
  CEmailInput,
  CPasswordInput,
  CSubmitButton,
} from "../custom/CustomComponents";
import SignInIcons from "./SigninIcons";
import GoBack from "../custom/GoBack";
import { UserLogin, ResendConfirmation } from "../../services/AuthService";
import { UserContext } from "../../contexts/UserContext";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [sendConfLink, setSendConfLink] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/user/dashboard");
    }
  });

  const handleSubmit = async () => {
    setSuccess(false);
    setLoading(true);
    try {
      const user = await UserLogin(email, password);
      console.log("Usuario: ", user);
      login(user);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
      console.log(localStorage.getItem("user"));
    } catch (error) {
      if (error.response.status === 403) {
        setSendConfLink(true);
      }
      handleShowAlert(error.response.data.message);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const response = await ResendConfirmation(email, setMessage);
      handleShowAlert(response.data.message, "success");
    } catch (error) {
      handleShowAlert(error.response.data.message);
    }
  };

  const handleShowAlert = (message, severity = "error") => {
    setSeverity(severity);
    setMessage(message);
    setLoading(false);
    setShowAlert(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sx = {
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <SContainer>
      <GoBack display={"flex"} justifyContent={"left"} />
      <SBox>
        <SAvatar>
          <LockOutlinedIcon />
        </SAvatar>
        <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography>
        <Box>
          <CEmailInput email={email} setEmail={setEmail} />
          <CPasswordInput
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
          <Box
            my
            //sx={{
            //  transition: "all 0.4s",
            //  transform: "rotateY(180deg)",
            //}}
          >
            {showAlert && (
              <Alert cursor="none" severity={severity}>
                {message}{" "}
                {sendConfLink && (
                  <Link onClick={handleResendConfirmation} sx={sx}>
                    Reenviar enlace de confirmación?
                  </Link>
                )}
              </Alert>
            )}
          </Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                sx={sx}
                control={<Checkbox value="remember" color="secondary" />}
                label="Recuérdame"
              />
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Link href="/auth/forgot-password" sx={sx}>
                  ¿Olvidó la contraseña?
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <CSubmitButton
            handleSubmit={handleSubmit}
            success={success}
            buttonText={"Iniciar sesion"}
            loading={loading}
          />
        </Box>
        <SBox>
          <Link href="/auth/register" sx={sx}>
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Typography>O inicia sesión con:</Typography>
          <SignInIcons />
        </SBox>
      </SBox>
    </SContainer>
  );
}

export default SignIn;
