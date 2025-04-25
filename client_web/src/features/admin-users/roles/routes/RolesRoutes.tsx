import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ADMIN_USERS_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { RoleListPage } from "../pages/RoleListPage";

export const RoleRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.ROLES}`;
  return (
    <>
      <Routes>
        <Route index element={<RoleListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<RoleListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
