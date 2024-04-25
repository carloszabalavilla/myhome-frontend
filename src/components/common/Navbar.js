// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, isLogginPage }) => {
  const renderNavbar = () => {
    if (isLoggedIn) {
      return <LoggedInNavbar />;
    } else if (isLogginPage) {
      return null;
    } else {
      return <LoggedOutNavbar />;
    }
  };

  return <div>{renderNavbar()}</div>;
};

const LoggedInNavbar = () => {
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
        <Link to="/login" className="btn btn-primary">
          Iniciar sesión
        </Link>
        {/* Agrega un botón de inicio de sesión */}
      </div>
    </nav>
  );
};

const LoggedOutNavbar = () => {
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
        {/* Agrega un botón de inicio de sesión */}{" "}
      </div>
    </nav>
  );
};

export default Navbar;
