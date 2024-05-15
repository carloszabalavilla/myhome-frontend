import Box from '@mui/material/Box';
import React from 'react';
import MyAppBar from '../dashboards/MyAppBar';
import MyDrawer from '../dashboards/MyDrawer';

function TaskManager() {
    console.log("Redirigiendo a la página de usuario de tareas.");
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };
    return (
        <Box>
                  <MyAppBar open={open} />
                  <Box sx={{ display: "flex" }}>
                  <MyDrawer open={open} toggleDrawer={toggleDrawer} />

                </Box>
        </Box>
    );
}
export default TaskManager;
