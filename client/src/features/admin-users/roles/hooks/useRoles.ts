import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initialListOfResponseAPI } from "../../../../shared/utils/constants";
import {
  activateRole,
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../repositories/roleRepository";

export const useRoles = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ["roles", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getRoles({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateRoleMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleUpdateRoleMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDeleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleActivateRoleMutation = useMutation({
    mutationFn: activateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    handleCreateRoleMutation,
    handleUpdateRoleMutation,
    handleDeleteRoleMutation,
    handleActivateRoleMutation,
  };
};
