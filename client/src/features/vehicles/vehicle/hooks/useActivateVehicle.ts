import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { activateVehicle } from "../repositories/vehicleRepository";
import type { VehicleResponse } from "../types/Vehicle";

interface ActivateVehicleProps {
  queryKey: QueryKey;
  onSuccess?: (newPage: number) => void;
}

export const useActivateVehicle = ({ queryKey, onSuccess }: ActivateVehicleProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateVehicle,
    onError: (error) => {
      console.error("Error activando Vehicle:", error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      onSuccess?.(updatedQuery ? updatedQuery.totalPages : 1);
    },
  });
};
