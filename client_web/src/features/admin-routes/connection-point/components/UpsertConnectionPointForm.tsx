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
import { useConnectionPoint } from "../hooks/useConnectionPoint";
import { getConnectionPointSchema } from "../schemas/ConnectionPointSchema";
import type {
  UpdateConnectionPointSelected,
  UpsertConnectionPoint,
} from "../types/ConnectionPoint";

export const UpsertConnectionPointForm = ({
  onEditConnectionPoint,
}: {
  onEditConnectionPoint: UpdateConnectionPointSelected;
}) => {
  const { selectedConnectionPoint, clearSelectedConnectionPoint } = onEditConnectionPoint;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertConnectionPoint>({
    resolver: zodResolver(getConnectionPointSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateConnectionPointMutation, handleUpdateConnectionPointMutation } =
    useConnectionPoint({
      currentPage,
      searchQuery,
    });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedConnectionPoint) setValue("description", selectedConnectionPoint.description);
    else reset();
  }, [selectedConnectionPoint, setValue, reset]);

  const onSubmit: SubmitHandler<UpsertConnectionPoint> = async (data) => {
    try {
      const ConnectionPointToCapitalize = transformToCapitalize(data?.description);
      // Update
      if (selectedConnectionPoint) {
        await handleUpdateConnectionPointMutation.mutateAsync({
          connectionPoint: { description: ConnectionPointToCapitalize },
          connectionPointId: selectedConnectionPoint.connectionPointId,
        });

        const messageToast = getMessageConfigResponse("Punto de conexión");
        showToast({ ...messageToast.update });
        setFocus("description");
        // Create
      } else {
        await handleCreateConnectionPointMutation.mutateAsync({
          connectionPoint: { description: ConnectionPointToCapitalize },
        });

        const messageToast = getMessageConfigResponse("Punto de conexión");
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
    clearSelectedConnectionPoint();
  };

  return (
    <>
      {(handleUpdateConnectionPointMutation.isPending ||
        handleCreateConnectionPointMutation.isPending) && <Loader />}

      <form className="form-ConnectionPoint" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa el punto de conexión"
          required
          autoFocus
          tabIndex={1}
          aria-label="Campo para ingresar el punto de conexión"
          {...register("description")}
          error={errors.description?.message as string}
        />

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedConnectionPoint ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedConnectionPoint ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedConnectionPoint ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.description}
          >
            <span>{`${!selectedConnectionPoint ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedConnectionPoint ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedConnectionPoint
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedConnectionPoint ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedConnectionPoint ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
