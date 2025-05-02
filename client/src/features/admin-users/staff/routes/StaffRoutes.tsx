import { Navigate, Route, Routes } from "react-router";
import { ADMIN_USERS_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { StaffListPage } from "../pages/StaffListPage";
import { StaffUpsertPage } from "../pages/StaffUpsertPage";

export const StaffRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.STAFF}`;

  return (
    <>
      <Routes>
        <Route index element={<StaffListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<StaffListPage />} />
        <Route path={CRUD_ROUTES.ADD} element={<StaffUpsertPage />} />
        <Route path={CRUD_ROUTES.EDIT} element={<StaffUpsertPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
