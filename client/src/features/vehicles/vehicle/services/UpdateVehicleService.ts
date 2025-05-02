import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UpsertVehicle, VehicleResponse } from "../types/Vehicle";
import { ENDPOINT_VEHICLE } from "../utils/endpoints";

// Creo la funcion updateVehicle que se conecta a la API del backend
export const UpdateVehicleService = async ({
  vehicle,
  vehicleId,
}: {
  vehicle: UpsertVehicle;
  vehicleId: number;
}): Promise<VehicleResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_VEHICLE}/${vehicleId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(vehicle),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: VehicleResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
