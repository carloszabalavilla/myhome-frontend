import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  CFieldInput,
  CPasswordInput,
  CSubmitButton,
} from "../custom/CustomComponents";
import { UserLogin, ResendConfirmation } from "../../services/AuthService";
import { useUser } from "../../contexts/UserContext";
import { loginFormModel as formModel } from "../formModel/formModel";
import { loginValidationSchema as validationSchema } from "../formModel/validationSchema";
import { loginInitialValues as initialValues } from "../formModel/initialValues";
export default function SignIn() {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    document.title = "Entrar · MyHome";
    if (user) navigate("/user/dashboard", { replace: true });
  }, [user, navigate]);
  async function submit(values, actions) {
    setMessage("");
    setConfirm(false);
    try {
      const response = await UserLogin({
        email: values.loginEmail,
        password: values.loginPassword,
      });
      login(response, remember);
    } catch (error) {
      setSeverity("error");
      setConfirm(error.response?.status === 409);
      setMessage(
        error.response?.status === 409
          ? "Confirma tu correo para entrar."
          : [401, 404].includes(error.response?.status)
            ? "Revisa el correo y la contraseña."
            : "No se ha podido conectar. Comprueba que la aplicación esté iniciada.",
      );
    } finally {
      actions.setSubmitting(false);
    }
  }
  async function resend(email) {
    try {
      await ResendConfirmation(email);
      setSeverity("success");
      setMessage(
        "Enlace preparado. Revisa tu correo o los mensajes locales de la demo.",
      );
    } catch {
      setSeverity("error");
      setMessage("No se pudo preparar el enlace. Inténtalo de nuevo.");
    }
  }
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Link
        component={RouterLink}
        to="/"
        underline="none"
        sx={{ fontWeight: 700, display: "inline-block", mb: 4 }}
      >
        ← MyHome
      </Link>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Typography variant="overline" color="text.secondary">
          VUELVE A LO IMPORTANTE
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mt: 1, mb: 2 }}>
          Bienvenido a casa.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Entra para organizar tus tareas y tu grupo familiar.
        </Typography>
        {process.env.REACT_APP_DEMO === "true" && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Acceso ficticio: demo@example.invalid · DemoOnly123!
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <CFieldInput
                id="loginEmail"
                field={formModel.formField.loginEmail}
              />
              <CPasswordInput
                id="loginPassword"
                field={formModel.formField.loginPassword}
              />
              {message && (
                <Alert severity={severity} sx={{ my: 2 }}>
                  {message}
                  {confirm && (
                    <Link
                      component="button"
                      type="button"
                      onClick={() => resend(values.loginEmail)}
                      sx={{ display: "block", mt: 1 }}
                    >
                      Reenviar confirmación
                    </Link>
                  )}
                </Alert>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  my: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                  }
                  label="Recuérdame"
                />
                <Link
                  component={RouterLink}
                  to="/auth/forgot-password"
                  variant="body2"
                >
                  Recuperar contraseña
                </Link>
              </Box>
              <CSubmitButton
                success={false}
                buttonText="Entrar"
                disablingFields={!values.loginEmail || !values.loginPassword}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center" }}
        >
          ¿Primera vez por aquí?{" "}
          <Link component={RouterLink} to="/auth/register">
            Crea tu cuenta
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
