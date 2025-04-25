import { ErrorResponse } from "../types/ErrorResponse";
import { getErrorMessage } from "./getErrorMessage";
import { isErrorResponse } from "./iSErrorResponse";

export function parseErrorResponse(error: unknown): ErrorResponse {
  const STATUS_CODE_DEFAULT = 500;
  const STATUS_CODE_BADREQUEST = 400;
  const ERROR_DEFAULT = "An unexpected error occurred.";

  if (isErrorResponse(error)) {
    return {
      statusCode: error.statusCode,
      error: getErrorMessage(error.statusCode),
      message: Array.isArray(error.message)
        ? error.message.join("\n")
        : error.message || "No se proporcionaron detalles adicionales.",
    };
  }

  // Detecto error de red (API offline o no responde)
  if (error instanceof TypeError) {
    return {
      statusCode: STATUS_CODE_DEFAULT,
      error: "Error de conexión",
      message:
        "No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servicio está disponible.",
    };
  }

  // Detecto error al parsear JSON (JSON inválido del back)
  if (error instanceof SyntaxError) {
    return {
      statusCode: STATUS_CODE_DEFAULT,
      error: "Error en la respuesta del servidor",
      message: "La respuesta del servidor no es válida.",
    };
  }

  //  Detecto otros errores estándar en JavaScript
  if (error instanceof Error) {
    return {
      statusCode: STATUS_CODE_BADREQUEST,
      error: ERROR_DEFAULT,
      message: error.message,
    };
  }

  return {
    statusCode: STATUS_CODE_DEFAULT,
    error: ERROR_DEFAULT,
    message: typeof error === "string" ? error : JSON.stringify(error),
  };
}
