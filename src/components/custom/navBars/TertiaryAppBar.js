import { AppBar, Toolbar, Container, Collapse } from "@mui/material";
import { TaskList } from "../Drawer";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function TertiaryAppBar() {
  const location = useLocation();
  const [showAppBar, setShowAppBar] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.startsWith("/user/task")) {
      setShowAppBar(true);
    } else {
      setShowAppBar(false);
    }
  }, [location]);

  const renderButtons = () => {
    const { pathname } = location;
    if (pathname.startsWith("/user/task")) {
      return <TaskList orientation={"vertical"} />;
    } else if (pathname.startsWith("/user/family-group")) {
      return <></>;
    } else {
      return <></>;
    }
  };

  return (
    <Collapse in={showAppBar}>
      <AppBar
        color="transparent"
        position="static"
        sx={{ display: { sm: "none", xl: "flex" }, transition: "all 0.8s" }}
      >
        <Toolbar>
          <Container
            sx={{
              maxWidth: "lg",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderButtons()}
          </Container>
        </Toolbar>
      </AppBar>
    </Collapse>
  );
}
