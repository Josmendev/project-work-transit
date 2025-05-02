import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ADMIN_ROUTE_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { ZoneListPage } from "../pages/RouteListPage";

export const ZoneRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_ROUTE_ROUTES.ZONE}`;

  return (
    <>
      <Routes>
        <Route index element={<ZoneListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<ZoneListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
