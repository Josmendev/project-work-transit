import { ActivateZoneService } from "../services/ActivateZoneService";
import { CreateZoneService } from "../services/CreateZoneService";
import { DeleteZoneService } from "../services/DeleteZoneService";
import { ListZoneService } from "../services/ListzONeService";
import { SearchZoneService } from "../services/SearchZoneService";
import { UpdateZoneService } from "../services/UpdateZoneService";
import type { UpsertZone } from "../types/Zone";

//Funcion para agregar
export const createZone = async ({ zone }: { zone: UpsertZone }) => {
  const newZone = await CreateZoneService({ zone });
  return newZone;
};

// Funcion para obtener y buscar
export const getZone = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchZoneService({ limit, page, query }) : ListZoneService({ limit, page });
};

// Funcion para actualizar
export const updateZone = async ({ zone, zoneId }: { zone: UpsertZone; zoneId: number }) => {
  const updatedZone = await UpdateZoneService({ zone, zoneId });
  return updatedZone;
};

// Funcion para eliminar
export const deleteZone = async ({ zoneId }: { zoneId: number }) => {
  await DeleteZoneService({ zoneId });
};

// Funcion para activar
export const activateZone = async ({ zoneId }: { zoneId: number }) => {
  await ActivateZoneService({ zoneId });
};
