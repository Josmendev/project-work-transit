import { getErrorMessage } from "./getErrorMessage";
import { parseErrorResponse } from "./parseErrorResponse";
import { showToast } from "./toast";

export const handleApiError = (error: unknown) => {
  const parsedError = parseErrorResponse(error);

  const status = parsedError?.status ?? 500;
  const message = parsedError?.message ?? "No se proporcionaron detalles adicionales.";
  const mainError = getErrorMessage(status);

  const title = `Error ${status}: ${mainError}`;
  showToast({ title, description: message, type: "error" });
};
