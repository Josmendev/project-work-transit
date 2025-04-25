import { INITIAL_PAGE, LIMIT_PAGE } from "../../../../shared/utils/constants";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { RoleResponse } from "../types/Role";
import { ENDPOINT_ROLE } from "../utils/endpoints";
import { DataResponseFromAPI } from "./../../../../shared/types/DataResponse";

// Creo la funcion searchForRoles que se conecta a la API del backend
export const SearchRolesService = async ({
  limit = LIMIT_PAGE,
  page = INITIAL_PAGE,
  query = "",
}: {
  limit?: number;
  page: number;
  query: string;
}): Promise<DataResponseFromAPI<RoleResponse>> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_ROLE}/${query}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto DataResponseFromAPI<ResponseRole>
    const data: DataResponseFromAPI<RoleResponse> = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
