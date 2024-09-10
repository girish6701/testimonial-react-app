import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../util_components/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoutes;
