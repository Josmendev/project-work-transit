import { ActivateStopService } from "../services/ActivateStopService";
import { CreateStopService } from "../services/CreateStopService";
import { DeleteStopService } from "../services/DeleteStopService";
import { ListStopService } from "../services/ListStopService";
import { SearchStopService } from "../services/SearchStopService";
import { UpdateStopService } from "../services/UpdateStopService";
import type { UpsertStop } from "../types/Stop";

//Funcion para agregar
export const createStop = async ({ stop }: { stop: UpsertStop }) => {
  const newStop = await CreateStopService({ stop });
  return newStop;
};

// Funcion para obtener y buscar
export const getStops = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchStopService({ limit, page, query }) : ListStopService({ limit, page });
};

// Funcion para actualizar
export const updateStop = async ({ stop, stopId }: { stop: UpsertStop; stopId: number }) => {
  const updatedStop = await UpdateStopService({ stop, stopId });
  return updatedStop;
};

// Funcion para eliminar
export const deleteStop = async ({ stopId }: { stopId: number }) => {
  await DeleteStopService({ stopId });
};

// Funcion para activar
export const activateStop = async ({ stopId }: { stopId: number }) => {
  await ActivateStopService({ stopId });
};
