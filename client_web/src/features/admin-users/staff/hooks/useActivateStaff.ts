import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { activateStaff } from "../repositories/staffRepository";
import type { StaffResponse } from "../types/Staff";

interface ActivateStaffProps {
  queryKey: QueryKey;
  onSuccess?: (newPage: number) => void;
}

export const useActivateStaff = ({ queryKey, onSuccess }: ActivateStaffProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateStaff,
    onError: (error) => {
      console.error("Error activando staff:", error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      onSuccess?.(updatedQuery ? updatedQuery.totalPages : 1);
    },
  });
};
