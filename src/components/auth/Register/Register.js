import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerFormModel as formModel } from "../../formModel/formModel";
import { registerValidationSchema as validationSchema } from "../../formModel/validationSchema";
import { registerInitialValues as initialValues } from "../../formModel/initialValues";
import RegisterStepper from "./Stepper/RegisterStepper";
import FirstStep from "./Stepper/FirstStep";
import SecondStep from "./Stepper/SecondStep";
import ThirdStep from "./Stepper/ThirdStep";
import { NewUser } from "../../../services/AuthService";
import { SBox, SContainer } from "../../../styles/StyledComponents";
import { CheckEmail } from "../../../services/UserService";
import GoBack from "../../custom/GoBack";

const steps = [
  "Crea tu cuenta",
  "Añade tu información personal",
  "Para terminar",
];

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function _submitForm(values, actions) {
    try {
      const {
        userEmail,
        userPassword,
        firstName,
        lastName,
        address,
        birthDate,
        phoneNumber,
        activeNewsletter,
      } = values;

      const userData = {
        email: userEmail,
        password: userPassword,
        firstName,
        lastName,
        address,
        birthDate,
        phoneNumber,
        newsletter: activeNewsletter,
      };
      await NewUser(userData);
      await sleep(1000);
      actions.setSubmitting(false);
      navigate("/auth/success");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      actions.setSubmitting(false);
    }
  }

  async function _isEmailRegistered(values, actions) {
    if (!(await CheckEmail(values.userEmail))) {
      setSlideDirection("left");
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      actions.setFieldError("email", "El correo electrónico está registrado");
      actions.setSubmitting(false);
    }
  }

  function _handleSubmit(values, actions) {
    console.log("values: ", values);
    if (isLastStep) {
      _submitForm(values, actions);
    } else if (activeStep === 0) {
      _isEmailRegistered(values, actions);
    } else {
      setSlideDirection("left");
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setSlideDirection("right");
    setActiveStep(activeStep - 1);
  }

  useEffect(() => {
    document.title = "Registro";
  }, []);

  return (
    <SContainer>
      <GoBack display={"flex"} justifyContent={"left"} />
      <Formik
        initialValues={initialValues}
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <SBox py={3}>
              <RegisterStepper steps={steps} activeStep={activeStep} />
              {_renderStepContent(
                activeStep,
                formModel.formField,
                isSubmitting,
                _handleBack,
                slideDirection
              )}
            </SBox>
          </Form>
        )}
      </Formik>
    </SContainer>
  );
}

function _renderStepContent(
  step,
  formField,
  isSubmitting,
  _handleBack,
  slideDirection
) {
  switch (step) {
    case 0:
      return (
        <FirstStep
          formField={formField}
          isSubmitting={isSubmitting}
          activeStep={step}
          _handleBack={_handleBack}
          slideDirection={slideDirection}
        />
      );
    case 1:
      return (
        <SecondStep
          formField={formField}
          isSubmitting={isSubmitting}
          activeStep={step}
          _handleBack={_handleBack}
          slideDirection={slideDirection}
        />
      );
    case 2:
      return (
        <ThirdStep
          formField={formField}
          isSubmitting={isSubmitting}
          activeStep={step}
          _handleBack={_handleBack}
          slideDirection={slideDirection}
        />
      );
    default:
      return null;
  }
}

export function FormButtons(props) {
  const { buttonText, activeStep, _handleBack, disablingFields } = props;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        {activeStep !== 0 && (
          <Button onClick={_handleBack} sx={{ mt: 3, ml: 1 }}>
            Atrás
          </Button>
        )}
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disablingFields}
          sx={{ mt: 3, ml: 1 }}
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
}
