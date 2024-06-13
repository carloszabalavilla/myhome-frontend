import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/AppBar";
import routes from "./routes/routes";
import { UserProvider } from "./contexts/UserContext";
import { CssBaseline } from "@mui/material";
import { ThemeProviderComponent } from "./contexts/ThemeContext";
import { AppBarProvider } from "./contexts/AppBarContext";
import { TaskProvider } from "./contexts/TaskContext";
import { FamilyGroupProvider } from "./contexts/FamilyGroupContext";
import { SnackBarProvider } from "./contexts/SnackBarContext";
import "@fontsource/montserrat";
import "@fontsource/lato";
function App() {
  console.log("Inicio del cliente.");

  return (
    <ThemeProviderComponent>
      <AppBarProvider>
        <CssBaseline />
        <SnackBarProvider>
          <UserProvider>
            <FamilyGroupProvider>
              <TaskProvider>
                <Router>
                  <Navbar />
                  <Routes>
                    {routes.map(({ path, element, index }) => (
                      <Route
                        key={path}
                        path={path}
                        element={element}
                        index={index}
                      />
                    ))}
                  </Routes>
                </Router>
              </TaskProvider>
            </FamilyGroupProvider>
          </UserProvider>
        </SnackBarProvider>
      </AppBarProvider>
    </ThemeProviderComponent>
  );
}

export default App;
