import React from "react";
import { Box, Slide, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { FormButtons } from "./StepperButtons";
import { CFieldInput } from "../../../custom/CustomComponents";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import es from "date-fns/locale/es";
import dayjs from "dayjs";
import { format } from "date-fns";

export default function SecondStep(props) {
  const { values, errors, touched, setFieldValue, handleBlur } =
    useFormikContext();
  const { formField, isSubmitting, activeStep, _handleBack, slideDirection } =
    props;
  const birthDate = formField.birthDate;
  const minDate = dayjs().subtract(110, "year").toDate();
  const maxDate = dayjs().subtract(16, "year").toDate();
  const disablingFields =
    isSubmitting ||
    !values[formField.lastName.name] ||
    !values[formField.birthDate.name];

  function handleDateChange(date) {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFieldValue(birthDate.name, formattedDate);
  }

  return (
    <Slide direction={slideDirection} in={true} mountOnEnter unmountOnExit>
      <Box>
        <CFieldInput id={"registerlastName"} field={formField.lastName} />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            required
            disableFuture
            label="Fecha de Nacimiento"
            value={values[birthDate.name]}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleDateChange}
            onBlur={handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="registerBirthDate"
                label={birthDate.label}
                name={birthDate.name}
                error={
                  touched[birthDate.name] && Boolean(errors[birthDate.name])
                }
                helperText={touched[birthDate.name] && errors[birthDate.name]}
              />
            )}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
        <CFieldInput id={"registerAdress"} field={formField.address} />
        <CFieldInput id={"registerPhoneNumber"} field={formField.phoneNumber} />
        <FormButtons
          buttonText={"Siguiente"}
          activeStep={activeStep}
          _handleBack={_handleBack}
          disablingFields={disablingFields}
        />
      </Box>
    </Slide>
  );
}
