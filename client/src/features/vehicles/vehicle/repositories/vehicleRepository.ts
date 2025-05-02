import { ActivateVehicleService } from "../services/ActivateVehicleService";
import { CreateVehicleService } from "../services/CreateVehicleService";
import { DeleteVehicleService } from "../services/DeleteVehicleService";
import { ListVehiclesService } from "../services/ListVehicleService";
import { SearchVehicleService } from "../services/SearchVehicleService";
import { UpdateVehicleService } from "../services/UpdateVehicleService";
import type { UpsertVehicle } from "../types/Vehicle";

//Funcion para agregar Vehicle
export const createVehicle = async ({ vehicle }: { vehicle: UpsertVehicle }) => {
  const response = await CreateVehicleService({ vehicle });
  return response;
};

// Funcion para obtener y buscar vehicle
export const getVehicle = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query
    ? SearchVehicleService({ limit, page, query })
    : ListVehiclesService({ limit, page });
};

// Funcion para actualizar un vehicle
export const updateVehicle = async ({
  vehicle,
  vehicleId,
}: {
  vehicle: UpsertVehicle;
  vehicleId: number;
}) => {
  const updatedVehicle = await UpdateVehicleService({ vehicle, vehicleId });
  return updatedVehicle;
};

// Funcion para eliminar un vehicle
export const deleteVehicle = async ({ vehicleId }: { vehicleId: number }) => {
  await DeleteVehicleService({ vehicleId });
};

// Funcion para activar un vehicle
export const activateVehicle = async ({ vehicleId }: { vehicleId: number }) => {
  await ActivateVehicleService({ vehicleId });
};
