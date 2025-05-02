import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { updateStaff } from "../repositories/staffRepository";
import type { StaffResponse } from "../types/Staff";

interface UpdateStaffProps {
  queryKey: QueryKey;
  onSuccess?: () => void;
}

export const useUpdateStaff = ({ queryKey, onSuccess }: UpdateStaffProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaff,
    onMutate: async ({ staff, staffId }) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      if (!previousData) return;

      queryClient.setQueryData(queryKey, (oldStaff: DataResponseFromAPI<StaffResponse>) =>
        oldStaff.data.map((currentStaff) =>
          currentStaff.staffId === staffId ? { ...currentStaff, ...staff } : currentStaff
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
