import Home from "../components/common/Home";
import Login from "../components/auth/Signin";
import Dashboard from "../components/dashboards/Dashboard";
import TaskManager from "../components/tasks/TaskManager";
import Register from "../components/auth/Register/Register";
import ResetPassword from "../components/auth/ResetPassword";
import NotFound from "../components/errorPages/NotFoundError";
import PrivateRoute from "./PrivateRoute";
import Account from "../components/user/Account";
import Settings from "../components/user/Settings";
import Profile from "../components/user/Profile";
import Success from "../components/auth/Register/Success";
import ConfirmEmail from "../components/auth/ConfirmEmail";
import FinancesManager from "../components/finances/FinancesManager";
import NutritionManager from "../components/NutritionManager";
import FamilyManager from "../components/family/FamilyManager";
import UnauthorizedError from "../components/errorPages/UnauthorizedError";
import RecoveryPassword from "../components/auth/RecoveryPassword";
import LetPasswordChange from "../components/auth/LetPasswordChange";
import Modules from "../components/common/Modules";
import Pricing from "../components/common/Pricing";
import Support from "../components/common/Support";
import TermsAndConditions from "../components/common/footerPages/Terms";
import Contact from "../components/common/footerPages/Contact";
import About from "../components/common/footerPages/About";

const routes = [
  {
    /*Common routes*/
  },
  { path: "/", element: <Home />, index: true },
  { path: "/modulos", element: <Modules /> },
  { path: "/tarifas", element: <Pricing /> },
  { path: "/soporte", element: <Support /> },
  { path: "/terms", element: <TermsAndConditions /> },
  { path: "/contact", element: <Contact /> },
  {path: "/about", element: <About />},
  {
    /*Auth routes*/
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/forgot-password", element: <RecoveryPassword /> },
  { path: "/auth/change-password", element: <LetPasswordChange /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
  { path: "/auth/confirm", element: <ConfirmEmail /> },
  { path: "/auth/success", element: <Success /> },
  {
    /*Error routes*/
  },
  { path: "*", element: <NotFound /> },
  { path: "/error/unauthorized", element: <UnauthorizedError /> },
  { path: "/error/notfound", element: <NotFound /> },
  {
    /*User routes*/
  },
  {
    path: "/user/account",
    element: (
      <PrivateRoute>
        <Account />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/settings",
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/tasks/management",
    element: (
      <PrivateRoute>
        <TaskManager />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/finances/management",
    element: (
      <PrivateRoute>
        <FinancesManager />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/nutrition/management",
    element: (
      <PrivateRoute>
        <NutritionManager />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/family/management",
    element: (
      <PrivateRoute>
        <FamilyManager />
      </PrivateRoute>
    ),
  },
];

export default routes;
