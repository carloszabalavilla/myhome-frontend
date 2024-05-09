import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordChange } from "../../services/AuthService";
import { Button, Container, Input } from "@mui/material";

function ChangePassword() {
  console.log("Pagina del login iniciando.");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    PasswordChange(password, password2);
    navigate("/login");
  };

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Input
        wrapperClass="mb-4"
        label="Contraseña nueva"
        id="form1"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        wrapperClass="mb-4"
        label="Repetir contraseña nueva"
        id="form2"
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <Button className="mb-4" onClick={handleSubmit}>
        Recuperar la contraseña
      </Button>
    </Container>
  );
}

export default ChangePassword;
