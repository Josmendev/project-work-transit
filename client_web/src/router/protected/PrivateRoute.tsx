import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { BASE_ROUTES } from "../../shared/utils/constants";

export const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  const logged = user?.token;

  return logged ? <Outlet /> : <Navigate to={BASE_ROUTES.PUBLIC.LOGIN} replace />;
};
