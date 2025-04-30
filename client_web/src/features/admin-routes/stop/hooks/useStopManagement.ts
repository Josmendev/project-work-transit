import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { Stop, UpdateStopSelected } from "../types/Stop";
import { useStop } from "./useStop";

export const useStopManagement = () => {
  const [onEditStop, setOnEditStop] = useState<UpdateStopSelected>({
    selectedStop: null,
    clearSelectedStop: () => {
      setOnEditStop((prev) => ({ ...prev, selectedStop: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateStopMutation, handleDeleteStopMutation } = useStop({
    currentPage,
    searchQuery,
  });

  //Controlo estado del rol seleccionado en la lista
  const handleStateStop = (data: Stop) => {
    setOnEditStop((prev) => ({ ...prev, selectedStop: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditStopInRow = useCallback((data: Stop) => {
    if (!data) return;

    handleStateStop(data);
  }, []);

  const handleDeleteStopInRow = useCallback(
    (data: Stop) => {
      if (!data?.stopId) return;

      handleStateStop(data);
      handleDeleteStopMutation.mutate({ stopId: data.stopId });
    },
    [handleDeleteStopMutation]
  );

  const handleActivateStopInRow = useCallback(
    (data: Stop) => {
      if (!data?.stopId) return;

      handleStateStop(data);
      handleActivateStopMutation.mutate({ stopId: data.stopId });
    },
    [handleActivateStopMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditStop,
    handleStateStop,
    handleEditStopInRow,
    handleDeleteStopInRow,
    handleActivateStopInRow,
  };
};
