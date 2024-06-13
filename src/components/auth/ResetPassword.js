import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { Formik, Form } from "formik";
import {
  SBox,
  SAvatar,
  SCenteredContainer,
} from "../../styles/StyledComponents";
import { Typography, Skeleton, Box, Collapse, Alert } from "@mui/material";
import { resetPasswordFormModel as formModel } from "../formModel/formModel";
import { resetInitialValues } from "../formModel/initialValues";
import { resetPasswordValidationSchema } from "../formModel/validationSchema";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CPasswordInput, CSubmitButton } from "../custom/CustomComponents";
import { ChangePassword } from "../../services/AuthService";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpen, setMessage, setSeverity } = useSnackBar();
  const [userEmail, setUserEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setAlertMessage] = useState("");
  const [severity, setAlertSeverity] = useState("error");
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const email = query.get("email");
    const token = query.get("token");

    sleep(1000).then(() => setIsLoading(false));

    if (email && token) {
      setUserEmail(decode(email));
      setJwt(decode(token));
    } else {
      setMessage("El token no es valido");
      setSeverity("error");
      handleOpen();
      navigate("/error/unauthorized");
    }
  }, [location, navigate, handleOpen, setMessage, setSeverity]);

  async function _handleSubmit(values, actions) {
    try {
      actions.setSubmitting(true);
      const { resetPassword } = values;
      const resetRequest = {
        email: userEmail,
        password: resetPassword,
      };
      console.log(resetRequest);
      ChangePassword(jwt, resetRequest);
      actions.setSubmitting(false);
      setSuccess(true);
      _handleShowAlert("Contraseña cambiada", "success");
      handleOpen();
      sleep(1000).then(() => navigate("/auth/login"));
    } catch (error) {
      _handleShowAlert("Ha ocurrido un error", "error");
    } finally {
      actions.setSubmitting(false);
    }
  }

  function _handleShowAlert(message, severity) {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setShowAlert(true);
  }

  function decode(data) {
    return atob(data);
  }

  return (
    <SCenteredContainer>
      <SBox sx={{ scale: "1.02" }}>
        <SAvatar>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <LockOutlinedIcon />
          )}
        </SAvatar>
        <Typography component="h1" variant="h5">
          {isLoading ? <Skeleton width={210} /> : "Cambio de contraseña"}
        </Typography>
        <Formik
          initialValues={resetInitialValues}
          onSubmit={_handleSubmit}
          validationSchema={resetPasswordValidationSchema}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Box>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CPasswordInput
                    id={"resetPassword"}
                    field={formModel.formField.resetPassword}
                  />
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <CPasswordInput
                    id={"resetPassword2"}
                    field={formModel.formField.resetPassword2}
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
                    buttonText={"Cambiar contraseña"}
                    disablingFields={
                      !values[formModel.formField.resetPassword.name] ||
                      !values[formModel.formField.resetPassword2.name]
                    }
                    isSubmitting={isSubmitting}
                  />
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </SBox>
    </SCenteredContainer>
  );
}
