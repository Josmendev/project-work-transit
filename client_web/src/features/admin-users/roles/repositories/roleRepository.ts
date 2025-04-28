import { ActivateRoleService } from "../services/ActivateRoleService";
import { CreateRoleService } from "../services/CreateRoleService";
import { DeleteRoleService } from "../services/DeleteRoleService";
import { ListRolesService } from "../services/ListRolesService";
import { SearchRolesService } from "../services/SearchRolesService";
import { UpdateRoleService } from "../services/UpdateRoleService";
import type { UpsertRole } from "../types/Role";

//Funcion para agregar rol
export const createRole = async ({ role }: { role: UpsertRole }) => {
  const newRole = await CreateRoleService({ role });
  return newRole;
};

// Funcion para obtener y buscar todos los roles
export const getRoles = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchRolesService({ limit, page, query }) : ListRolesService({ limit, page });
};

// Funcion para actualizar un rol
export const updateRole = async ({ role, roleId }: { role: UpsertRole; roleId: number }) => {
  const updatedRole = await UpdateRoleService({ role, roleId });
  return updatedRole;
};

// Funcion para eliminar un rol
export const deleteRole = async ({ roleId }: { roleId: number }) => {
  await DeleteRoleService({ roleId });
};

// Funcion para activar un rol
export const activateRole = async ({ roleId }: { roleId: number }) => {
  await ActivateRoleService({ roleId });
};
