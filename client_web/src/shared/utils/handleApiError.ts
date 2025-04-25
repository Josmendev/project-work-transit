import { parseErrorResponse } from "./parseErrorResponse";
import { showToast } from "./toast";

export const handleApiError = (error: unknown) => {
  const parsedError = parseErrorResponse(error);

  const statusCode = parsedError?.statusCode ?? 500;
  const message = parsedError?.message ?? "No se proporcionaron detalles adicionales.";
  const mainError = parsedError?.error ?? "Error desconocido";

  const title = `Error ${statusCode}: ${mainError}`;
  showToast({ title, description: message, type: "error" });
};
