import type { EventType } from "../types/EventType";
import type { ToastType } from "./toast";

export const getMessageConfigRequest = (
  entityName: string,
  entitiesInMessage: Array<string> = []
) => {
  const [firstItem = "Paciente", secondItem = "Personal"] = entitiesInMessage ?? [];
  return {
    create: {
      title: `Crear ${entityName}`,
      subtitle: `¿Deseas crear el ${entityName.toLowerCase()} seleccionado?`,
    },
    delete: {
      title: `Eliminar ${entityName}`,
      subtitle: `¿Deseas eliminar el ${entityName.toLowerCase()} seleccionado?`,
    },
    update: {
      title: `Actualizar ${entityName}`,
      subtitle: `¿Deseas actualizar el ${entityName.toLowerCase()} seleccionado?`,
    },
    activate: {
      title: `Activar ${entityName}`,
      subtitle: `¿Deseas activar el ${entityName.toLowerCase()} que actualmente se encuentra inhabilitado?`,
    },
    refreshPassword: {
      title: "Refrescar contraseña",
      subtitle: "¿Desea restaurar la contraseña a su estado inicial?",
    },
    assign: {
      title: `Asignar ${firstItem} como ${secondItem}`,
      subtitle: `¿La persona actualmente está registrada como ${firstItem}, deseas asignarla como ${secondItem}?`,
    },
  } as Record<Exclude<EventType, null>, { title: string; subtitle: string }>;
};

export const getMessageConfigResponse = (entityName: string, entitiesInMessage?: Array<string>) => {
  const [firstItem = "Paciente", secondItem = "Personal"] = entitiesInMessage ?? [];
  return {
    create: {
      title: `${entityName} creado`,
      description: `El ${entityName} se ha creado correctamente.`,
      type: "success",
    },
    delete: {
      title: `${entityName} eliminado`,
      description: `El ${entityName} se ha eliminado correctamente.`,
      type: "success",
    },
    update: {
      title: `${entityName} actualizado`,
      description: `El ${entityName} se ha actualizado correctamente.`,
      type: "success",
    },
    activate: {
      title: `${entityName} activado`,
      description: `El ${entityName} se ha activado correctamente.`,
      type: "success",
    },
    assign: {
      title: "Asignación exitosa",
      description: `El ${firstItem} ha sido asignado como ${secondItem} correctamente.`,
      type: "success",
    },
    confirmAccount: {
      title: "Confirmación de cuenta",
      description: "Procede a confirmar tu cuenta para iniciar sesión.",
      type: "info",
    },
    userInSession: {
      title: "Inicio de sesión",
      description: "Ha iniciado sesión satisfactoriamente.",
      type: "success",
    },
    userLogout: {
      title: "Sesión cerrada",
      description: "Se cerró la sesión de forma exitosa.",
      type: "success",
    },
    refreshPassword: {
      title: "Contraseña restablecida",
      description:
        "Se restableció la contraseña de manera exitosa. Para iniciar sesión, el usuario debe confirmar sus credenciales.",
      type: "success",
    },
    reportCertificate: {
      title: "Reporte de Certificado",
      description: `Se generó el reporte de ${entityName || "Certificado"} de forma exitosa!`,
      type: "success",
    },
  } as Record<Exclude<EventType, null>, { title: string; description: string; type: ToastType }>;
};
