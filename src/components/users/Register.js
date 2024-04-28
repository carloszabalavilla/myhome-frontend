import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import NewUser from "../../services/AccountService";
import { useNavigate } from "react-router-dom";

function Register() {
  console.log("Pagina del registro iniciando.");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon, setIcon] = useState("eye-slash");
  const [icon2, setIcon2] = useState("eye-slash");
  const navigate = useNavigate();

  const handleSubmit = () => {
    NewUser(email, password, password2);
    //    navigate("/dashboard");
  };

  const handleToggle = () => {
    console.log("Cambiando tipo de input: ", type);
    if (type === "password") {
      setIcon("eye");
      setType("text");
    } else {
      setIcon("eye-slash");
      setType("password");
    }
  };
  const handleToggle2 = () => {
    if (type2 === "password") {
      setIcon2("eye");
      setType2("text");
    } else {
      setIcon2("eye-slash");
      setType2("password");
    }
  };

  return (
    <div>
      <div className="m-3">
        <Link className="btn btn-primary" onClick={() => navigate(-1)}>
          Volver
        </Link>
      </div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          wrapperClass="mb-4"
          label="Correo electronico"
          id="emailReg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Contraseña"
          id="passwordReg"
          type={type}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <div
            className="flex justify-around items-center pe-1 trailing pe-auto "
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
          >
            <MDBIcon far icon={icon} />
          </div>
        </MDBInput>
        <MDBInput
          wrapperClass="mb-4"
          label="Repita la contraseña"
          id="passwordReg2"
          type={type2}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        >
          <div
            class="flex justify-around items-center pe-1 trailing pe-auto "
            onClick={handleToggle2}
            style={{ cursor: "pointer" }}
          >
            <MDBIcon far icon={icon2} />
          </div>
        </MDBInput>

        <MDBBtn className="mb-4" onClick={handleSubmit}>
          Siguiente
        </MDBBtn>
      </MDBContainer>
    </div>
  );
}

export default Register;
