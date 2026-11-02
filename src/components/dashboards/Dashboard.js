import React,{useEffect} from "react";
import {Box,Container,Toolbar,Typography,Button,Grid,Paper} from "@mui/material";
import {Link} from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DashboardDrawer from "../custom/Drawer";
import {useAppBar} from "../../contexts/AppBarContext";
import {useUser} from "../../contexts/UserContext";
import {useTasks} from "../../contexts/TaskContext";
export default function Dashboard(){
const {setOpen}=useAppBar();const {user}=useUser();const {tasks}=useTasks();useEffect(()=>{setOpen(false);document.title="Tu espacio · MyHome";},[setOpen]);
return <Box sx={{display:"flex"}}><DashboardDrawer/><Box component="main" sx={{flexGrow:1,minWidth:0}}><Toolbar/><Container maxWidth="lg" sx={{py:{xs:4,md:6}}}><Typography variant="overline" color="text.secondary">TU ESPACIO</Typography><Typography variant="h4" component="h1" sx={{mt:1,mb:2}}>Hola, {user?.firstName}.</Typography><Typography color="text.secondary" sx={{mb:4}}>Vamos a poner un poco de orden en el día.</Typography><Grid container spacing={3}>{[{icon:<CalendarMonthIcon/>,title:"Tareas del hogar",text:`Tienes ${tasks.length} tareas guardadas. Consulta el calendario o prepara la siguiente.`,href:"/user/tasks/management",action:"Abrir calendario"},{icon:<PeopleOutlineIcon/>,title:"Grupo familiar",text:"Un lugar para consultar y organizar la información de tu grupo.",href:"/user/family/management",action:"Ver mi grupo"}].map(item=><Grid item xs={12} md={6} key={item.title}><Paper variant="outlined" sx={{p:{xs:3,md:4},height:"100%",display:"flex",flexDirection:"column",alignItems:"start"}}><Box sx={{color:"primary.main",mb:2}}>{item.icon}</Box><Typography component="h2" variant="h6" sx={{fontWeight:650}}>{item.title}</Typography><Typography color="text.secondary" sx={{my:2,lineHeight:1.8,flex:1}}>{item.text}</Typography><Button component={Link} to={item.href} variant="contained">{item.action} →</Button></Paper></Grid>)}</Grid><Typography variant="caption" color="text.secondary" sx={{display:"block",mt:4}}>Demostración local · datos ficticios</Typography></Container></Box></Box>;}
