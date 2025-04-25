import type { User } from "../../features/auth/types/User";
import { ROLES_MAPPING } from "../utils/constants";

// Rol viene asi en endpoints: "Admin" o "1", para este caso lo uso como descripcion.
export const getRolesOfUser = (user: User | null) => {
  if (!user) return;
  const roles = (user?.role || []).map((r) => (typeof r === "number" ? ROLES_MAPPING[r] : r));
  return roles;
};
