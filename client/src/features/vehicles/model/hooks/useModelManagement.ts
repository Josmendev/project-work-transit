import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { Model, UpdateModelSelected } from "../types/Model";
import { useModel } from "./useModel";

export const useModelManagement = () => {
  const [onEditModel, setOnEditModel] = useState<UpdateModelSelected>({
    selectedModel: null,
    clearSelectedModel: () => {
      setOnEditModel((prev) => ({ ...prev, selectedModel: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateModelMutation, handleDeleteModelMutation } = useModel({
    currentPage,
    searchQuery,
  });

  //Controlo estado del modelo seleccionado en la lista
  const handleStateModel = (data: Model) => {
    setOnEditModel((prev) => ({ ...prev, selectedModel: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditModelInRow = useCallback((data: Model) => {
    if (!data) return;

    handleStateModel(data);
  }, []);

  const handleDeleteModelInRow = useCallback(
    (data: Model) => {
      if (!data?.modelId) return;

      handleStateModel(data);
      handleDeleteModelMutation.mutate({ modelId: data.modelId });
    },
    [handleDeleteModelMutation]
  );

  const handleActivateModelInRow = useCallback(
    (data: Model) => {
      if (!data?.modelId) return;

      handleStateModel(data);
      handleActivateModelMutation.mutate({ modelId: data.modelId });
    },
    [handleActivateModelMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditModel,
    handleStateModel,
    handleEditModelInRow,
    handleDeleteModelInRow,
    handleActivateModelInRow,
  };
};
