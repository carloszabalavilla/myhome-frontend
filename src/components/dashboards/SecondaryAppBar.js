import { AppBar, Toolbar, Button, Divider, Container } from "@mui/material";
import { Link } from "react-router-dom";

function SecondaryAppBar() {
  return (
    <AppBar
      position="static"
      color="white"
      sx={{ display: { sm: "none", xl: "flex" } }}
    >
      <Toolbar>
        <Container sx={{ maxWidth: "lg", display: "flex", justifyContent:"center" }}>
          <Button component={Link} to="/about" color="inherit">
            Tareas
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button component={Link} to="/contact" color="inherit">
            Finanzas
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default SecondaryAppBar;
