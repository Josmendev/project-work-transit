import { handleApiError } from "../../../../shared/utils/handleApiError";
import { type EditUser } from "../types/userTypes";
import { ENDPOINTS_USER } from "../utils/endpoints";

// Creo la funcion Resetpassword que se conecta a la API del backend
export const ResetPasswordUserService = async (user: EditUser): Promise<void> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINTS_USER.RESET_PASSWORD}/${user.userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
