import { AppBar, Toolbar, Container } from "@mui/material";
import { MenuList } from "../Drawer";

function SecondaryAppBar() {
  return (
    <AppBar position="static" color="inherit" sx={{ display: { xs: "none", xl: "flex" }, mt:8 }}>
      <Toolbar>
        <Container
          sx={{ maxWidth: "lg", display: "flex", justifyContent: "center" }}
        >
          <MenuList orientation={"vertical"} />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default SecondaryAppBar;
