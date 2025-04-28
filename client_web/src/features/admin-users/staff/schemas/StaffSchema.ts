import { z } from "zod";
import {
  DNISchema,
  EmailSchema,
  FullNameSchema,
  LastNameSchema,
  PhoneSchema,
} from "../../../../shared/schemas/commonSchemas";

export const getStaffSchema = () =>
  z.object({
    identityDocumentNumber: DNISchema,
    name: FullNameSchema,
    paternalSurname: LastNameSchema("apellido paterno"),
    maternalSurname: LastNameSchema("apellido materno"),
    phone: PhoneSchema,
    email: EmailSchema,
  });
