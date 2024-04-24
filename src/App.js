import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgottenUser from "./components/auth/ForgottenUser";

function App() {
  console.log("Inicio del cliente.");
  return (
    <div className="App">
    
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotten-user" element={<ForgottenUser />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
