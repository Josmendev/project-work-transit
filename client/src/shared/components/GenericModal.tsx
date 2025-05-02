import type { EventType } from "../types/EventType";
import { getMessageConfigRequest, getMessageConfigResponse } from "../utils/getMessageConfig";
import { showToast } from "../utils/toast";
import { Modal } from "./Modal/Modal";

interface GenericModalProps {
  modalType: EventType;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  entityName: string;
  isLoadingData?: boolean;
  entitiesInMessage?: Array<string>;
}

export const GenericModal = ({
  modalType,
  onClose,
  onConfirm,
  entityName,
  isLoadingData,
  entitiesInMessage = [],
}: GenericModalProps) => {
  if (!modalType) return null;

  const modalConfig = getMessageConfigRequest(entityName, entitiesInMessage);
  const modalConfigResponse = getMessageConfigResponse(entityName, entitiesInMessage);

  const config = modalConfig[modalType];
  const toastConfig = modalConfigResponse[modalType];

  const handleConfirm = async () => {
    try {
      await onConfirm();
      showToast({
        ...toastConfig,
        description: toastConfig.description || "Operación realizada correctamente.",
      });
      onClose();
    } catch (error) {
      showToast({
        title: "Error en confirmación",
        description: `Se ha encontrado un error en la confirmación ${error}`,
        type: "error",
      });
      return;
    }
  };

  return (
    <Modal
      title={config.title}
      subtitle={config.subtitle}
      isOpen={!!modalType}
      isLoadingIcon={isLoadingData}
      onClose={onClose}
      onClickSuccess={handleConfirm}
    />
  );
};
