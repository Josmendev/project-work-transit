import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UpsertZone, ZoneResponse } from "../types/Zone";
import { ENDPOINT_ZONE } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const CreateZoneService = async ({ zone }: { zone: UpsertZone }): Promise<ZoneResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_ZONE}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(zone),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: ZoneResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
