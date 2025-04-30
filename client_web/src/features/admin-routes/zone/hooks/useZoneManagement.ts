import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { UpdateZoneSelected, Zone } from "../types/Zone";
import { useZone } from "./useZone";

export const useZoneManagement = () => {
  const [onEditZone, setOnEditZone] = useState<UpdateZoneSelected>({
    selectedZone: null,
    clearSelectedZone: () => {
      setOnEditZone((prev) => ({ ...prev, selectedZone: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateZoneMutation, handleDeleteZoneMutation } = useZone({
    currentPage,
    searchQuery,
  });

  //Controlo estado del rol seleccionado en la lista
  const handleStateZone = (data: Zone) => {
    setOnEditZone((prev) => ({ ...prev, selectedZone: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditZoneInRow = useCallback((data: Zone) => {
    if (!data) return;

    handleStateZone(data);
  }, []);

  const handleDeleteZoneInRow = useCallback(
    (data: Zone) => {
      if (!data?.zoneId) return;

      handleStateZone(data);
      handleDeleteZoneMutation.mutate({ zoneId: data.zoneId });
    },
    [handleDeleteZoneMutation]
  );

  const handleActivateZoneInRow = useCallback(
    (data: Zone) => {
      if (!data?.zoneId) return;

      handleStateZone(data);
      handleActivateZoneMutation.mutate({ zoneId: data.zoneId });
    },
    [handleActivateZoneMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditZone,
    handleStateZone,
    handleEditZoneInRow,
    handleDeleteZoneInRow,
    handleActivateZoneInRow,
  };
};
