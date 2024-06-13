import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardDrawer from "../custom/Drawer";
import Scheduler from "./scheduler/src/Scheduler";
import AddTask from "./AddTask";
import { useAppBar } from "../../contexts/AppBarContext";
import { useTasks } from "../../contexts/TaskContext";
import { blue } from "@mui/material/colors";
import { Form, Formik } from "formik";
import { useUser } from "../../contexts/UserContext";
import { TaskFormInitialValues } from "./FormModel/formModel";
import { addTaskValidationSchema } from "./FormModel/validationSchema";
import es from "date-fns/locale/es";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const user = useUser();
  const { addTask } = useTasks();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  async function _handleSubmit(values, actions) {
    console.log("handle submit, values", values);
    setSuccess(false);
    try {
      const taskData = {
        name: values.name,
        description: values.description,
        date: values.date,
        startHour: values.startHour,
        endHour: values.endHour,
        isEditable: false,
        isDone: false,
        //isPersonalizable:
        user: user.id,
        createdAt: new Date(),
        createdBy: user.id,
      };
      await addTask(taskData);
      //actions.setSubmitting(false);
      setSuccess(true);
      sleep(1000);
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
          <TaskCalendar />
        </Container>
      </Box>
      <Formik
        initialValues={TaskFormInitialValues}
        validationSchema={addTaskValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <AddTask
              handleSubmit={_handleSubmit}
              open={modalOpen}
              handleClose={handleModalClose}
              success={success}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function TaskCalendar() {
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
    // Do something...
  };

  const handleEventClick = (event, item) => {
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
    id: 0,
    label: task.name,
    groupLabel: null,
    user: task.user,
    color: blue[500],
    startHour: task.startHour,
    endHour: task.endHour,
    date: task.date,
    createdAt: task.createdAt,
    createdBy: task.createdBy,
  }));

  return (
    <Scheduler
      locale={es}
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

const eventsExample = [
  {
    id: "event-1",
    label: "Medical consultation",
    groupLabel: "Dr Shaun Murphy",
    user: "Dr Shaun Murphy",
    color: "#f28f6a",
    startHour: "04:00 AM",
    endHour: "05:00 AM",
    date: "2021-09-28",
    createdAt: new Date(),
    createdBy: "Kristina Mayer",
  },
  {
    id: "event-2",
    label: "Medical consultation",
    groupLabel: "Dr Claire Brown",
    user: "Dr Claire Brown",
    color: "#099ce5",
    startHour: "09:00 AM",
    endHour: "10:00 AM",
    date: "2021-09-29",
    createdAt: new Date(),
    createdBy: "Kristina Mayer",
  },
  {
    id: "event-3",
    label: "Medical consultation",
    groupLabel: "Dr Menlendez Hary",
    user: "Dr Menlendez Hary",
    color: "#263686",
    startHour: "13 PM",
    endHour: "14 PM",
    date: "2021-09-30",
    createdAt: new Date(),
    createdBy: "Kristina Mayer",
  },
  {
    id: "event-4",
    label: "Consultation prénatale",
    groupLabel: "Dr Shaun Murphy",
    user: "Dr Shaun Murphy",
    color: "#f28f6a",
    startHour: "08:00 AM",
    endHour: "09:00 AM",
    date: "2021-10-01",
    createdAt: new Date(),
    createdBy: "Kristina Mayer",
  },
];
