import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboards/userDashboard";
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
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
