import { z } from "zod";
import { RouteSchema, StringToLabelSchema } from "../../../../shared/schemas/commonSchemas";

export const getRouteSchema = () =>
  z.object({
    routeNumber: RouteSchema,
    origin: StringToLabelSchema("origen"),
    destination: StringToLabelSchema("destino"),
  });
