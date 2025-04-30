import { ActivateConnectionPointService } from "../services/ActivateConnectionPointService";
import { CreateConnectionPointService } from "../services/CreateConnectionPointService";
import { DeleteConnectionPointService } from "../services/DeleteConnectionPointService";
import { ListConnectionPointService } from "../services/ListConnectionPointService";
import { SearchConnectionPointService } from "../services/SearchConnectionPointService";
import { UpdateConnectionPointService } from "../services/UpdateConnectionPointService";
import type { UpsertConnectionPoint } from "../types/ConnectionPoint";

//Funcion para agregar
export const createConnectionPoint = async ({
  connectionPoint,
}: {
  connectionPoint: UpsertConnectionPoint;
}) => {
  const newConnectionPoint = await CreateConnectionPointService({ connectionPoint });
  return newConnectionPoint;
};

// Funcion para obtener y buscar
export const getConnectionPoint = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query
    ? SearchConnectionPointService({ limit, page, query })
    : ListConnectionPointService({ limit, page });
};

// Funcion para actualizar
export const updateConnectionPoint = async ({
  connectionPoint,
  connectionPointId,
}: {
  connectionPoint: UpsertConnectionPoint;
  connectionPointId: number;
}) => {
  const updatedConnectionPoint = await UpdateConnectionPointService({
    connectionPoint,
    connectionPointId,
  });
  return updatedConnectionPoint;
};

// Funcion para eliminar
export const deleteConnectionPoint = async ({
  connectionPointId,
}: {
  connectionPointId: number;
}) => {
  await DeleteConnectionPointService({ connectionPointId });
};

// Funcion para activar
export const activateConnectionPoint = async ({
  connectionPointId,
}: {
  connectionPointId: number;
}) => {
  await ActivateConnectionPointService({ connectionPointId });
};
