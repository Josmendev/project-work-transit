import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { assignStaff } from "../repositories/staffRepository";
import type { StaffResponse } from "../types/Staff";

interface ActivateStaffProps {
  queryKey: QueryKey;
  onSuccess?: (newTotalPages?: number) => void;
}

export const useAssignStaff = ({ queryKey, onSuccess }: ActivateStaffProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignStaff,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      onSuccess?.(updatedQuery?.totalPages);
    },

    onError: (error) => {
      console.error("Error asignando staff:", error);
    },
  });
};
