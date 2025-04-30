export interface Role {
  roleId: number;
  description: string;
  isActive: boolean;
}

export type CreateRole = Pick<Role, "description">;
export type UpdateRole = CreateRole;

export type RoleResponse = Role;

export type UpdateRoleSelected = {
  selectedRole: RoleResponse | null;
  clearSelectedRole: () => void;
};
