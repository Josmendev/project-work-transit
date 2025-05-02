import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { deleteStaff } from "../repositories/staffRepository";
import type { StaffResponse } from "../types/Staff";

interface DeleteStaffProps {
  queryKey: QueryKey;
  onSuccess?: (totalPages?: number) => void;
}

export const useDeleteStaff = ({ queryKey, onSuccess }: DeleteStaffProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStaff,
    onMutate: async (deletedStaff) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      if (!previousData) return;

      queryClient.setQueryData(queryKey, (oldData?: DataResponseFromAPI<StaffResponse>) => {
        if (!oldData) return deletedStaff;
        const filteredData = oldData.data.filter((staff) => staff.staffId !== deletedStaff.staffId);

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
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      if (updatedQuery && updatedQuery.page > 0 && updatedQuery?.totalPages > 0) {
        const { page, totalPages } = updatedQuery;
        onSuccess?.(page > totalPages ? updatedQuery?.totalPages : page);
      }
    },
  });
};
