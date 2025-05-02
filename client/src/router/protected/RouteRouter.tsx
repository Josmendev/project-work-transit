import { Navigate, Route, Routes } from "react-router";
import { AdminRouteRoutes } from "../../features/admin-routes/route/routes/AdminRouteRoutes";
import { ZoneRoutes } from "../../features/admin-routes/zone/routes/ZoneRoutes";
import { ADMIN_ROUTE_ROUTES, BASE_ROUTES } from "../../shared/utils/constants";

export const RouteRouter = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTE_ROUTES.ROUTE + "/*"} element={<AdminRouteRoutes />} />
      <Route path={ADMIN_ROUTE_ROUTES.ZONE + "/*"} element={<ZoneRoutes />} />
      {/* Ruta comodín para URLs no reconocidas */}
      <Route path="*" element={<Navigate to={"/" + BASE_ROUTES.PRIVATE.DASHBOARD} replace />} />
    </Routes>
  );
};
