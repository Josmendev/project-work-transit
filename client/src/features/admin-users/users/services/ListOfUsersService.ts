import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { INITIAL_PAGE, LIMIT_PAGE } from "../../../../shared/utils/constants";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UserResponse } from "../../../auth/types/User";
import { ENDPOINT_USER } from "../utils/endpoints";

// Creo la funcion listOfUsers que se conecta a la API del backend
export const ListOfUsersService = async ({
  limit = LIMIT_PAGE,
  page = INITIAL_PAGE,
}: {
  limit?: number;
  page: number;
}): Promise<DataResponseFromAPI<UserResponse>> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_USER}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto DataResponseFromAPI<User>
    const data: DataResponseFromAPI<UserResponse> = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
