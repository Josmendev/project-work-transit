import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { StopResponse, UpsertStop } from "../types/Stop";
import { ENDPOINT_STOP } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const UpdateStopService = async ({
  stop,
  stopId,
}: {
  stop: UpsertStop;
  stopId: number;
}): Promise<StopResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_STOP}/${stopId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(stop),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: StopResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
