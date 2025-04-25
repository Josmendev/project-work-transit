import { ENDPOINTS_AUTH } from "../../../shared/utils/endpoints";
import { handleApiError } from "../../../shared/utils/handleApiError";
import type { AuthUserResponse } from "../types/authTypes";

// Creo la funcion profileUser que se conecta a la API del backend
export const ProfileUserService = async (token: string): Promise<AuthUserResponse> => {
  try {
    const response = await fetch(`${ENDPOINTS_AUTH.PROFILE}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto AuthResponseUser
    const data: AuthUserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error); // Similar al throw, pero enfocado a promesas
  }
};
