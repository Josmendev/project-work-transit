import { useState } from "react";
import type { EventType } from "../types/EventType";

export const useModalManager = <T>() => {
  const [modalType, setModalType] = useState<EventType>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = (type: EventType, item?: T) => {
    if (item) setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  return { modalType, selectedItem, openModal, closeModal };
};
