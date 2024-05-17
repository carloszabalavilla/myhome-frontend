import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/auth/login" />;
};

const PrivateIndex = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/user" />;
};

export default PrivateRoute;
export { PrivateIndex };
