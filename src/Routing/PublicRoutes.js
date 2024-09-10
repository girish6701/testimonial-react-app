import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../util_components/AuthContext";

const PublicRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoutes;
