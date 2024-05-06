import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboards/UserDashboard";
import TaskManager from "./components/tasks/TaskManager";
import Register from "./components/users/Register";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import { UserProvider } from "./contexts/UserContext";

function App() {
  console.log("Inicio del cliente.");

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task/management" element={<TaskManager/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgottenPassword />} />
            <Route path="/reset-password" element={<ForgottenPassword />} />
            <Route path="/*">"404 Not Found"</Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
