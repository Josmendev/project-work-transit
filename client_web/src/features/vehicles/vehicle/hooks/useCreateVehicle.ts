import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { LIMIT_PAGE } from "../../../../shared/utils/constants";
import { createVehicle } from "../repositories/vehicleRepository";
import type { VehicleResponse } from "../types/Vehicle";

interface CreateVehicleProps {
  queryKey: QueryKey;
  onSuccess?: (totalPages?: number) => void;
}

export const useCreateVehicle = ({ queryKey, onSuccess }: CreateVehicleProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onMutate: async ({ vehicle }) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      if (!previousData) return;

      // Calculo optimistamente el nuevo totalPages
      const updatedDataCount = previousData.data.length + 1;
      const limitForPage = previousData.limit ?? LIMIT_PAGE;
      const mustIncrementTotalPages = updatedDataCount > limitForPage;
      const newTotalPages = mustIncrementTotalPages
        ? previousData.totalPages + 1
        : previousData.totalPages;

      queryClient.setQueryData(queryKey, (oldData: DataResponseFromAPI<VehicleResponse>) => ({
        ...oldData,
        data: [...oldData.data, vehicle],
        totalPages: newTotalPages,
      }));

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      onSuccess?.(updatedQuery?.totalPages);
    },
  });
};
