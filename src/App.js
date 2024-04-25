import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Login from "./components/auth/Login";

function App() {
  console.log("Inicio del cliente.");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogginPage, setIsLogginPage] = useState(false);

  const handleLogin = () => {
    // Aquí cambias el estado de isLoggedIn a true cuando el usuario inicia sesión
    setIsLoggedIn(true);
  };
  const handleLogginRoute = () => {
    setIsLogginPage(true);
  };
  return (
    <div className="App"> 
      <Router>
        <div>
        <Navbar isLoggedIn={isLoggedIn} isLogginPage={isLogginPage} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
