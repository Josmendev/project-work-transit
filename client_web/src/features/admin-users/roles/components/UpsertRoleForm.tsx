import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import Loader from "../../../../shared/components/Loader";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import { transformToCapitalize } from "../../../../shared/helpers/transformToCapitalize";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { getMessageConfigResponse } from "../../../../shared/utils/getMessageConfig";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import { showToast } from "../../../../shared/utils/toast";
import { useRoles } from "../hooks/useRoles";
import { getRoleSchema } from "../schemas/RoleSchema";
import type { CreateRole, UpdateRoleSelected } from "../types/Role";

export const UpsertRoleForm = ({ onEditRole }: { onEditRole: UpdateRoleSelected }) => {
  const { selectedRole, clearSelectedRole } = onEditRole;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateRole>({
    resolver: zodResolver(getRoleSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateRoleMutation, handleUpdateRoleMutation } = useRoles({
    currentPage,
    searchQuery,
  });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedRole) {
      setValue("description", selectedRole.description);
      setFocus("description");
    } else {
      reset();
    }
  }, [selectedRole, setValue, setFocus, reset]);

  const onSubmit: SubmitHandler<CreateRole> = async (data) => {
    try {
      const roleToCapitalize = transformToCapitalize(data?.description);
      // Update
      if (selectedRole) {
        await handleUpdateRoleMutation.mutateAsync({
          role: { description: roleToCapitalize },
          roleId: selectedRole.roleId,
        });

        const messageToast = getMessageConfigResponse("Rol");
        showToast({ ...messageToast.update });
        setFocus("description");
        // Create
      } else {
        await handleCreateRoleMutation.mutateAsync({
          role: { description: roleToCapitalize },
        });

        const messageToast = getMessageConfigResponse("Rol");
        showToast({ ...messageToast.create });
        setFocus("description");
      }

      onReset();
    } catch (error) {
      handleApiError(error);
    }
  };

  const onReset = () => {
    reset();
    setFocus("description");
    clearSelectedRole();
  };

  return (
    <>
      {(handleUpdateRoleMutation.isPending || handleCreateRoleMutation.isPending) && <Loader />}

      <form className="form-role" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa el rol"
          required
          autoFocus
          tabIndex={1}
          aria-label="Campo para ingresar el rol"
          {...register("description")}
          error={errors.description?.message as string}
        />

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedRole ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedRole ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedRole ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.description}
          >
            <span>{`${!selectedRole ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedRole ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedRole
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedRole ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedRole ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
