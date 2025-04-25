import { handleApiError } from "../../../../shared/utils/handleApiError";
import { ENDPOINT_STAFF } from "../utils/endpoints";

// Creo la funcion deleteStaff que se conecta a la API del backend
export const DeleteStaffService = async ({ staffId }: { staffId: number }): Promise<void> => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("user") as string);
    if (!token) throw new Error("Token inválido");

    const response = await fetch(`${ENDPOINT_STAFF}/${staffId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Respuesta no exitosa, lanzo excepcion del backend
    if (!response.ok) throw await response.json();
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
