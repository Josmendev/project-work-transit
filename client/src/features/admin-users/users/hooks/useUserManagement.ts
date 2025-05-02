import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { useValidationParamsInUpdate } from "../../../../shared/hooks/useValidationParamsInUpdate";
import {
  ADMIN_USERS_ROUTES,
  BASE_ROUTES,
  ROLES_MAPPING,
  type ROLES_KEYS,
} from "../../../../shared/utils/constants";
import { getMessageConfigResponse } from "../../../../shared/utils/getMessageConfig";
import { showToast } from "../../../../shared/utils/toast";
import type { User, UserResponse } from "../../../auth/types/User";
import { useUsers } from "./useUsers";

export const useUserManagement = () => {
  // 📌 Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPage: pageOfPagination, searchQuery } = usePagination();
  const selectedUser = location.state?.user as UserResponse;
  const currentPage = (location.state?.pageOfUsers as number) ?? pageOfPagination ?? 1;
  const MAIN_ROUTE = `/${BASE_ROUTES.PRIVATE.ADMIN}/${ADMIN_USERS_ROUTES.USERS}`;
  const { handleUpdateUserMutation } = useUsers({
    currentPage,
    searchQuery,
  });

  // 📌 Estados
  const [roles, setRoles] = useState<ROLES_KEYS[]>((selectedUser?.roles as ROLES_KEYS[]) || []);

  // 📌 Validaciones antes del renderizado (edit)
  const isUpdating = location.pathname.includes("/edit");
  const isValidateParams = useValidationParamsInUpdate(MAIN_ROUTE);
  const shouldRedirect = isUpdating && !isValidateParams;

  // Eventos al seleccionar fila
  const onEditRowSelected = (data: User) => {
    navigate(`${MAIN_ROUTE}/${data.userId}/edit`, {
      state: { user: data, pageOfUsers: pageOfPagination },
    });
  };

  // Handlers de eventos generales
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const rolesId = roles?.map((role) => ROLES_MAPPING[role]).filter(Number.isFinite);

    console.log("ROLES => ", roles?.map((role) => ROLES_MAPPING[role]).filter(Number.isFinite));
    console.log(selectedUser);

    if (rolesId.length === 0) {
      showToast({
        title: "No hay roles seleccionados",
        description: `Tiene que seleccionar un rol como mínimo`,
        type: "error",
      });
      return false;
    }

    handleUpdateUserMutation.mutateAsync({
      userId: selectedUser?.userId,
      user: { rolesIds: rolesId },
    });

    const messageToast = getMessageConfigResponse("Usuario");
    showToast({ ...messageToast.update });
    return true;
  };

  const handleChangeRole = (role: ROLES_KEYS) => {
    setRoles(
      (prevRoles) =>
        prevRoles.includes(role)
          ? prevRoles.filter((r) => r !== role) // Remueve el rol si ya está
          : [...prevRoles, role] // Agrega el rol si no está
    );
  };

  return {
    selectedUser,
    currentPage,
    roles,
    onEditRowSelected,
    handleUpdateUser,
    handleChangeRole,
    shouldRedirect,
    MAIN_ROUTE,
  };
};
