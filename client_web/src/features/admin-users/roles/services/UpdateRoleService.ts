import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { RoleResponse, UpsertRole } from "../types/Role";
import { ENDPOINT_ROLE } from "../utils/endpoints";

// Creo la funcion updateRole que se conecta a la API del backend
export const UpdateRoleService = async ({
  role,
  roleId,
}: {
  role: UpsertRole;
  roleId: number;
}): Promise<RoleResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_ROLE}/${roleId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto DataResponseFromAPI<ResponseRole>
    const data: RoleResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
