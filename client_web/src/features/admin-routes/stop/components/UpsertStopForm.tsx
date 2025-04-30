import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import Loader from "../../../../shared/components/Loader";
import SelectGroup from "../../../../shared/components/SelectGroup/SelectGroup";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import { transformToCapitalize } from "../../../../shared/helpers/transformToCapitalize";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { getMessageConfigResponse } from "../../../../shared/utils/getMessageConfig";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import { showToast } from "../../../../shared/utils/toast";
import type { Zone } from "../../zone/types/Zone";
import { useStop } from "../hooks/useStop";
import { getStopSchema } from "../schemas/StopSchema";
import type { UpdateStopSelected, UpsertStop } from "../types/Stop";

export const UpsertStopForm = ({ onEditStop }: { onEditStop: UpdateStopSelected }) => {
  const { selectedStop, clearSelectedStop } = onEditStop;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertStop>({
    resolver: zodResolver(getStopSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateStopMutation, handleUpdateStopMutation } = useStop({
    currentPage,
    searchQuery,
  });

  const [selectedZone, setSelectedZone] = useState<Zone>();
  const zones = [
    {
      zoneId: 1,
      description: "Zona A",
      isActive: true,
    },
    {
      zoneId: 2,
      description: "Zona B",
      isActive: true,
    },
  ];

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedStop) {
      setValue("direction", selectedStop.direction);
      setValue("zone", selectedStop.zone);
      setFocus("direction");
    } else reset();
  }, [selectedStop, setValue, setFocus, reset]);

  const onSubmit: SubmitHandler<UpsertStop> = async (data) => {
    const { direction, zone } = data;

    const directionToCapitalize = transformToCapitalize(direction);

    try {
      // Update
      if (selectedStop && selectedStop.stopId) {
        await handleUpdateStopMutation.mutateAsync({
          stop: {
            direction: directionToCapitalize,
            zone: zone ?? "",
          },
          stopId: selectedStop.stopId,
        });

        const messageToast = getMessageConfigResponse("Parada de autobús");
        showToast({ ...messageToast.update });
        setFocus("direction");
        // Create
      } else {
        await handleCreateStopMutation.mutateAsync({
          stop: {
            direction: directionToCapitalize,
            zone: zone ?? "",
          },
        });

        const messageToast = getMessageConfigResponse("Parada de autobús");
        showToast({ ...messageToast.create });
        setFocus("direction");
      }

      onReset();
    } catch (error) {
      handleApiError(error);
    }
  };

  const onReset = () => {
    reset();
    setFocus("direction");
    clearSelectedStop();
  };

  return (
    <>
      {(handleUpdateStopMutation.isPending || handleCreateStopMutation.isPending) && <Loader />}

      <form className="form-Stop" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-5 pl-8">
          <TextInput
            label="Dirección de parada"
            type="text"
            placeholder="Ingresa la direción de parada del autobús"
            required
            autoFocus
            tabIndex={1}
            aria-label="Campo para ingresar la parada del autobús"
            {...register("direction")}
            error={errors.direction?.message as string}
          />

          <SelectGroup<Zone>
            label="Zona"
            options={zones}
            selectedOption={selectedZone}
            onChange={setSelectedZone}
            getLabel={(zone) => zone.description}
            getKey={(zone) => zone.zoneId}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedStop ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedStop ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedStop ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.direction}
          >
            <span>{`${!selectedStop ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedStop ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedStop
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedStop ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedStop ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
