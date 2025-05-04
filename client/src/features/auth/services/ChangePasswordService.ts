import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { type AuthUserNewPassword, type AuthUserResponse } from "../types/Auth";

// Creo la funcion login que se conecta a la API del backend
export const ChangePasswordService = async ({
  userWithNewPassword,
}: {
  userWithNewPassword: AuthUserNewPassword;
}): Promise<AuthUserResponse> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.CHANGE_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...userWithNewPassword }),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: AuthUserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
