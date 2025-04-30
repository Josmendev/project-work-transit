import { getNumbersInString } from "../../../../shared/helpers/getNumbersInString";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import type { CreateStaff, StaffResponse } from "../types/Staff";
import { ENDPOINT_STAFF } from "../utils/endpoints";

// Creo la funcion createStaff que se conecta a la API del backend
export const CreateStaffService = async ({
  staff,
}: {
  staff: CreateStaff;
}): Promise<StaffResponse | { DNI: string; message: string; staffId: number }> => {
  try {
    // const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    // if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_STAFF}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(staff),
    });

    // Respuesta no exitosa
    if (!response.ok) {
      const errorResponse = await response.json();
      const messageResponse = errorResponse.message[0];
      const messageWithStaffId = errorResponse.message[1] ?? "";

      // Manejo de caso específico del backend
      if (response.status === 404 && messageResponse.includes("DNI")) {
        const DNI = getNumbersInString(messageResponse)?.[0];
        if (!DNI) return Promise.reject("No se encontró un DNI");
        return { DNI, message: messageResponse, staffId: messageWithStaffId };
      }

      throw errorResponse;
    }

    // Respuesta exitosa
    const data: StaffResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
