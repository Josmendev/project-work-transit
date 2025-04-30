import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { ConnectionPointResponse, UpsertConnectionPoint } from "../types/ConnectionPoint";
import { ENDPOINT_CONNECTION_POINT } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const CreateConnectionPointService = async ({
  connectionPoint,
}: {
  connectionPoint: UpsertConnectionPoint;
}): Promise<ConnectionPointResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_CONNECTION_POINT}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(connectionPoint),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: ConnectionPointResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
