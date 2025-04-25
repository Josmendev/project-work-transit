import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { StaffAssignRequest, StaffResponse } from "../types/Staff";
import { ENDPOINT_STAFF } from "../utils/endpoints";

// Creo la funcion AssignStaff que se conecta a la API del backend
export const AssignStaffService = async ({
  staff,
}: {
  staff: StaffAssignRequest;
}): Promise<StaffResponse> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_STAFF}/assign`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(staff),
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();

    // Respuesta exitosa, parseo el JSON y devuelvo el objeto StaffResponse
    const data: StaffResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
