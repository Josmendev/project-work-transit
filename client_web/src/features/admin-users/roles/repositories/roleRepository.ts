import { ActivateRoleService } from "../services/ActivateRoleService";
import { CreateRoleService } from "../services/CreateRoleService";
import { DeleteRoleService } from "../services/DeleteRoleService";
import { ListRolesService } from "../services/ListRolesService";
import { SearchRolesService } from "../services/SearchRolesService";
import { UpdateRoleService } from "../services/UpdateRoleService";
import type { CreateRole, UpdateRole } from "../types/Role";

//Funcion para agregar
export const createRole = async ({ role }: { role: CreateRole }) => {
  const newRole = await CreateRoleService({ role });
  return newRole;
};

// Funcion para obtener y buscar
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

// Funcion para actualizar
export const updateRole = async ({ role, roleId }: { role: UpdateRole; roleId: number }) => {
  const updatedRole = await UpdateRoleService({ role, roleId });
  return updatedRole;
};

// Funcion para eliminar
export const deleteRole = async ({ roleId }: { roleId: number }) => {
  await DeleteRoleService({ roleId });
};

// Funcion para activar
export const activateRole = async ({ roleId }: { roleId: number }) => {
  await ActivateRoleService({ roleId });
};
