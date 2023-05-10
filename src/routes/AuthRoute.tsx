import { useAuth } from "contexts";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute: ({ children }: { children: React.ReactNode }) => any = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { logged } = useAuth();
  const location = useLocation();

  if (!logged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthRoute;
