import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SavingsIcon from "@mui/icons-material/Savings";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const basePath = "/user";

export const mainListItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: basePath + "/dashboard" },
  {
    text: "Tareas",
    icon: <AssignmentIcon />,
    href: basePath + "/tasks/management",
  },
  { text: "Finanzas", icon: <SavingsIcon />, href: basePath + "/finances" },
  {
    text: "Alimentación",
    icon: <LocalDiningIcon />,
    href: basePath + "/nutrition",
  },
  { text: "Grupo Familiar", icon: <PeopleIcon />, href: basePath + "/family" },
];

export const secondaryListItems = [
  {
    text: "Anadir tarea",
    icon: <DashboardIcon />,
    href: basePath + "/dashboard",
  },
  {
    text: "Editar tarea",
    icon: <AssignmentIcon />,
    href: basePath + "/tasks/management",
  },
  { text: "Borrar Tarea", icon: <SavingsIcon />, href: basePath + "/finances" },
  {
    text: "Alimentación",
    icon: <LocalDiningIcon />,
    href: basePath + "/nutrition",
  },
];
