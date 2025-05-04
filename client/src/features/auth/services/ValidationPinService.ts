import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";

// Creo la funcion ValidationPin que se conecta a la API del backend
export const ValidationPinService = async (): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.VALIDATION_PIN}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
