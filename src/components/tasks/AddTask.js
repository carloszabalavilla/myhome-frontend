import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useUser } from "../../contexts/UserContext";
import { useTasks } from "../../contexts/TaskContext";
import es from "date-fns/locale/es";
import { useTheme } from "@emotion/react";

export default function AddTask(props) {
  const { open, handleClose } = props;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { addTask } = useTasks();
  const primaryColor = useTheme().palette.primary.main;
  const {user} = useUser();

  const [values, setValues] = useState({
    name: "",
    description: "",
    color: primaryColor,
    date: null,
    startHour: null,
    endHour: null,
  });

  function handleChange(e){
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleDateChange(name, value){
    setValues({
      ...values,
      [name]: value,
    });
  };

  function validate(){
    let tempErrors = {};
    if (!values.name) tempErrors.name = "El nombre es obligatorio.";
    if (!values.description)
      tempErrors.description = "La descripción es obligatoria.";
    if (!values.date) tempErrors.date = "La fecha es obligatoria.";
    if (!values.startHour)
      tempErrors.startHour = "La hora de inicio es obligatoria.";
    if (!values.endHour)
      tempErrors.endHour = "La hora de finalización es obligatoria.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function handleSubmit(e){
    console.log("user id ", user.id);
    e.preventDefault();
    if (validate()) {
      try {
        const taskData = {
          ...values,
          isDone: false,
          user: user.id,
          createdAt: new Date(),
          createdBy: user.id,
        };
        console.log("taskData", taskData);
        await addTask(taskData);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 1000);
      } catch (error) {
        console.error("Error al guardar la tarea:", error);
        alert("Error al guardar la tarea");
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Añadir tarea
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="addTaskName"
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            id="addTaskDescription"
            label="Descripción"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              label="Fecha"
              value={values.date}
              onChange={(value) => handleDateChange("date", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="date"
                  error={Boolean(errors.date)}
                  helperText={errors.date}
                  margin="normal"
                  fullWidth
                />
              )}
            />
            <TimePicker
              label="Hora de inicio"
              value={values.startHour}
              onChange={(value) => handleDateChange("startHour", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="startHour"
                  error={Boolean(errors.startHour)}
                  helperText={errors.startHour}
                  margin="normal"
                  fullWidth
                />
              )}
            />
            <TimePicker
              label="Hora de finalización"
              value={values.endHour}
              onChange={(value) => handleDateChange("endHour", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="endHour"
                  error={Boolean(errors.endHour)}
                  helperText={errors.endHour}
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
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
