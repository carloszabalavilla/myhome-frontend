import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/AppBar";
import routes from "./routes/routes";
import { UserProvider } from "./contexts/UserContext";
import { CssBaseline } from "@mui/material";
//import ToggleColorMode from "./styles/theme/ToggleColorMode";
import "@fontsource/montserrat";
import "@fontsource/lato";
import { ThemeProviderComponent } from "./contexts/ThemeContext";

function App() {
  console.log("Inicio del cliente.");

  return (
    <ThemeProviderComponent>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            {routes.map(({ path, element, index }) => (
              <Route key={path} path={path} element={element} index={index} />
            ))}
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProviderComponent>
  );
}

export default App;
