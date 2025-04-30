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
import { useZone } from "../hooks/useZone";
import { getZoneSchema } from "../schemas/ZoneSchema";
import type { UpdateZoneSelected, UpsertZone } from "../types/Zone";

export const UpsertZoneForm = ({ onEditZone }: { onEditZone: UpdateZoneSelected }) => {
  const { selectedZone, clearSelectedZone } = onEditZone;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertZone>({
    resolver: zodResolver(getZoneSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateZoneMutation, handleUpdateZoneMutation } = useZone({
    currentPage,
    searchQuery,
  });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedZone) setValue("description", selectedZone.description);
    else reset();
  }, [selectedZone, setValue, reset]);

  const onSubmit: SubmitHandler<UpsertZone> = async (data) => {
    try {
      const ZoneDescriptionToCapitalize = transformToCapitalize(data?.description);
      // Update
      if (selectedZone) {
        await handleUpdateZoneMutation.mutateAsync({
          zone: { description: ZoneDescriptionToCapitalize },
          zoneId: selectedZone.zoneId,
        });

        const messageToast = getMessageConfigResponse("Zona");
        showToast({ ...messageToast.update });
        setFocus("description");
        // Create
      } else {
        await handleCreateZoneMutation.mutateAsync({
          zone: { description: ZoneDescriptionToCapitalize },
        });

        const messageToast = getMessageConfigResponse("Zona");
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
    clearSelectedZone();
  };

  return (
    <>
      {(handleUpdateZoneMutation.isPending || handleCreateZoneMutation.isPending) && <Loader />}

      <form className="form-zone" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa la zona"
          required
          autoFocus
          tabIndex={1}
          aria-label="Campo para ingresar la zona"
          {...register("description")}
          error={errors.description?.message as string}
        />

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedZone ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedZone ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedZone ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.description}
          >
            <span>{`${!selectedZone ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedZone ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedZone
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedZone ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedZone ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
