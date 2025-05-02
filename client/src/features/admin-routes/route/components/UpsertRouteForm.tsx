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
import { useRoute } from "../hooks/useRoute";
import { getRouteSchema } from "../schemas/RouteSchema";
import type { UpdateRouteSelected, UpsertRoute } from "../types/Route";

export const UpsertRouteForm = ({ onEditRoute }: { onEditRoute: UpdateRouteSelected }) => {
  const { selectedRoute, clearSelectedRoute } = onEditRoute;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertRoute>({
    resolver: zodResolver(getRouteSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateRouteMutation, handleUpdateRouteMutation } = useRoute({
    currentPage,
    searchQuery,
  });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedRoute) {
      setValue("routeNumber", selectedRoute.routeNumber);
      setValue("origin", selectedRoute.origin);
      setValue("destination", selectedRoute.destination);
      setFocus("routeNumber");
    } else reset();
  }, [selectedRoute, setValue, setFocus, reset]);

  const onSubmit: SubmitHandler<UpsertRoute> = async (data) => {
    const { origin, destination, routeNumber } = data;
    const originToCapitalize = transformToCapitalize(origin);
    const destinationToCapitalize = transformToCapitalize(destination);

    try {
      // Update
      if (selectedRoute) {
        await handleUpdateRouteMutation.mutateAsync({
          route: {
            routeNumber: routeNumber,
            origin: originToCapitalize,
            destination: destinationToCapitalize,
          },
          routeId: selectedRoute.routeId,
        });

        const messageToast = getMessageConfigResponse("Ruta");
        showToast({ ...messageToast.update });
        setFocus("routeNumber");
        // Create
      } else {
        await handleCreateRouteMutation.mutateAsync({
          route: {
            routeNumber: routeNumber,
            origin: originToCapitalize,
            destination: destinationToCapitalize,
          },
        });

        const messageToast = getMessageConfigResponse("Ruta");
        showToast({ ...messageToast.create });
        setFocus("routeNumber");
      }

      onReset();
    } catch (error) {
      handleApiError(error);
    }
  };

  const onReset = () => {
    reset();
    setFocus("routeNumber");
    clearSelectedRoute();
  };

  return (
    <>
      {(handleUpdateRouteMutation.isPending || handleCreateRouteMutation.isPending) && <Loader />}

      <form className="form-route" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-5 pl-8">
          <TextInput
            label="Número de Ruta"
            type="text"
            placeholder="Ingresa el número de ruta"
            required
            autoFocus
            tabIndex={1}
            aria-label="Campo para ingresar la ruta"
            {...register("routeNumber")}
            error={errors.routeNumber?.message as string}
          />

          <TextInput
            label="Origen"
            type="text"
            placeholder="Ingresa la dirección completa del origen"
            required
            autoFocus
            tabIndex={1}
            aria-label="Campo para ingresar el origen"
            {...register("origin")}
            error={errors.origin?.message as string}
          />
        </div>

        <div className="flex flex-col gap-5 mb-5 pl-8">
          <TextInput
            label="Destino"
            type="text"
            placeholder="Ingresa la dirección completa del destino"
            required
            autoFocus
            tabIndex={1}
            aria-label="Campo para ingresar el destino"
            {...register("destination")}
            error={errors.destination?.message as string}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedRoute ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedRoute ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedRoute ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.routeNumber}
          >
            <span>{`${!selectedRoute ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedRoute ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedRoute
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedRoute ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedRoute ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
