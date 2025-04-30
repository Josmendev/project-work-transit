import { z } from "zod";
import { ConnectionPointSchema } from "../../../../shared/schemas/commonSchemas";

export const getConnectionPointSchema = () => z.object({ description: ConnectionPointSchema });
