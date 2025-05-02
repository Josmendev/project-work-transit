import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { useValidationParamsInUpdate } from "../../../../shared/hooks/useValidationParamsInUpdate";
import type { StaffResponse } from "../types/Staff";
import { useStaff } from "./useStaff";

export const useStaffManagement = () => {
  // 📌 Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentPage: pageOfPagination,
    searchQuery,
    handlePageChange,
    handleSearch,
  } = usePagination();
  const currentPage = location.state?.pageOfStaff ?? pageOfPagination ?? 1;

  const { handleDeleteStaffMutation, MAIN_ROUTE } = useStaff({
    currentPage,
    searchQuery,
  });

  // 📌 Validaciones antes del renderizado (edit)
  const isUpdating = location.pathname.includes("/edit");
  const isValidateParams = useValidationParamsInUpdate(MAIN_ROUTE);
  const shouldRedirect = isUpdating && !isValidateParams;

  const handleUpdateStaffInRow = useCallback(
    (data: StaffResponse) => {
      if (!data?.staffId) return;
      navigate(`${MAIN_ROUTE}/${data.staffId}/edit`, {
        state: { staff: data, pageOfStaff: currentPage },
      });
    },
    [navigate, MAIN_ROUTE, currentPage]
  );

  const handleDeleteStaffInRow = useCallback(
    async (data: StaffResponse) => {
      if (!data?.staffId) return;
      await handleDeleteStaffMutation.mutateAsync({ staffId: data.staffId });
    },
    [handleDeleteStaffMutation]
  );

  const handleCreateStaff = useCallback(() => {
    navigate(`${MAIN_ROUTE}/add`, { state: { pageOfStaff: currentPage } });
  }, [navigate, MAIN_ROUTE, currentPage]);

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    MAIN_ROUTE,
    handleCreateStaff,
    handleUpdateStaffInRow,
    handleDeleteStaffInRow,
    shouldRedirect,
  };
};
