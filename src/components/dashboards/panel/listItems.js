import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SavingsIcon from "@mui/icons-material/Savings";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const basePath = "/user";

export const mainListItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: basePath + "/dashboard" },
  {
    text: "Tareas",
    icon: <AssignmentIcon />,
    href: basePath + "/tasks/management",
  },
  { text: "Finanzas", icon: <SavingsIcon />, href: basePath + "/finances/management" },
  {
    text: "Alimentación",
    icon: <LocalDiningIcon />,
    href: basePath + "/nutrition/management",
  },
  { text: "Grupo Familiar", icon: <PeopleIcon />, href: basePath + "/family/management" },
];

const handleAddTask = () => {
  
};

const handleEditTask = () => {
  console.log("Editar tarea");
  // Lógica para abrir modal de editar tarea
};

const handleDeleteTask = () => {
  console.log("Borrar tarea");
  // Lógica para abrir modal de borrar tarea
};

export const taskListItems = [
  {
    text: "Añadir tarea",
    icon: <AddTaskIcon />,
    onClick: handleAddTask,
  },
  {
    text: "Editar tarea",
    icon: <EditIcon />,
    onClick: handleEditTask,
  },
  {
    text: "Borrar tarea",
    icon: <DeleteIcon />,
    onClick: handleDeleteTask,
  },
];