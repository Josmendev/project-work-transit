import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { ModelResponse, UpsertModel } from "../types/Model";
import { ENDPOINT_MODEL } from "../utils/endpoints";

// Creo la funcion que se conecta a la API del backend
export const UpdateModelService = async ({
  model,
  modelId,
}: {
  model: UpsertModel;
  modelId: number;
}): Promise<ModelResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_MODEL}/${modelId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(model),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: ModelResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
