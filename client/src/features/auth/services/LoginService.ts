import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { type AuthUserLogin, type AuthUserResponse } from "../types/Auth";

// Creo la funcion login que se conecta a la API del backend
export const LoginService = async ({
  user,
}: {
  user: AuthUserLogin;
}): Promise<AuthUserResponse> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...user }),
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
