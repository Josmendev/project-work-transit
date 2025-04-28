import { DataResponseFromAPI } from "../../../../shared/types/DataResponse";
import { INITIAL_PAGE, LIMIT_PAGE } from "../../../../shared/utils/constants";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { BrandResponse } from "../types/Brand";
import { ENDPOINT_BRAND } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const SearchBrandService = async ({
  limit = LIMIT_PAGE,
  page = INITIAL_PAGE,
  query = "",
}: {
  limit?: number;
  page: number;
  query: string;
}): Promise<DataResponseFromAPI<BrandResponse>> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_BRAND}/${query}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: DataResponseFromAPI<BrandResponse> = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
