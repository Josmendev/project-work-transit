import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ADMIN_ROUTE_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { PointConnectionListPage } from "../pages/PointConnectionListPage";

export const ConnectionPointRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_ROUTE_ROUTES.CONNECTION_POINTS}`;

  return (
    <>
      <Routes>
        <Route index element={<PointConnectionListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<PointConnectionListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
