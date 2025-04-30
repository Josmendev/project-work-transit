import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { CreateRole, RoleResponse } from "../types/Role";
import { ENDPOINT_ROLE } from "../utils/endpoints";

// Creo la funcion createRole que se conecta a la API del backend
export const CreateRoleService = async ({ role }: { role: CreateRole }): Promise<RoleResponse> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_ROLE}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: RoleResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
