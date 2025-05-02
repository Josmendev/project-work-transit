import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  ADMIN_USERS_ROUTES,
  BASE_ROUTES,
  initialListOfResponseAPI,
} from "../../../../shared/utils/constants";
import { getStaffs } from "../repositories/staffRepository";
import { useActivateStaff } from "./useActivateStaff";
import { useCreateStaff } from "./useCreateStaff";
import { useDeleteStaff } from "./useDeleteStaff";
import { useUpdateStaff } from "./useUpdateStaff";

export const useStaff = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const navigate = useNavigate();
  const MAIN_ROUTE = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.STAFF}`;
  const staffQueryKey = ["staffs", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: staffQueryKey,
    queryFn: () => getStaffs({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateStaffMutation = useCreateStaff({
    queryKey: staffQueryKey,
    onSuccess: (response, newPage) => {
      if (response && !("DNI" in response)) {
        navigate(`${MAIN_ROUTE}?page=${newPage}`);
      }
    },
  });

  const handleActivateStaffMutation = useActivateStaff({
    queryKey: staffQueryKey,
    onSuccess: (newPage) => {
      navigate(`${MAIN_ROUTE}?page=${newPage}`);
    },
  });

  const handleUpdateStaffMutation = useUpdateStaff({
    queryKey: staffQueryKey,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const handleDeleteStaffMutation = useDeleteStaff({
    queryKey: staffQueryKey,
    onSuccess: (newPage) => {
      navigate(`${MAIN_ROUTE}?page=${newPage}`);
    },
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    currentPage,
    MAIN_ROUTE,
    handleCreateStaffMutation,
    handleUpdateStaffMutation,
    handleDeleteStaffMutation,
    handleActivateStaffMutation,
  };
};
