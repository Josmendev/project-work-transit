import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ADMIN_ROUTE_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { RouteListPage } from "../pages/RouteListPage";

export const AdminRouteRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_ROUTE_ROUTES.ROUTE}`;

  return (
    <>
      <Routes>
        <Route index element={<RouteListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<RouteListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
