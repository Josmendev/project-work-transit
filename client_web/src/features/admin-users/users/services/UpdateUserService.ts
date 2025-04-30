import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { UpdateUser, UserResponse } from "../../../auth/types/User";
import { ENDPOINT_USER } from "../utils/endpoints";

// Creo la funcion login que se conecta a la API del backend
export const UpdateUserService = async ({
  user,
  userId,
}: {
  user: UpdateUser;
  userId: number;
}): Promise<UserResponse> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_USER}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto User
    const data: UserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
