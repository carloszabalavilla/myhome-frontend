import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardDrawer from "../custom/Drawer";
import Scheduler from "./scheduler/src/Scheduler";
import AddTask from "./AddTask";
import { useAppBar } from "../../contexts/AppBarContext";
import { useTasks } from "../../contexts/TaskContext";
import { blue } from "@mui/material/colors";
import { useUser } from "../../contexts/UserContext";
import es from "date-fns/locale/es";

const BoxSx = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
};

export default function TaskManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setOpen } = useAppBar();
  const { user } = useUser();
  const { addTask } = useTasks();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  async function _handleSubmit(values) {
    console.log("handle submit, values", values);
    setSuccess(false);
    try {
      const taskData = {
        name: values.name,
        description: values.description,
        groupLabel: user.name,
        date: values.date,
        startHour: values.startHour,
        endHour: values.endHour,
        isEditable: false,
        isDone: false,
        user: user.id,
        createdAt: new Date(),
        createdBy: user.id,
      };
      await addTask(taskData);
      setSuccess(true);
      handleModalClose();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert("Error al guardar la tarea");
    }
  }

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardDrawer secondList={"task"} setModalOpen={setModalOpen} />
      <Box component="main" sx={BoxSx}>
        <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
          <TaskCalendar setModalOpen={setModalOpen} />
        </Container>
      </Box>
      {modalOpen && (
        <AddTask
          handleSubmit={_handleSubmit}
          open={modalOpen}
          handleClose={handleModalClose}
          success={success}
        />
      )}
    </Box>
  );
}

function TaskCalendar({ setModalOpen }) {
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
    setModalOpen();
  };

  const handleEventClick = (event, item) => {
    setModalOpen();

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
