import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { StartRecovery } from "../../services/AuthService";
import GoBack from "../custom/GoBack";
import { SAvatar, SBox, SContainer } from "../../styles/StyledComponents";
import { CFieldInput, CSubmitButton } from "../custom/CustomComponents";
import { Collapse, Skeleton } from "@mui/material";
import { Form, Formik } from "formik";
import { loginFormModel as formModel } from "../formModel/formModel";
import { loginInitialValues as initialValues } from "../formModel/initialValues";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ForgottenPassword() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Recuperacion";
    sleep(1000).then(() => setIsLoading(false));
  }, []);

  async function _handleSubmit(values, actions) {
    setShowAlert(false);
    try {
      actions.setSubmitting(true);
      const { loginEmail } = values;
      const message = await StartRecovery(loginEmail);
      actions.setSubmitting(false);
      setSuccess(true);
      _handleShowAlert(message, "success");
    } catch (error) {
      _handleShowAlert("Ha ocurrido un error", "error");
      actions.setSubmitting(false);
    }
  }

  function _handleShowAlert(message, severity) {
    setSeverity(severity);
    setMessage(message);
    setShowAlert(true);
  }

  return (
    <SContainer>
      {isLoading ? (
        <Skeleton variant="rectangular" width={60} height={25} />
      ) : (
        <GoBack display={"flex"} justifyContent={"left"} />
      )}
      <SBox sx={{ scale: "1.02" }}>
        <SAvatar>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <LockOutlinedIcon />
          )}
        </SAvatar>
        <Typography component="h1" variant="h5">
          {isLoading ? <Skeleton width={210} /> : "Recuperación de contraseña"}
        </Typography>
        <Formik
          initialValues={initialValues}
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
                <Box my>
                  <Collapse in={showAlert}>
                    <Alert cursor="none" severity={severity}>
                      {message}
                    </Alert>
                  </Collapse>
                </Box>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CSubmitButton
                    success={success}
                    buttonText={"Enviar correo de recuperación"}
                    disablingFields={
                      !values[formModel.formField.loginEmail.name]
                    }
                    isSubmitting={isSubmitting}
                  />
                )}
                {isLoading ? (
                  <Skeleton width={140} height={40} />
                ) : (
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
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </SBox>
    </SContainer>
  );
}
