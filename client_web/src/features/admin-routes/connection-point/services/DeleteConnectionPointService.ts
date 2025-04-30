import { handleApiError } from "../../../../shared/utils/handleApiError";
import { ENDPOINT_CONNECTION_POINT } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const DeleteConnectionPointService = async ({
  connectionPointId,
}: {
  connectionPointId: number;
}): Promise<void> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_CONNECTION_POINT}/${connectionPointId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
