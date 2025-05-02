import { useState } from "react";

export const useModal = () => {
  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return {
    modalType,
    openModal,
    closeModal,
  };
};
