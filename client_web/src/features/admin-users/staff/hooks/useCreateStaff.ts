import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { LIMIT_PAGE } from "../../../../shared/utils/constants";
import { createStaff } from "../repositories/staffRepository";
import type { StaffResponse } from "../types/Staff";

interface CreateStaffProps {
  queryKey: QueryKey;
  onSuccess?: (totalPages?: number) => void;
}

export const useCreateStaff = ({ queryKey, onSuccess }: CreateStaffProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,
    onMutate: async ({ staff }) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      if (!previousData) return;

      // Staffid and isActive, son de prueba, es para mantener la estructura de StaffResponse.
      const newStaff = {
        staffId: Date.now(),
        isActive: true,
        person: staff,
      };

      // Calculo optimistamente el nuevo totalPages
      const updatedDataCount = previousData.data.length + 1;
      const limitForPage = previousData.limit ?? LIMIT_PAGE;
      const mustIncrementTotalPages = updatedDataCount > limitForPage;
      const newTotalPages = mustIncrementTotalPages
        ? previousData.totalPages + 1
        : previousData.totalPages;

      queryClient.setQueryData(queryKey, (oldData: DataResponseFromAPI<StaffResponse>) => ({
        ...oldData,
        data: [...oldData.data, newStaff],
        totalPages: newTotalPages,
      }));

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<StaffResponse>>(queryKey);
      onSuccess?.(updatedQuery?.totalPages);
    },
  });
};
