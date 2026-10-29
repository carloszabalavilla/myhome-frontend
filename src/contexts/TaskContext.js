// TaskContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { GetUserTasks, AddTask, UpdateTask, DeleteTask } from "../services/TaskService";
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
    else { setTasks([]); setLoading(false); }
  }, [user, setMessage, handleOpen, setSeverity]);

  async function addTask(task) {
    try {
      setLoading(true);
      const newTask = await AddTask(task);
      setTasks(previous => [...previous, newTask]);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(task) {
    const updated = await UpdateTask(task);
    setTasks(previous => previous.map(item => item.id === updated.id ? updated : item));
  }
  async function removeTask(id) {
    await DeleteTask(id);
    setTasks(previous => previous.filter(item => item.id !== id));
  }
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
