import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { user } = useUser();
  const location = useLocation();
  console.log("usuario en navbar", user);

  const isNoNavPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/change-password";
  const isLoggedIn = user !== null;

  return (
    <div>
      {isNoNavPage ? null : isLoggedIn ? (
        <LoggedInNavbar />
      ) : (
        <LoggedOutNavbar />
      )}
    </div>
  );
}

function LoggedInNavbar() {
  const { setUser } = useUser();
  const handleLogout = () => {
    console.log("Cerrando sesión");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          MyDashboard
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/finances">
                Finanzas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Soporte
              </Link>
            </li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </div>
        <Link to="/" onClick={handleLogout} className="btn btn-primary">
          Salir
        </Link>
      </div>
    </nav>
  );
}

function LoggedOutNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MyHome
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Modulos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Descarga
              </Link>
            </li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </div>
        <Link to="/login" className="btn btn-primary">
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
