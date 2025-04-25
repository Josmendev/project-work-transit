import { Navigate, Route, Routes } from "react-router";
import { ADMIN_USERS_ROUTES, BASE_ROUTES, CRUD_ROUTES } from "../../../../shared/utils/constants";
import { UserEditPage } from "../pages/UserEditPage";
import { UserListPage } from "../pages/UserListPage";

export const UserRoutes: React.FC = () => {
  const ROUTE_INITIAL = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.USERS}`;

  return (
    <>
      <Routes>
        <Route index element={<UserListPage />} />
        <Route path={CRUD_ROUTES.LIST} element={<UserListPage />} />
        <Route path={CRUD_ROUTES.EDIT} element={<UserEditPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INITIAL} replace />} />
      </Routes>
    </>
  );
};
