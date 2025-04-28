import { z } from "zod";
import { SecurePasswordSchema } from "../../../shared/schemas/commonSchemas";

export const ConfirmUserSchema = z
  .object({
    newPassword: SecurePasswordSchema,
    repeatPassword: SecurePasswordSchema,
  })
  .required()
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.repeatPassword) {
      ctx.addIssue({
        code: "custom", // Validación personalizada
        path: ["repeatPassword"], // Campo donde aparece el error
        message: "Las contraseñas no coinciden", // Mensaje de error
      });
    }
  });
