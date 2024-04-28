import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { PasswordRecovery } from "../../services/AuthService";
import {} from "mdb-ui-kit";

function ForgottenPassword() {
  console.log("Pagina del login iniciando.");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);

  const handleSubmit = () => {
    PasswordRecovery(email);
    toggleOpen();
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
          label="Correo electrónico"
          id="form1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBBtn
          className="mb-4"
          onClick={handleSubmit}
        >
          Recuperar
        </MDBBtn>
      </MDBContainer>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <span>Se ha enviado un correo.</span>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Cerrar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default ForgottenPassword;
