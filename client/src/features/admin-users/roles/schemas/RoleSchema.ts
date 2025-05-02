import { z } from "zod";

export const RoleSchema = z
  .string()
  .nonempty("El rol no puede ser un campo vacío")
  .min(4, "El rol debe tener al menos 4 caracteres")
  .max(20, "El rol debe tener como máximo 20 caracteres");

export const getRoleSchema = () => z.object({ description: RoleSchema });
