import React from "react";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CFieldInput } from "../custom/CustomComponents";
import { useFormikContext } from "formik";
import { TaskFormModel } from "./FormModel/formModel";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import es from "date-fns/locale/es";

export default function AddTask(props) {
  const { open, handleClose, handleSubmit } = props;
  const formField = TaskFormModel.formField;
  const { values, touched, errors } = useFormikContext();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Añadir tarea
        </Typography>
        <CFieldInput id={"addTaskName"} field={formField.name} />
        <CFieldInput id={"addTaskDescription"} field={formField.description} />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label={formField.date.label}
            value={values[formField.date.name]}
            name={formField.date.name}
            required={formField.date.required}
            error={
              touched[formField.date.name] &&
              Boolean(errors[formField.date.name])
            }
            helperText={
              touched[formField.date.name] && errors[formField.date.name]
            }
          />
          <TimePicker
            id={"addTaskStartHour"}
            value={values[formField.startHour.name]}
            name={formField.startHour.name}
            required={formField.startHour.required}
          />
        </LocalizationProvider>
        <Grid container justifyContent="space-between" alignItems="center" mt>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Guardar
            </Button>
            {/* <CSubmitButton
            success={success}
            isSubmitting={isSubmitting}
            disablingFields={isSubmitting}
            buttonText={"Guardar"}
          /> */}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
