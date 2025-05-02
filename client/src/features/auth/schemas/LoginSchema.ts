import { z } from "zod";
import {
  PasswordSchema,
  SecurePasswordSchema,
  UsernameSchema,
} from "../../../shared/schemas/commonSchemas";

export const getLoginSchema = (isConfirm: boolean) =>
  z
    .object({
      username: UsernameSchema,
      password: PasswordSchema,
    })
    .superRefine((data, ctx) => {
      if (isConfirm) {
        const passwordValidation = SecurePasswordSchema.safeParse(data.password);
        if (!passwordValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "La contraseña debe tener al menos una mayúscula y un número",
          });
        }
      }
    });
