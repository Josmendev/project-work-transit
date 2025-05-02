import { z } from "zod";
import { BrandSchema } from "../../../../shared/schemas/commonSchemas";

export const getBrandSchema = () => z.object({ description: BrandSchema });
