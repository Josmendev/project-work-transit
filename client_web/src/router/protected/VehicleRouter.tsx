import { Navigate, Route, Routes } from "react-router";
import { BrandRoutes } from "../../features/vehicles/brand/routes/BrandRoutes";
import { ModelRoutes } from "../../features/vehicles/model/routes/ModelRoutes";
import { VehicleRoutes } from "../../features/vehicles/vehicle/routes/VehicleRoutes";
import { BASE_ROUTES, VEHICLES_ROUTES } from "../../shared/utils/constants";

export const VehicleRouter = () => {
  return (
    <Routes>
      <Route path={VEHICLES_ROUTES.BRAND + "/*"} element={<BrandRoutes />} />
      <Route path={VEHICLES_ROUTES.MODEL + "/*"} element={<ModelRoutes />} />
      <Route path={VEHICLES_ROUTES.VEHICLE + "/*"} element={<VehicleRoutes />} />
      {/* Ruta comodín para URLs no reconocidas */}
      <Route path="*" element={<Navigate to={"/" + BASE_ROUTES.PRIVATE.DASHBOARD} replace />} />
    </Routes>
  );
};
