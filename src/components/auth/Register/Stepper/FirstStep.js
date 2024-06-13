import React from "react";
import { Box, Slide } from "@mui/material";
import { useFormikContext } from "formik";
import { FormButtons } from "./StepperButtons";
import { CFieldInput, CPasswordInput } from "../../../custom/CustomComponents";

export default function FirstStep(props) {
  const { values } = useFormikContext();
  const { formField, isSubmitting, activeStep, _handleBack, slideDirection } = props;

  const disablingFields =
    isSubmitting ||
    !values[formField.firstName.name] ||
    !values[formField.userEmail.name] ||
    !values[formField.userPassword.name] ||
    !values[formField.userPassword2.name];

  return (
    <Slide direction={slideDirection} in={true} mountOnEnter unmountOnExit>
      <Box>
        <CFieldInput id={"registerName"} field={formField.firstName} />
        <CFieldInput id={"registerEmail"} field={formField.userEmail} />
        <CPasswordInput
          id={"registerPassword"}
          field={formField.userPassword}
        />
        <CPasswordInput
          id={"registerPassword2"}
          field={formField.userPassword2}
        />
        <FormButtons
          buttonText={"Crear cuenta"}
          activeStep={activeStep}
          _handleBack={_handleBack}
          disablingFields={disablingFields}
        />
      </Box>
    </Slide>
  );
}
