import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { User } from "../../../auth/types/User";
import { type EditUser } from "../types/userTypes";
import { ENDPOINTS_USER } from "../utils/endpoints";

// Creo la funcion login que se conecta a la API del backend
export const UpdateUserService = async (user: EditUser): Promise<User> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const { userId, ...userData } = user;

    const response = await fetch(`${ENDPOINTS_USER.LIST_OF_USERS}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto User
    const data: User = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
