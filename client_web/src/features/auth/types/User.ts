import type { ROLES_KEYS, ROLES_VALUES } from "../../../shared/utils/constants";

export interface User {
  userId: number;
  username: string;
  isConfirm: boolean;
  isActive: boolean;
  staffId: number;
  staff: string;
  roles: Array<ROLES_KEYS> | Array<ROLES_VALUES>;
}

export interface UpdateUser {
  rolesIds: Array<number>;
}

export type UserResponse = User;
