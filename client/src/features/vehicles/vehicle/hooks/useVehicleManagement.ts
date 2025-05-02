import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { useValidationParamsInUpdate } from "../../../../shared/hooks/useValidationParamsInUpdate";
import type { VehicleResponse } from "../types/Vehicle";
import { useVehicle } from "./useVehicle";

export const useVehicleManagement = () => {
  // 📌 Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentPage: pageOfPagination,
    searchQuery,
    handlePageChange,
    handleSearch,
  } = usePagination();
  const currentPage = location.state?.pageOfVehicle ?? pageOfPagination ?? 1;

  const { handleDeleteVehicleMutation, handleActivateVehicleMutation, MAIN_ROUTE } = useVehicle({
    currentPage,
    searchQuery,
  });

  // 📌 Validaciones antes del renderizado (edit)
  const isUpdating = location.pathname.includes("/edit");
  const isValidateParams = useValidationParamsInUpdate(MAIN_ROUTE);
  const shouldRedirect = isUpdating && !isValidateParams;

  const handleUpdateVehicleInRow = useCallback(
    (data: VehicleResponse) => {
      if (!data?.vehicleId) return;
      navigate(`${MAIN_ROUTE}/${data.vehicleId}/edit`, {
        state: { vehicle: data, pageOfVehicle: currentPage },
      });
    },
    [navigate, MAIN_ROUTE, currentPage]
  );

  const handleDeleteVehicleInRow = useCallback(
    async (data: VehicleResponse) => {
      if (!data?.vehicleId) return;
      await handleDeleteVehicleMutation.mutateAsync({ vehicleId: data.vehicleId });
    },
    [handleDeleteVehicleMutation]
  );

  const handleActivateVehicleInRow = useCallback(
    async (data: VehicleResponse) => {
      if (!data?.vehicleId) return;
      await handleActivateVehicleMutation.mutateAsync({ vehicleId: data.vehicleId });
    },
    [handleActivateVehicleMutation]
  );

  const handleCreateVehicle = useCallback(() => {
    navigate(`${MAIN_ROUTE}/add`, { state: { pageOfVehicle: currentPage } });
  }, [navigate, MAIN_ROUTE, currentPage]);

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    MAIN_ROUTE,
    handleCreateVehicle,
    handleUpdateVehicleInRow,
    handleDeleteVehicleInRow,
    handleActivateVehicleInRow,
    shouldRedirect,
  };
};
