import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Stack, Alert } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { useTasks } from "../../contexts/TaskContext";
import { localDate, taskPayload } from "./calendarValues";

export default function AddTask({open, handleClose, task}) {
  const { user } = useUser();
  const { addTask, updateTask, removeTask } = useTasks();
  const [values, setValues] = useState({name:task?.name || "",description:task?.description || "",color:task?.color || "#1976d2",date:task?.date || localDate(),startHour:task?.startHour?.substring(0,5) || "10:00",endHour:task?.endHour?.substring(0,5) || "11:00"});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const change = event => setValues(previous => ({...previous,[event.target.name]:event.target.value}));
  async function save(event) {
    event.preventDefault(); setError("");
    if (values.endHour <= values.startHour) { setError("La hora de finalización debe ser posterior al inicio."); return; }
    setSaving(true);
    try {
      const payload = taskPayload(values, user.id, task);
      if (task) await updateTask(payload); else await addTask(payload);
      handleClose();
    } catch { setError("No se pudo guardar la tarea. Comprueba la conexión."); }
    finally { setSaving(false); }
  }
  async function remove() {
    setSaving(true); setError("");
    try { await removeTask(task.id); handleClose(); }
    catch { setError("No se pudo eliminar la tarea."); }
    finally { setSaving(false); }
  }
  return <Modal open={open} onClose={saving ? undefined : handleClose}>
    <Box sx={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"min(440px, 90vw)",maxHeight:"90vh",overflow:"auto",bgcolor:"background.paper",boxShadow:24,p:3}}>
      <Typography variant="h6" component="h2">{task ? "Editar tarea" : "Añadir tarea"}</Typography>
      <Stack component="form" spacing={2} onSubmit={save} sx={{mt:2}}>
        <TextField label="Nombre" name="name" value={values.name} onChange={change} required />
        <TextField label="Descripción" name="description" value={values.description} onChange={change} multiline />
        <TextField label="Fecha" name="date" type="date" value={values.date} onChange={change} InputLabelProps={{shrink:true}} required />
        <TextField label="Hora de inicio" name="startHour" type="time" value={values.startHour} onChange={change} InputLabelProps={{shrink:true}} required />
        <TextField label="Hora de finalización" name="endHour" type="time" value={values.endHour} onChange={change} InputLabelProps={{shrink:true}} required />
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {task && <Button color="error" onClick={remove} disabled={saving}>Eliminar</Button>}
          <Button onClick={handleClose} disabled={saving}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={saving}>Guardar</Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>;
}
