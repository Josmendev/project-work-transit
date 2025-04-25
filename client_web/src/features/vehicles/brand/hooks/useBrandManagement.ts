import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { Brand, UpdateBrandSelected } from "../types/Brand";
import { useBrand } from "./useBrand";

export const useBrandManagement = () => {
  const [onEditBrand, setOnEditBrand] = useState<UpdateBrandSelected>({
    selectedBrand: null,
    clearSelectedBrand: () => {
      setOnEditBrand((prev) => ({ ...prev, selectedRole: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateBrandMutation, handleDeleteBrandMutation } = useBrand({
    currentPage,
    searchQuery,
  });

  //Controlo estado del rol seleccionado en la lista
  const handleStateBrand = (data: Brand) => {
    setOnEditBrand((prev) => ({ ...prev, selectedRole: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditBrandInRow = useCallback((data: Brand) => {
    if (!data) return;

    handleStateBrand(data);
  }, []);

  const handleDeleteBrandInRow = useCallback(
    (data: Brand) => {
      if (!data?.brandId) return;

      handleStateBrand(data);
      handleDeleteBrandMutation.mutate({ brandId: data.brandId });
    },
    [handleDeleteBrandMutation]
  );

  const handleActivateBrandInRow = useCallback(
    (data: Brand) => {
      if (!data?.brandId) return;

      handleStateBrand(data);
      handleActivateBrandMutation.mutate({ brandId: data.brandId });
    },
    [handleActivateBrandMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditBrand,
    handleStateBrand,
    handleEditBrandInRow,
    handleDeleteBrandInRow,
    handleActivateBrandInRow,
  };
};
