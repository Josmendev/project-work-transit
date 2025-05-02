import type { UpdateUser, UserResponse } from "../../../auth/types/User";
import { ActivateUserService } from "../services/ActivateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { ListOfUsersService } from "../services/ListOfUsersService";
import { SearchUsersService } from "../services/SearchUsersService";
import { UpdateUserService } from "../services/UpdateUserService";

// Funcion para obtener y buscar
export const getUsers = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchUsersService({ limit, page, query }) : ListOfUsersService({ limit, page });
};

// Funcion para editar
export const updateUser = async ({
  user,
  userId,
}: {
  user: UpdateUser;
  userId: number;
}): Promise<UserResponse> => {
  const updateUser = await UpdateUserService({ user, userId });
  return updateUser;
};

// Funcion para eliminar
export const deleteUser = async ({ userId }: { userId: number }) => {
  await DeleteUserService({ userId });
};

// Funcion para activar
export const activateUser = async ({ userId }: { userId: number }) => {
  await ActivateUserService({ userId });
};
