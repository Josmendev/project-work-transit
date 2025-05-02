import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  BASE_ROUTES,
  initialListOfResponseAPI,
  VEHICLES_ROUTES,
} from "../../../../shared/utils/constants";
import { getVehicle } from "../repositories/vehicleRepository";
import { useActivateVehicle } from "./useActivateVehicle";
import { useCreateVehicle } from "./useCreateVehicle";
import { useDeleteVehicle } from "./useDeleteVehicle";
import { useUpdateVehicle } from "./useUpdateVehicle";

export const useVehicle = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const navigate = useNavigate();
  const MAIN_ROUTE = `/${BASE_ROUTES.PRIVATE.ADMIN}/${VEHICLES_ROUTES.VEHICLE}`;
  const vehicleQueryKey = ["vehicles", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: vehicleQueryKey,
    queryFn: () => getVehicle({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateVehicleMutation = useCreateVehicle({
    queryKey: vehicleQueryKey,
    onSuccess: (newPage) => {
      navigate(`${MAIN_ROUTE}?page=${newPage}`);
    },
  });

  const handleActivateVehicleMutation = useActivateVehicle({
    queryKey: vehicleQueryKey,
    onSuccess: (newPage) => {
      navigate(`${MAIN_ROUTE}?page=${newPage}`);
    },
  });

  const handleUpdateVehicleMutation = useUpdateVehicle({
    queryKey: vehicleQueryKey,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const handleDeleteVehicleMutation = useDeleteVehicle({
    queryKey: vehicleQueryKey,
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
    handleCreateVehicleMutation,
    handleUpdateVehicleMutation,
    handleDeleteVehicleMutation,
    handleActivateVehicleMutation,
  };
};
