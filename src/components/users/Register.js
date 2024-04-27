import React from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import NewUser from "../../services/AccountService";

function Register() {
  console.log("Pagina del registro iniciando.");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleSubmit = () => {
    NewUser(email, password, password2);
  };

  return (
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Repita la contraseña"
        id="passwordReg2"
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <MDBBtn className="mb-4" onClick={handleSubmit}>
        Siguiente
      </MDBBtn>
    </MDBContainer>
  );
}

export default Register;