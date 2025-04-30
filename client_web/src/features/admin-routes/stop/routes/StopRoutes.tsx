import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ADMIN_ROUTE_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { StopListPage } from "../pages/StopListPage";

export const StopRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_ROUTE_ROUTES.STOP}`;

  return (
    <>
      <Routes>
        <Route index element={<StopListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<StopListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
