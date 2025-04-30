import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { ConnectionPoint, UpdateConnectionPointSelected } from "../types/ConnectionPoint";
import { useConnectionPoint } from "./useConnectionPoint";

export const useConnectionPointManagement = () => {
  const [onEditConnectionPoint, setOnEditConnectionPoint] = useState<UpdateConnectionPointSelected>(
    {
      selectedConnectionPoint: null,
      clearSelectedConnectionPoint: () => {
        setOnEditConnectionPoint((prev) => ({ ...prev, selectedConnectionPoint: null }));
      },
    }
  );

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateConnectionPointMutation, handleDeleteConnectionPointMutation } =
    useConnectionPoint({
      currentPage,
      searchQuery,
    });

  //Controlo estado del rol seleccionado en la lista
  const handleStateConnectionPoint = (data: ConnectionPoint) => {
    setOnEditConnectionPoint((prev) => ({ ...prev, selectedConnectionPoint: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditConnectionPointInRow = useCallback((data: ConnectionPoint) => {
    if (!data) return;

    handleStateConnectionPoint(data);
  }, []);

  const handleDeleteConnectionPointInRow = useCallback(
    (data: ConnectionPoint) => {
      if (!data?.connectionPointId) return;

      handleStateConnectionPoint(data);
      handleDeleteConnectionPointMutation.mutate({ connectionPointId: data.connectionPointId });
    },
    [handleDeleteConnectionPointMutation]
  );

  const handleActivateConnectionPointInRow = useCallback(
    (data: ConnectionPoint) => {
      if (!data?.connectionPointId) return;

      handleStateConnectionPoint(data);
      handleActivateConnectionPointMutation.mutate({ connectionPointId: data.connectionPointId });
    },
    [handleActivateConnectionPointMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditConnectionPoint,
    handleStateConnectionPoint,
    handleEditConnectionPointInRow,
    handleDeleteConnectionPointInRow,
    handleActivateConnectionPointInRow,
  };
};
