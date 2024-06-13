import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/error/unauthorized" />;
};

const PrivateIndex = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/user" />;
};

export default PrivateRoute;
export { PrivateIndex };
