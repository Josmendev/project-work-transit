import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";
import type { AuthUserEmail } from "../types/Auth";

// Creo la funcion RequestPasswordResetUser que se conecta a la API del backend
export const RequestPasswordResetUserService = async ({
  email,
}: {
  email: AuthUserEmail;
}): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.REQUEST_RESET_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(email),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
