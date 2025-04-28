export interface Role {
  roleId: number;
  description: string;
  isActive?: boolean;
}

export type RoleResponse = Role;
export type UpsertRole = Pick<Role, "description">;

export type UpdateRoleSelected = {
  selectedRole: Role | null;
  clearSelectedRole: () => void;
};

export interface UserHasRoles {
  userId: number;
  roleId: number;
}
