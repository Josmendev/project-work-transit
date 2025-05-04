import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { type AuthTokenResponse, type AuthUserNewPassword } from "../types/Auth";

// Creo la funcion confirmUser que se conecta a la API del backend
export const ConfirmUserService = async ({
  user,
  userId,
}: {
  user: AuthUserNewPassword;
  userId: number;
}): Promise<AuthTokenResponse> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.CONFIRM_ACCOUNT}/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const currentToken: AuthTokenResponse = await response.json();
    return currentToken;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
