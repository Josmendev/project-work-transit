import { z } from "zod";
import { ModelSchema } from "../../../../shared/schemas/commonSchemas";

export const getModelSchema = () => z.object({ description: ModelSchema });
