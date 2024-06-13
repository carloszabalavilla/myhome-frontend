import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, taskListItems } from "../dashboards/panel/listItems";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { SDrawer } from "../../styles/StyledComponents";
import { styled } from "@mui/system";
import { useAppBar } from "../../contexts/AppBarContext";
import { Grow } from "@mui/material";

export default function Drawer({ secondList, setModalOpen }) {
  const { open, setOpen, toggleDrawer } = useAppBar();
  const [moduleList, setModuleList] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1530 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, setOpen]);

  useEffect(() => {
    switch (secondList) {
      case "task":
        setModuleList(<TaskList setModalOpen={setModalOpen} />);
        break;
      case "finance":
        // Finance component
        break;
      default:
        setModuleList(null);
        break;
    }
  }, [secondList, setModalOpen]);

  return (
      <SDrawer
        variant="permanent"
        open={open}
        onMouseEnter={toggleDrawer}
        onMouseLeave={toggleDrawer}
        sx={{ display: { sm: "flex", xl: "none" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: "default" }}
          >
            Menu
          </Typography>
          <IconButton disabled={true}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List component="nav">
          <MenuList />
          <Divider sx={{ my: 1 }} />
          {moduleList}
        </List>
      </SDrawer>
  );
}

export function MenuList({ orientation }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleDrawer } = useAppBar();

  return (
    <>
      {mainListItems.map((item) => (
        <React.Fragment key={item.text}>
          <Divider orientation={orientation} sx={{ mx: 1, height: "auto" }} />
          <ListItem
            disableGutters
            sx={{
              ...(location.pathname === item.href && {
                backgroundColor: "secondary.darker",
              }),
            }}
          >
            <ListItemButton
              sx={{
                ...(location.pathname === item.href && {
                  cursor: "default",
                  "&:hover": { backgroundColor: "transparent" },
                }),
                ...(location.pathname !== item.href && {
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                }),
              }}
              className={location.pathname === item.href ? "disabled-link" : ""}
              onClick={() => {
                if (location.pathname !== item.href) {
                  navigate(item.href);
                  toggleDrawer();
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
    </>
  );
}

export function TaskList({ setModalOpen }) {
    const handleTaskClick = (item) => {
    if (item.text === "Añadir tarea") {
      setModalOpen(true);
    }
  };

  return (
    <>
      {taskListItems.map((item) => (
        <Grow key={item}>
        <React.Fragment key={item.text}>
          <ListItem disableGutters>
            <SListItemButton onClick={() => handleTaskClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </SListItemButton>
          </ListItem>
          <Divider orientation="vertical" sx={{ mx: 1, height: "auto" }} />
        </React.Fragment>
        </Grow>
      ))}
    </>
  );
}

const SListItemButton = styled(ListItemButton)(() => ({
  ":hover": {
    backgroundColor: "secondary.main",
    color: "#fff",
    fontWeight: "bold",
  },
}));
