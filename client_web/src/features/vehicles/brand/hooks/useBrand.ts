import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initialListOfResponseAPI } from "../../../../shared/utils/constants";
import {
  activateBrand,
  createBrand,
  deleteBrand,
  getBrand,
  updateBrand,
} from "../repositories/brandRepository";

export const useBrand = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ["brands", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getBrand({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleCreateBrandMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleUpdateBrandMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDeleteBrandMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleActivateBrandMutation = useMutation({
    mutationFn: activateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    handleCreateBrandMutation,
    handleUpdateBrandMutation,
    handleDeleteBrandMutation,
    handleActivateBrandMutation,
  };
};
