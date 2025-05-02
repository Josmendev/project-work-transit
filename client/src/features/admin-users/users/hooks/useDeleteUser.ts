import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import type { User, UserResponse } from "../../../auth/types/User";
import { deleteUser } from "../repositories/userRepository";

interface DeleteUserProps {
  queryKey: QueryKey;
  onSuccess?: (totalPages?: number) => void;
}

export const useDeleteUser = ({ queryKey, onSuccess }: DeleteUserProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedUser) => {
      const previousData = queryClient.getQueryData<DataResponseFromAPI<UserResponse>>(queryKey);
      if (!previousData) return;

      queryClient.setQueryData(queryKey, (oldData?: DataResponseFromAPI<UserResponse>) => {
        if (!oldData) return deletedUser;
        const filteredData = oldData.data.filter((user) => user.userId !== deletedUser.userId);

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
      const updatedQuery = queryClient.getQueryData<DataResponseFromAPI<User>>(queryKey);
      if (updatedQuery && updatedQuery.page > 0 && updatedQuery?.totalPages > 0) {
        const { page, totalPages } = updatedQuery;
        onSuccess?.(page > totalPages ? updatedQuery?.totalPages : page);
      }
    },
  });
};
