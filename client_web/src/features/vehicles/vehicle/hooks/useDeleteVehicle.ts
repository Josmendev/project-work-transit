import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { deleteVehicle } from "../repositories/vehicleRepository";
import type { VehicleResponse } from "../types/Vehicle";

interface DeleteVehicleProps {
  queryKey: QueryKey;
  onSuccess?: (totalPages?: number) => void;
}

export const useDeleteVehicle = ({ queryKey, onSuccess }: DeleteVehicleProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    onMutate: async (deletedVehicle) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      if (!previousData) return;

      queryClient.setQueryData(queryKey, (oldData?: DataResponseFromAPI<VehicleResponse>) => {
        if (!oldData) return deletedVehicle;
        const filteredData = oldData.data.filter(
          (vehicle) => vehicle.vehicleId !== deletedVehicle.vehicleId
        );

        // Calculo optimistamente el nuevo totalPages
        const updatedDataCount = previousData.data.length - 1;
        const mustIncrementTotalPages = updatedDataCount <= 0;
        const newTotalPages = mustIncrementTotalPages
          ? previousData.totalPages - 1
          : previousData.totalPages;

        return {
          ...oldData,
          data: filteredData,
          totalPages: newTotalPages,
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      if (updatedQuery && updatedQuery.page > 0 && updatedQuery?.totalPages > 0) {
        const { page, totalPages } = updatedQuery;
        onSuccess?.(page > totalPages ? updatedQuery?.totalPages : page);
      }
    },
  });
};
