import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initialListOfResponseAPI } from "../../../../shared/utils/constants";
import {
  activateModel,
  createModel,
  deleteModel,
  getModel,
  updateModel,
} from "../repositories/modelRepository";

export const useModel = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ["models", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getModel({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateModelMutation = useMutation({
    mutationFn: createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleUpdateModelMutation = useMutation({
    mutationFn: updateModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDeleteModelMutation = useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleActivateModelMutation = useMutation({
    mutationFn: activateModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    handleCreateModelMutation,
    handleUpdateModelMutation,
    handleDeleteModelMutation,
    handleActivateModelMutation,
  };
};
