import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BASE_ROUTES, CRUD_ROUTES, VEHICLES_ROUTES } from "../../../../shared/utils/constants";
import { ModelListPage } from "../pages/ModelListPage";

export const ModelRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${VEHICLES_ROUTES.MODEL}`;
  return (
    <>
      <Routes>
        <Route index element={<ModelListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<ModelListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
