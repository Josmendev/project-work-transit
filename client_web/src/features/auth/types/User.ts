import type { Person } from "../../../shared/types/Person";
import { ROLES_KEYS, ROLES_VALUES } from "./../../../shared/utils/constants";

export interface User {
  userId: number;
  username: string;
  isConfirm: boolean;
  isActive: boolean;
  person: Person;
  role: Array<ROLES_KEYS> | Array<ROLES_VALUES>;
}
