import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import UserLogin from "../../services/AuthService";
import { useUser } from "../../contexts/UserContext";

function Login() {
  console.log("Pagina del login iniciando.");
  const navigate = useNavigate();

  const { setUser } = useUser();
  //localStorage.setItem('user', JSON.stringify(user));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    console.log("Llamando al servicio para el usuario: ", email);
    setUser(UserLogin(email, password, setShowError));
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="m-3">
        <Link to="/" className="btn btn-primary">
          Volver
        </Link>
      </div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          wrapperClass="mb-4"
          label="Correo electronico"
          id="form1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Contraseña"
          id="form2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError ? (
          <div name="loginErrorMsg" className="text-danger">
            <span>Usuario o contraseña incorrectos</span>
          </div>
        ) : null}
        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Recuerdame"
          />
          <Link href="/forgot-password">¿Olvidó la contraseña?</Link>
        </div>

        <MDBBtn
          className="mb-4"
          onClick={handleSubmit}
          disabled={!email || !password}
        >
          Iniciar sesión
        </MDBBtn>

        <div className="text-center">
          <p>
            ¿No eres miembro? <a href="/register">Regístrate</a>
          </p>
          <p>o inicia sesión con:</p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Login;
