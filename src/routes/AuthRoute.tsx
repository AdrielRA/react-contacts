import { useAuth } from "contexts";
import { Props } from "props";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }: Props) => {
  const { logged } = useAuth();
  const location = useLocation();

  return !logged ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default AuthRoute;
