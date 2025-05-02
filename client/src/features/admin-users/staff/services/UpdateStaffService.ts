import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { StaffResponse, UpdateStaff } from "../types/Staff";
import { ENDPOINT_STAFF } from "../utils/endpoints";

// Creo la funcion updateStaff que se conecta a la API del backend
export const UpdateStaffService = async ({
  staff,
  staffId,
}: {
  staff: UpdateStaff;
  staffId: number;
}): Promise<StaffResponse> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_STAFF}/${staffId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(staff),
    });

    // Respuesta no exitosa
    if (!response.ok) throw await response.json();

    // Respuesta exitosa
    const data: StaffResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
