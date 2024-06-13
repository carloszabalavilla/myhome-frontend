// TaskContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { GetUserTasks, AddTask } from "../services/TaskService";
import { useUser } from "./UserContext";
import { useSnackBar } from "./SnackBarContext";
const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { setMessage, handleOpen, setSeverity } = useSnackBar();

  useEffect(() => {
    async function loadTasks() {
      try {
        const fetchedTasks = await GetUserTasks(user.id);
        console.log("fetchedTasks", fetchedTasks);
        if (!fetchedTasks) {
          setTasks([]);
        } else {
          setTasks(fetchedTasks);
        }
      } catch (error) {
        setMessage("Error al cargar las tareas");
        setSeverity("error");
        handleOpen();
      } finally {
        setLoading(false);
      }
    }
    if (user) loadTasks();
  }, [user, setMessage, handleOpen, setSeverity]);

  async function addTask(task) {
    try {
      setLoading(true);
      const newTask = task;
      const updatedTasks = [...tasks, newTask];
      await AddTask(newTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
