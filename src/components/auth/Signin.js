import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
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
  CFieldInput,
  CPasswordInput,
  CSubmitButton,
} from "../custom/CustomComponents";
import GoBack from "../custom/GoBack";
import { UserLogin, ResendConfirmation } from "../../services/AuthService";
import { useUser } from "../../contexts/UserContext";
import { loginFormModel as formModel } from "../formModel/formModel";
import { loginValidationSchema as validationSchema } from "../formModel/validationSchema";
import { loginInitialValues as initialValues } from "../formModel/initialValues";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Collapse, Skeleton } from "@mui/material";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function SignIn() {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendConfLink, setSendConfLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Iniciar sesión";
    sleep(1000).then(() => setIsLoading(false));
    if (user !== null) {
      navigate("/user/dashboard");
    }
  }, [user, navigate]);

  async function _handleSubmit(values, actions) {
    setSendConfLink(false);
    setShowAlert(false);

    try {
      setSuccess(false);
      actions.setSubmitting(true);

      const { loginEmail, loginPassword } = values;
      const loginRequest = {
        email: loginEmail,
        password: loginPassword,
      };
      const loginResponse = await UserLogin(loginRequest);

      actions.setSubmitting(false);
      setSuccess(true);
      login(loginResponse, rememberMe);

      sleep(2000).then(() => navigate("/user/dashboard"));
    } catch (error) {
      if (error.response.status === 409) {
        setSendConfLink(true);
        _handleShowAlert("Usuario no confirmado", "error");
      } else if (
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        _handleShowAlert("Credenciales incorrectas", "error");
      } else {
        _handleShowAlert("Ha ocurrido un error", "error");
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  async function _handleResendConfirmation(values) {
    try {
      const response = await ResendConfirmation(values.loginEmail);
      _handleShowAlert(response.data.message, "success");
      sleep(2000).then(() => setShowAlert(false));
    } catch (error) {
      _handleShowAlert("Ha ocurrido un error", "error");
    }
  }

  function _handleShowAlert(message, severity) {
    setSeverity(severity);
    setMessage(message);
    setShowAlert(true);
  }

  const sx = {
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <SContainer>
      {isLoading ? (
        <Skeleton variant="rectangular" width={60} height={25} />
      ) : (
        <GoBack display={"flex"} justifyContent={"left"} />
      )}
      <SBox>
        <SAvatar>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <LockOutlinedIcon />
          )}
        </SAvatar>
        <Typography component="h1" variant="h5">
          {isLoading ? <Skeleton width={210} /> : "Inicio de sesión"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Box>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CFieldInput
                    id={"loginEmail"}
                    field={formModel.formField.loginEmail}
                  />
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CPasswordInput
                    id={"loginPassword"}
                    field={formModel.formField.loginPassword}
                  />
                )}
                <Box my>
                  <Collapse in={showAlert}>
                    <Alert cursor="none" severity={severity}>
                      {message}
                    </Alert>
                    {sendConfLink && (
                      <Link
                        onClick={() => _handleResendConfirmation(values)}
                        sx={sx}
                      >
                        {"\n¿Reenviar enlace de confirmación?"}
                      </Link>
                    )}
                  </Collapse>
                </Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    {isLoading ? (
                      <Skeleton width={120} height={40} />
                    ) : (
                      <FormControlLabel
                        sx={sx}
                        control={
                          <Checkbox
                            value="remember"
                            color="secondary"
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                        }
                        label="Recuérdame"
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      {isLoading ? (
                        <Skeleton width={140} height={40} />
                      ) : (
                        <Link href="/auth/forgot-password" sx={sx}>
                          ¿Olvidó la contraseña?
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CSubmitButton
                    success={success}
                    buttonText={"Iniciar sesión"}
                    disablingFields={
                      !values[formModel.formField.loginEmail.name] ||
                      !values[formModel.formField.loginPassword.name]
                    }
                    isSubmitting={isSubmitting}
                  />
                )}
              </Box>
            </Form>
          )}
        </Formik>
        {isLoading ? (
          <Skeleton width={160} height={40} />
        ) : (
          <SBox>
            <Link href="/auth/register" sx={sx}>
              ¿No tienes una cuenta? Regístrate
            </Link>
            <Typography>O inicia sesión con:</Typography>
            <SignInIcons />
          </SBox>
        )}
      </SBox>
    </SContainer>
  );
}

function SignInIcons() {
  const buttonSx = {
    transition: "all 0.5s",
    ":hover": {
      color: useTheme().palette.secondary.main,
      backgroundColor: "transparent",
      transform: "scale(1.3)",
    },
  };

  return (
    <Box align="center">
      <Button sx={buttonSx}>
        <FacebookIcon />
      </Button>
      <Button sx={buttonSx}>
        <GoogleIcon />
      </Button>
      <Button sx={buttonSx}>
        <XIcon />
      </Button>
    </Box>
  );
}
