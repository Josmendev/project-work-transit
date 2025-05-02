import type { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UserResponse } from "../../../auth/types/User";
import { ENDPOINT_USER } from "../utils/endpoints";
import { INITIAL_PAGE, LIMIT_PAGE } from "./../../../../shared/utils/constants";

// Creo la funcion searchForUsers que se conecta a la API del backend
export const SearchUsersService = async ({
  limit = LIMIT_PAGE,
  page = INITIAL_PAGE,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}): Promise<DataResponseFromAPI<UserResponse>> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_USER}/${query}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: DataResponseFromAPI<UserResponse> = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
