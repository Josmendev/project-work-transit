import { ActivateRouteService } from "../services/ActivateRouteService";
import { CreateRouteService } from "../services/CreateRouteService";
import { DeleteRouteService } from "../services/DeleteRouteService";
import { ListRouteService } from "../services/ListRouteService";
import { SearchRouteService } from "../services/SearchRouteService";
import { UpdateRouteService } from "../services/UpdateRouteService";
import type { UpsertRoute } from "../types/Route";

//Funcion para agregar
export const createRoute = async ({ route }: { route: UpsertRoute }) => {
  const newRoute = await CreateRouteService({ route });
  return newRoute;
};

// Funcion para obtener y buscar
export const getRoute = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchRouteService({ limit, page, query }) : ListRouteService({ limit, page });
};

// Funcion para actualizar
export const updateRoute = async ({ route, routeId }: { route: UpsertRoute; routeId: number }) => {
  const updatedRoute = await UpdateRouteService({ route, routeId });
  return updatedRoute;
};

// Funcion para eliminar
export const deleteRoute = async ({ routeId }: { routeId: number }) => {
  await DeleteRouteService({ routeId });
};

// Funcion para activar
export const activateRoute = async ({ routeId }: { routeId: number }) => {
  await ActivateRouteService({ routeId });
};
