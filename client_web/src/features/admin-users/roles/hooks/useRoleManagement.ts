import { useCallback, useState } from "react";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { useRoles } from "../hooks/useRoles";
import type { Role, UpdateRoleSelected } from "../types/Role";

export const useRoleManagement = () => {
  const [onEditRole, setOnEditRole] = useState<UpdateRoleSelected>({
    selectedRole: null,
    clearSelectedRole: () => {
      setOnEditRole((prev) => ({ ...prev, selectedRole: null }));
    },
  });

  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { handleActivateRoleMutation, handleDeleteRoleMutation } = useRoles({
    currentPage,
    searchQuery,
  });

  //Controlo estado del rol seleccionado en la lista
  const handleStateRole = (data: Role) => {
    setOnEditRole((prev) => ({ ...prev, selectedRole: data }));
  };

  // Eventos de seleccion de botones por fila
  const handleEditRoleInRow = useCallback((data: Role) => {
    if (!data) return;

    handleStateRole(data);
  }, []);

  const handleDeleteRoleInRow = useCallback(
    (data: Role) => {
      if (!data?.roleId) return;

      handleStateRole(data);
      handleDeleteRoleMutation.mutate({ roleId: data.roleId });
    },
    [handleDeleteRoleMutation]
  );

  const handleActivateRoleInRow = useCallback(
    (data: Role) => {
      if (!data?.roleId) return;

      handleStateRole(data);
      handleActivateRoleMutation.mutate({ roleId: data.roleId });
    },
    [handleActivateRoleMutation]
  );

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditRole,
    handleStateRole,
    handleEditRoleInRow,
    handleDeleteRoleInRow,
    handleActivateRoleInRow,
  };
};
