import React, { useState } from "react";
import { PasswordRecovery } from "../../services/AuthService";
import { Button, Container, Input, Modal, Backdrop, Box, Fade, Typography } from "@mui/material";
import GoBack from "../common/GoBack";
function ForgottenPassword() {

  console.log("Pagina del login iniciando.");

  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSubmit = () => {
    PasswordRecovery(email);
    handleOpen();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <GoBack/>
      <Container className="p-3 my-5 d-flex flex-column w-50">
        <Input
          wrapperClass="mb-4"
          label="Correo electrónico"
          id="form1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="mb-4"
          onClick={handleSubmit}
        >
          Recuperar
        </Button>
      </Container>
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
    </div>
  );
}

export default ForgottenPassword;
