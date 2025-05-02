import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { BrandResponse, UpsertBrand } from "../types/Brand";
import { ENDPOINT_BRAND } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const UpdateBrandService = async ({
  brand,
  brandId,
}: {
  brand: UpsertBrand;
  brandId: number;
}): Promise<BrandResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_BRAND}/${brandId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(brand),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: BrandResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
