import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/AppBar";
import Home from "./components/common/Home";
import Login from "./components/auth/Signin";
import Dashboard from "./components/dashboards/Dashboard";
import TaskManager from "./components/tasks/TaskManager";
import Register from "./components/users/Register";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import ChangePassword from "./components/auth/ChangePassword";
import { UserProvider } from "./contexts/UserContext";
import { CssBaseline } from "@mui/material";
import ToggleColorMode from "./components/theme/ToggleColorMode";
import "@fontsource/montserrat";
import "@fontsource/lato";

function App() {
  console.log("Inicio del cliente.");

  return (
    <ToggleColorMode>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/tasks/management" element={<TaskManager />} />
            <Route path="/auth/register" element={<Register />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgottenPassword />}
            />
            <Route path="/auth/reset-password" element={<ChangePassword />} />
          </Routes>
        </Router>
      </UserProvider>
    </ToggleColorMode>
  );
}

export default App;
