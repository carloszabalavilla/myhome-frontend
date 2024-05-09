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
  { text: "Dashboard", icon: <DashboardIcon />, href: basePath + "/user/dashboard" },
  {
    text: "Tareas",
    icon: <AssignmentIcon />,
    href: basePath + "/user/tasks/management",
  },
  { text: "Finanzas", icon: <SavingsIcon />, href: basePath + "/user/finances" },
  {
    text: "Alimentación",
    icon: <LocalDiningIcon />,
    href: basePath + "/nutrition",
  },
  { text: "Grupo Familiar", icon: <PeopleIcon />, href: basePath + "/user/family" },
];

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
