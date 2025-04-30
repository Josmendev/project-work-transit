import { ErrorResponse } from "../types/ErrorResponse";
import { isErrorResponse } from "./iSErrorResponse";

export function parseErrorResponse(error: unknown): ErrorResponse {
  const STATUS_CODE_DEFAULT = 500;
  const STATUS_CODE_BADREQUEST = 400;

  if (isErrorResponse(error)) {
    return {
      status: error.status,
      message: Array.isArray(error.message)
        ? error.message.join("\n")
        : error.message || "No se proporcionaron detalles adicionales.",
    };
  }

  // Detecto error de red (API offline o no responde)
  if (error instanceof TypeError) {
    return {
      status: STATUS_CODE_DEFAULT,
      message:
        "No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servicio está disponible.",
    };
  }

  // Detecto error al parsear JSON (JSON inválido del back)
  if (error instanceof SyntaxError) {
    return {
      status: STATUS_CODE_DEFAULT,
      message: "La respuesta del servidor no es válida.",
    };
  }

  //  Detecto otros errores estándar en JavaScript
  if (error instanceof Error) {
    return {
      status: STATUS_CODE_BADREQUEST,
      message: error.message,
    };
  }

  return {
    status: STATUS_CODE_DEFAULT,
    message: typeof error === "string" ? error : JSON.stringify(error),
  };
}
