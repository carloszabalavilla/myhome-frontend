import React, { useEffect } from "react";
import { Box, Container, Toolbar, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardDrawer from "../custom/Drawer";
import { useAppBar } from "../../contexts/AppBarContext";
import { useUser } from "../../contexts/UserContext";
import { useTasks } from "../../contexts/TaskContext";
export default function Dashboard() {
  const {setOpen} = useAppBar(); const {user} = useUser(); const {tasks} = useTasks();
  useEffect(() => {setOpen(false);}, [setOpen]);
  return <Box sx={{display:"flex"}}><DashboardDrawer/><Box component="main" sx={{flexGrow:1}}><Toolbar/>
    <Container sx={{mt:4}}><Typography variant="h4" component="h1">Hola, {user?.firstName}</Typography>
      <Typography sx={{my:2}}>Tienes {tasks.length} tareas guardadas.</Typography>
      <Stack direction="row" spacing={2}><Button component={Link} to="/user/tasks/management" variant="contained">Gestionar tareas</Button><Button component={Link} to="/user/family/management">Grupo familiar</Button></Stack>
    </Container></Box></Box>;
}
