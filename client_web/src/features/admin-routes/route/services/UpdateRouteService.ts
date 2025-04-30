import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { RouteResponse, UpsertRoute } from "../types/Route";
import { ENDPOINT_ROUTE } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const UpdateRouteService = async ({
  route,
  routeId,
}: {
  route: UpsertRoute;
  routeId: number;
}): Promise<RouteResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_ROUTE}/${routeId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(route),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: RouteResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
