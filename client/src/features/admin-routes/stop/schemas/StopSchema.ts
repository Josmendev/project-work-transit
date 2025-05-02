import { z } from "zod";
import { StopSchema, ZoneSchema } from "../../../../shared/schemas/commonSchemas";

export const getStopSchema = () =>
  z.object({
    direction: StopSchema,
    zone: ZoneSchema,
  });
