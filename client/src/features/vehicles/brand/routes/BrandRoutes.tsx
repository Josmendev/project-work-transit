import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BASE_ROUTES, CRUD_ROUTES, VEHICLES_ROUTES } from "../../../../shared/utils/constants";
import { BrandListPage } from "../pages/BrandListPage";

export const BrandRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${VEHICLES_ROUTES.BRAND}`;
  return (
    <>
      <Routes>
        <Route index element={<BrandListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<BrandListPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
