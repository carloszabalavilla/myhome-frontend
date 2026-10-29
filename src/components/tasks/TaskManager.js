import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardDrawer from "../custom/Drawer";
import Scheduler from "./scheduler/src/Scheduler";
import AddTask from "./AddTask";
import { useAppBar } from "../../contexts/AppBarContext";
import { useTasks } from "../../contexts/TaskContext";
import { blue } from "@mui/material/colors";

export default function TaskManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { setOpen } = useAppBar();
  useEffect(() => { setOpen(false); }, [setOpen]);
  function close() { setModalOpen(false); setSelected(null); }
  function select(task) { setSelected(task); setModalOpen(true); }
  return <Box sx={{display:"flex"}}>
    <DashboardDrawer secondList="task" setModalOpen={setModalOpen}/>
    <Box component="main" sx={{flexGrow:1,height:"100vh",overflow:"auto"}}>
      <Container maxWidth="lg" sx={{mt:10,mb:4}}><TaskCalendar setModalOpen={setModalOpen} onSelectTask={select}/></Container>
    </Box>
    {modalOpen && <AddTask key={selected?.id || "new"} open={modalOpen} handleClose={close} task={selected}/>}
  </Box>;
}

function TaskCalendar({ setModalOpen, onSelectTask }) {
  const { tasks, loading } = useTasks();

  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "Mon", // or Sun
      defaultMode: "month", // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 500,
      maxHeight: 500,
    },
    alertProps: {
      open: false,
      color: "info", // info | success | warning | error
      severity: "info", // info | success | warning | error
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
      showActionButton: false,
      showNotification: false,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });

  const handleCellClick = (event, row, day) => {
    setModalOpen(true);
  };

  const handleEventClick = (event, item) => {
    onSelectTask(tasks.find(task => task.id === item.id));

    // Do something...
  };

  const handleEventsChange = (item) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const events = tasks.map((task) => ({
    id: task.id,
    label: task.name,
    groupLabel: `${task.user.firstName} ${task.user.lastName}`,
    user: task.user.id,
    color: blue[500],
    startHour: task.startHour,
    endHour: task.endHour,
    date: task.date,
    createdAt: task.createdAt,
    createdBy: task.createdBy,
  }));

  return (
    <Scheduler
      locale="es"
      events={events}
      legacyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  );
}
