import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import type { Route, UpdateRouteSelected } from "../types/Route";
import { useRoute } from "./useRoute";

export const useRouteManagement = () => {
  const [onEditRoute, setOnEditRoute] = useState<UpdateRouteSelected>({
    selectedRoute: null,
    clearSelectedRoute: () => {
      setOnEditRoute((prev) => ({ ...prev, selectedRoute: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateRouteMutation, handleDeleteRouteMutation } = useRoute({
    currentPage,
    searchQuery,
  });

  //Controlo estado del rol seleccionado en la lista
  const handleStateRoute = (data: Route) => {
    setOnEditRoute((prev) => ({ ...prev, selectedRoute: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditRouteInRow = useCallback((data: Route) => {
    if (!data) return;

    handleStateRoute(data);
  }, []);

  const handleDeleteRouteInRow = useCallback(
    (data: Route) => {
      if (!data?.routeId) return;

      handleStateRoute(data);
      handleDeleteRouteMutation.mutate({ routeId: data.routeId });
    },
    [handleDeleteRouteMutation]
  );

  const handleActivateRouteInRow = useCallback(
    (data: Route) => {
      if (!data?.routeId) return;

      handleStateRoute(data);
      handleActivateRouteMutation.mutate({ routeId: data.routeId });
    },
    [handleActivateRouteMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditRoute,
    handleStateRoute,
    handleEditRouteInRow,
    handleDeleteRouteInRow,
    handleActivateRouteInRow,
  };
};
