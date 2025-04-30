import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initialListOfResponseAPI } from "../../../../shared/utils/constants";
import {
  activateConnectionPoint,
  createConnectionPoint,
  deleteConnectionPoint,
  getConnectionPoint,
  updateConnectionPoint,
} from "../repositories/connectionPointRepository";

export const useConnectionPoint = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ["connection-points", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getConnectionPoint({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateConnectionPointMutation = useMutation({
    mutationFn: createConnectionPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleUpdateConnectionPointMutation = useMutation({
    mutationFn: updateConnectionPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDeleteConnectionPointMutation = useMutation({
    mutationFn: deleteConnectionPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleActivateConnectionPointMutation = useMutation({
    mutationFn: activateConnectionPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    handleCreateConnectionPointMutation,
    handleUpdateConnectionPointMutation,
    handleDeleteConnectionPointMutation,
    handleActivateConnectionPointMutation,
  };
};
