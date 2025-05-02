import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUser } from "../repositories/userRepository";
import { initialListOfResponseAPI } from "./../../../../shared/utils/constants";

export const useUsers = ({
  currentPage,
  searchQuery = "",
}: {
  currentPage: number;
  searchQuery: string;
}) => {
  const queryClient = useQueryClient();
  // const { updateUserInSession } = useContext(AuthContext);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 1), exact: false });
      // updateUserInSession(updatedUser); Colocar el updateUser como parámetro de OnSuccess
    },
  });

  return {
    data,
    currentPage,
    isLoading,
    isError,
    error,
    handleUpdateUserMutation,
  };
};
