import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../shared/contexts/AuthContext";
import { BASE_ROUTES } from "../shared/utils/constants";

export const PublicRoute = () => {
  const { user } = useContext(AuthContext);
  const logged = user?.token;

  return !logged ? <Outlet /> : <Navigate to={BASE_ROUTES.PRIVATE.DASHBOARD} />;
};
