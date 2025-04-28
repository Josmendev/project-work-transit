const errorMessages: Record<number, string> = {
  400: "La solicitud enviada es incorrecta",
  401: "No se encuentra autorizado",
  403: "Acceso denegado, no tiene permisos suficientes",
  404: "Recurso no encontrado",
  405: "Método no permitido en esta ruta",
  408: "Tiempo de espera agotado, intente de nuevo",
  409: "Conflicto en la solicitud, revise los datos enviados",
  410: "El recurso ya no está disponible",
  413: "El archivo o solicitud es demasiado grande",
  415: "Tipo de contenido no soportado",
  429: "Demasiadas solicitudes, espere e intente de nuevo",
  500: "Error interno del servidor, intente más tarde",
  502: "La Puerta de enlace es incorrecta",
  503: "Servicio no disponible, intente más tarde",
  504: "Tiempo de espera del servidor agotado",
};

const defaultMessage = "Ocurrió un error inesperado. Intente nuevamente.";

// Me permite obtener el mensaje de error según el código de estado
export const getErrorMessage = (statusCode: number | string) => {
  return errorMessages[Number(statusCode)] ?? defaultMessage;
};
