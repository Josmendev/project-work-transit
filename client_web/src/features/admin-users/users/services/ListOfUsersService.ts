import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { INITIAL_PAGE, LIMIT_PAGE } from "../../../../shared/utils/constants";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { User } from "../../../auth/types/User";
import { ENDPOINTS_USER } from "../utils/endpoints";

// Creo la funcion listOfUsers que se conecta a la API del backend
export const ListOfUsersService = async ({
  limit = LIMIT_PAGE,
  page = INITIAL_PAGE,
}: {
  limit?: number;
  page: number;
}): Promise<DataResponseFromAPI<User>> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINTS_USER.LIST_OF_USERS}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto DataResponseFromAPI<User>
    const data: DataResponseFromAPI<User> = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
