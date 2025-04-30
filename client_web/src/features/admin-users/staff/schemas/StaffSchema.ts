import { z } from "zod";
import {
  DNISchema,
  EmailSchema,
  FullNameSchema,
  PhoneSchema,
  StringToLabelSchema,
} from "../../../../shared/schemas/commonSchemas";

export const getStaffSchema = () =>
  z.object({
    identityDocumentNumber: DNISchema,
    name: FullNameSchema,
    paternalSurname: StringToLabelSchema("apellido paterno"),
    maternalSurname: StringToLabelSchema("apellido materno"),
    telephone: PhoneSchema,
    email: EmailSchema,
  });
