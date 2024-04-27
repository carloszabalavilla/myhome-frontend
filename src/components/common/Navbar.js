import React from "react";
import { Link, redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function Navbar() {
  const { user } = useUser();
  console.log("usuario en navbar", user);
  const renderNavbar = () => {
    if (user != null) {
      return <LoggedInNavbar />;
    } else if (isNoNavbarPage()) {
      return null;
    } else {
      return <LoggedOutNavbar />;
    }
  };

  return <div>{renderNavbar()}</div>;
}

function LoggedInNavbar() {
  const { setUser } = useUser();
  const handleLogout = () => {
    console.log("Cerrando sesión");
    setUser(null);
    redirect("/");
  };
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
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Modulos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Soporte
              </Link>
            </li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </div>
        <Link o nClick={handleLogout} className="btn btn-primary">
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
          MyApp
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Acerca de
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contacto
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

function isNoNavbarPage() {
  return (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  );
}

export default Navbar;
