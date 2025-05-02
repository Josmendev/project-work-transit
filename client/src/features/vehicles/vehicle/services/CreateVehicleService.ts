import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UpsertVehicle, VehicleResponse } from "../types/Vehicle";
import { ENDPOINT_VEHICLE } from "../utils/endpoints";

// Creo la funcion createVehicle que se conecta a la API del backend
export const CreateVehicleService = async ({
  vehicle,
}: {
  vehicle: UpsertVehicle;
}): Promise<VehicleResponse | { DNI: string; message: string; vehicleId?: number }> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_VEHICLE}`, {
      method: "POST",
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
