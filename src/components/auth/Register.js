import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GoBack from "../custom/GoBack";
import { NewUser } from "../../services/AuthService";
import { SAvatar, SBox, SContainer } from "../../styles/StyledComponents";
import {
  CEmailInput,
  CPasswordInput,
  CPasswordInputCheck,
  CSubmitButton,
} from "../custom/CustomComponents";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showMessage = (message, severity = "error") => {
    setMessage(message);
    setSeverity(severity);
    setLoading(false);
    setShowAlert(true);
  };

  const handleSubmit = async () => {
    setSuccess(false);
    setLoading(true);

    if (password !== password2) {
      showMessage("Las contraseñas no coinciden");
      return;
    }

    let response = await NewUser(email, password, setMessage);

    if (response) {
      showMessage("Usuario creado correctamente", "success");
      setSuccess(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } else {
      setShowAlert(true);
      setLoading(false);
    }
  };

  return (
    <SContainer>
      <GoBack display={"flex"} justifyContent={"left"} />
      <SBox>
        <SAvatar>
          <LockOpenIcon />
        </SAvatar>
        <Typography component="h1" variant="h5">
          Registro
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
          <CPasswordInputCheck
            password={password2}
            setPassword={setPassword2}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
          {showAlert && <Alert severity={severity}>{message}</Alert>}
          <CSubmitButton
            handleSubmit={handleSubmit}
            success={success}
            buttonText={"Registrarse"}
            loading={loading}
          />
          <Link href="/auth/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </Box>
      </SBox>
    </SContainer>
  );
}
