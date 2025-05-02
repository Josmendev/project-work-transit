import type { User } from "../../features/auth/types/User";

// Rol viene asi en endpoints: "Admin" o "1", para este caso lo uso como descripcion.
export const getRolesOfUser = (user: User | null) => {
  if (!user) return;
  return "Administrador";
};
