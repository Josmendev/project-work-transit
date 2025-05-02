import { z } from "zod";
import { ZoneSchema } from "../../../../shared/schemas/commonSchemas";

export const getZoneSchema = () => z.object({ description: ZoneSchema });
