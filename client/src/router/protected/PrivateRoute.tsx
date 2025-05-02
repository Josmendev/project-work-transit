import { Navigate, Outlet } from "react-router";
import { BASE_ROUTES } from "../../shared/utils/constants";

export const PrivateRoute = () => {
  // const { user } = useContext(AuthContext);
  // const logged = user?.token;
  const logged = true;
  return logged ? <Outlet /> : <Navigate to={BASE_ROUTES.PUBLIC.LOGIN} replace />;
};
