import React from "react";
import {AppBar,Toolbar,Container,Typography,Button,Box} from "@mui/material";
import {Link} from "react-router-dom";
export default function LoggedOutAppBar(){return <AppBar position="static" color="inherit"><Container maxWidth="lg"><Toolbar disableGutters sx={{gap:2}}><Typography component={Link} to="/" sx={{fontSize:22,fontWeight:750,letterSpacing:"-.05em",textDecoration:"none",color:"primary.main"}}>MyHome.</Typography><Box sx={{flex:1}}/><Button component={Link} to="/modulos" color="inherit" sx={{display:{xs:"none",sm:"inline-flex"}}}>Qué incluye</Button><Button component={Link} to="/auth/login" variant="outlined">Iniciar sesión</Button></Toolbar></Container></AppBar>;}
