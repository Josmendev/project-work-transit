import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate, useLocation } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import SelectGroup from "../../../../shared/components/SelectGroup/SelectGroup";
import { Spinner } from "../../../../shared/components/Spinner/Spinner";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { getMessageConfigResponse } from "../../../../shared/utils/getMessageConfig";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import { showToast } from "../../../../shared/utils/toast";
import type { Brand } from "../../brand/types/Brand";
import type { Model } from "../../model/types/Model";
import { useVehicle } from "../hooks/useVehicle";
import { useVehicleManagement } from "../hooks/useVehicleManagement";
import { getVehicleSchema } from "../schemas/VehicleSchema";
import type { UpsertVehicle, VehicleResponse } from "../types/Vehicle";

export const UpsertVehicleForm = () => {
  const location = useLocation();
  const selectedVehicle = location.state?.vehicle as VehicleResponse;
  const { shouldRedirect } = useVehicleManagement();

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateVehicleMutation, handleUpdateVehicleMutation, MAIN_ROUTE } = useVehicle({
    searchQuery,
    currentPage,
  });

  const ROUTE_INITIAL = `${MAIN_ROUTE}?page=${currentPage}`;
  const [selectedBrand, setSelectedBrand] = useState<Brand>();
  const [selectedModel, setSelectedModel] = useState<Model>();

  const brands = [
    {
      brandId: 1,
      description: "Brand A",
      isActive: true,
    },
    {
      brandId: 2,
      description: "Brand B",
      isActive: true,
    },
  ];

  const models = [
    {
      modelId: 1,
      description: "Model A",
      brandId: 1,
      isActive: true,
    },
    {
      modelId: 2,
      description: "Model B",
      brandId: 2,
      isActive: true,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<UpsertVehicle>({
    resolver: zodResolver(getVehicleSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  useEffect(() => {
    if (selectedVehicle) {
      const { licensePlateNumber, model, capacity } = selectedVehicle;
      setValue("licensePlateNumber", licensePlateNumber ?? "");
      setValue("model", model ?? 1);
      setValue("capacity", capacity ?? "");
      setFocus("licensePlateNumber");
    }
  }, [selectedVehicle, setValue, setFocus]);

  //Validacion para redireccionar si digitan en la URL un ID pero no hay datos
  if (!selectedVehicle && !shouldRedirect && !location.pathname.includes("add")) {
    showToast({
      title: "Selección de vehículo inválido",
      description: "Debes seleccionar un vehículo previamente",
      type: "error",
    });
    return <Navigate to={ROUTE_INITIAL} />;
  }

  const onReset = () => {
    reset();
    setFocus("licensePlateNumber");
  };

  const onSubmit: SubmitHandler<UpsertVehicle> = async (data) => {
    const { licensePlateNumber, brand, model, capacity } = data;
    try {
      const upsertVehicle = {
        licensePlateNumber: licensePlateNumber ?? "",
        brand: brand ?? "",
        model: model ?? "",
        capacity: capacity ?? "",
      };

      // Update
      if (selectedVehicle && selectedVehicle.vehicleId) {
        const updateVehicle = upsertVehicle;
        await handleUpdateVehicleMutation.mutateAsync({
          vehicle: updateVehicle,
          vehicleId: selectedVehicle?.vehicleId,
        });

        const messageToast = getMessageConfigResponse("Vehículo");
        showToast({ ...messageToast.update });

        return;
      }

      // Create
      await handleCreateVehicleMutation.mutateAsync({ vehicle: upsertVehicle });
      const messageToast = getMessageConfigResponse("Vehículo");
      showToast({ ...messageToast.create });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-5 pl-8">
          <TextInput
            label="N° de placa"
            type="text"
            minLength={2}
            maxLength={100}
            ariaLabel="Número de placa del vehículo"
            placeholder="Ingrese su placa del vehículo"
            {...register("licensePlateNumber")}
            error={errors.licensePlateNumber?.message as string}
          />

          <SelectGroup<Brand>
            label="Marca"
            options={brands}
            selectedOption={selectedBrand}
            onChange={setSelectedBrand}
            getLabel={(brand) => brand.description}
            getKey={(brand) => brand.brandId}
          />
        </div>

        <div className="flex flex-col gap-5 mb-5 pr-8">
          <SelectGroup<Model>
            label="Modelo"
            options={models}
            selectedOption={selectedModel}
            onChange={setSelectedModel}
            getLabel={(model) => model.description}
            getKey={(model) => model.modelId}
          />

          <TextInput
            label="Aforo"
            type="text"
            maxLength={50}
            ariaLabel="Totalidad del Aforo"
            placeholder="Ingrese el aforo"
            {...register("capacity")}
            error={errors.capacity?.message as string}
          />
        </div>

        <div className="user-buttons mt-5 flex gap-20 col-span-2 px-4">
          <Button
            title={selectedVehicle ? "Actualizar" : "Guardar"}
            id="btnUpsertVehicle"
            type="submit"
            classButton="btn-primary text-paragraph-medium"
            iconLeft={
              (
                selectedVehicle
                  ? handleUpdateVehicleMutation.isPending
                  : handleCreateVehicleMutation.isPending
              ) ? (
                <Spinner className="mr-1" />
              ) : (
                <Icon.Save size={28} strokeWidth={1.2} />
              )
            }
            disabled={
              handleUpdateVehicleMutation.isPending ||
              handleCreateVehicleMutation.isPending ||
              Object.keys(errors).length > 0
            }
          >
            <span>{handleCreateVehicleMutation.isPending ? "Guardando..." : "Guardar"}</span>
          </Button>

          <Button
            title="Limpiar registros"
            id="btnClearFieldsOfVehicle"
            type="button"
            classButton="btn-primary text-paragraph-medium !bg-secondary-500 hover:!bg-secondary-600"
            iconLeft={<Icon.Clear size={28} strokeWidth={1.2} />}
            disabled={
              handleUpdateVehicleMutation.isPending || handleCreateVehicleMutation.isPending
            }
            onClick={onReset}
          >
            Limpiar campos
          </Button>
        </div>
      </form>
    </>
  );
};
