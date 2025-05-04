import { Navigate, Route, Routes } from "react-router";
import { ChangePasswordPage } from "../features/auth/pages/ChangePasswordPage";
import { ConfirmUserPage } from "../features/auth/pages/ConfirmUserPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RequestResetPasswordPage } from "../features/auth/pages/RequestResetPasswordPage";
import { ValidationPinPage } from "../features/auth/pages/ValidationPinPage";
import { DashBoardPage } from "../shared/pages/DashBoardPage";
import { BASE_ROUTES } from "../shared/utils/constants";
import { AdminRouter } from "./protected/AdminRouter";
import { PrivateRoute } from "./protected/PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { PRIVATE, PUBLIC } = BASE_ROUTES;

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={PUBLIC.HOME} element={<PublicRoute />}>
        <Route index element={<LoginPage />} />
        <Route path={PUBLIC.LOGIN} element={<LoginPage />} />
        <Route path={PUBLIC.CONFIRM_ACCOUNT} element={<ConfirmUserPage />} />
        <Route path={PUBLIC.REQUEST_RESET_PASSWORD} element={<RequestResetPasswordPage />} />
        <Route path={PUBLIC.VALIDATION_PIN} element={<ValidationPinPage />} />
        <Route path={PUBLIC.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
        {/* Ruta comodín para URLs no reconocidas */}
        <Route path="*" element={<Navigate to={"/" + PUBLIC.LOGIN} replace />} />
      </Route>

      {/* Rutas privadas */}
      <Route path="/*" element={<PrivateRoute />}>
        <Route path={PRIVATE.DASHBOARD} element={<DashBoardPage />} />
        <Route path={PRIVATE.ADMIN + "/*"} element={<AdminRouter />} />

        {/* Ruta comodín para URLs no reconocidas */}
        <Route path="*" element={<Navigate to={"/" + PRIVATE.DASHBOARD} replace />} />
      </Route>
    </Routes>
  );
};
