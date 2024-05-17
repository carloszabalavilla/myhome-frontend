// routes.js
import Home from "../components/common/Home";
import Login from "../components/auth/Signin";
import Dashboard from "../components/dashboards/Dashboard";
import TaskManager from "../components/tasks/TaskManager";
import Register from "../components/auth/Register";
import ForgottenPassword from "../components/auth/ForgottenPassword";
import ResetPassword from "../components/auth/ResetPassword";
import NotFound from "../components/errorPages/NotFoundError";
import PrivateRoute from "./PrivateRoute";

const routes = [
  { path: "/", element: <Home />, index: true },
  { path: "/auth/login", element: <Login /> },
  { path: "/user/dashboard", element:<PrivateRoute><Dashboard /></PrivateRoute>  },
  { path: "/user/tasks/management", element:<PrivateRoute><TaskManager /></PrivateRoute>  },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/forgot-password", element: <ForgottenPassword /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
