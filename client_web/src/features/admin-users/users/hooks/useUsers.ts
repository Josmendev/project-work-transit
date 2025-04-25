import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../shared/contexts/AuthContext";
import { getUsers, updateUser } from "../repositories/userRepository";
import { ResetPasswordUserService } from "../services/ResetPasswordUserService";
import {
  ADMIN_USERS_ROUTES,
  BASE_ROUTES,
  initialListOfResponseAPI,
} from "./../../../../shared/utils/constants";
import { useDeleteUser } from "./useDeleteUser";

export const useUsers = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  const { updateUserInSession } = useContext(AuthContext);
  const navigate = useNavigate();
  const MAIN_ROUTE = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.USERS}`;
  const queryKey = ["users", currentPage, searchQuery];

  const {
    data = initialListOfResponseAPI,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getUsers({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const handleUpdateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      updateUserInSession(updatedUser);
    },
  });

  const handleDeleteUserMutation = useDeleteUser({
    queryKey: queryKey,
    onSuccess: (newPage) => {
      navigate(`${MAIN_ROUTE}?page=${newPage}`);
    },
  });

  const handleResetPasswordUserMutation = useMutation({
    mutationFn: ResetPasswordUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
    },
  });

  return {
    data,
    currentPage,
    isLoading,
    isError,
    error,
    handleUpdateUserMutation,
    handleDeleteUserMutation,
    handleResetPasswordUserMutation,
  };
};
