import { z } from "zod";
import { EmailSchema } from "../../../shared/schemas/commonSchemas";

export const getRequestResetPasswordSchema = () => z.object({ email: EmailSchema });
