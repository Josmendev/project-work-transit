import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { updateVehicle } from "../repositories/vehicleRepository";
import type { VehicleResponse } from "../types/Vehicle";

interface UpdateVehicleProps {
  queryKey: QueryKey;
  onSuccess?: () => void;
}

export const useUpdateVehicle = ({ queryKey, onSuccess }: UpdateVehicleProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicle,
    onMutate: async ({ vehicle, vehicleId }) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<VehicleResponse>>(queryKey);
      if (!previousData) return;

      queryClient.setQueryData(queryKey, (oldVehicle: DataResponseFromAPI<VehicleResponse>) =>
        oldVehicle.data.map((currentVehicle) =>
          currentVehicle.vehicleId === vehicleId
            ? { ...currentVehicle, ...vehicle }
            : currentVehicle
        )
      );

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      onSuccess?.();
    },
  });
};
