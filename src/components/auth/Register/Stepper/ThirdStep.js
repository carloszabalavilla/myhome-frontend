import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Slide,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormButtons } from "../Register";
import termsAndConditions from "../../../common/footerPages/Terms";

export default function ThirdStep(props) {
  const { values, setFieldValue } = useFormikContext();
  const { formField, isSubmitting, activeStep, _handleBack, slideDirection } =
    props;
  const disablingFields = isSubmitting || !values[formField.acceptTerms.name];
  const listToDisplay = [
    "firstName",
    "lastName",
    "userEmail",
    "birthDate",
    "phoneNumber",
    "address",
  ];

  function handleAcceptTerms(event) {
    setFieldValue("acceptTerms", event.target.checked);
  }

  function handleActiveNewsletter(event) {
    setFieldValue("activeNewsletter", event.target.checked);
  }

  return (
    <Slide direction={slideDirection} in={true} mountOnEnter unmountOnExit>
      <Box>
        <Grid container spacing={2}>
          {listToDisplay.map((item) => (
            <Grid item xs={12} sm={6} key={item}>
              <TextField
                label={formField[item].label}
                value={
                  values[item] !== "" ? values[item] : "No se ha registrado"
                }
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom mt={4}>
          Términos y Condiciones
        </Typography>
        <TextField
          value={termsAndConditions}
          variant="outlined"
          fullWidth
          multiline
          rows={16}
          InputProps={{
            readOnly: true,
          }}
        />
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.acceptTerms}
                onChange={handleAcceptTerms}
                name="acceptTerms"
              />
            }
            label="Aceptar términos y condiciones"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.activeNewsletter}
                onChange={handleActiveNewsletter}
                name="activeNewsletter"
              />
            }
            label="Activar newsletter y notificaciones"
          />
        </Box>
        <FormButtons
          buttonText={"Finalizar el registro"}
          disablingFields={disablingFields}
          isLastStep={true}
          activeStep={activeStep}
          _handleBack={_handleBack}
        />
      </Box>
    </Slide>
  );
}
