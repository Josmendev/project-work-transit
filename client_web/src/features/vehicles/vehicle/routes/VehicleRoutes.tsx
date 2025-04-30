import { Navigate, Route, Routes } from "react-router";
import { BASE_ROUTES, CRUD_ROUTES, VEHICLES_ROUTES } from "../../../../shared/utils/constants";
import { VehicleListPage } from "../pages/VehicleListPage";
import { VehicleUpsertPage } from "../pages/VehicleUpsertPage";

export const VehicleRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${VEHICLES_ROUTES.VEHICLE}`;

  return (
    <>
      <Routes>
        <Route index element={<VehicleListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<VehicleListPage />} />
        <Route path={CRUD_ROUTES.ADD} element={<VehicleUpsertPage />} />
        <Route path={CRUD_ROUTES.EDIT} element={<VehicleUpsertPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
