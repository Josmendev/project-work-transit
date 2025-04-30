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
import type { Brand } from "../../brand/types/Brand";
import { useModel } from "../hooks/useModel";
import { getModelSchema } from "../schemas/ModelSchema";
import type { UpdateModelSelected, UpsertModel } from "../types/Model";

export const UpsertModelForm = ({ onEditModel }: { onEditModel: UpdateModelSelected }) => {
  const { selectedModel, clearSelectedModel } = onEditModel;
  const [selectedBrand, setSelectedBrand] = useState<Brand>();
  const brands = [
    {
      brandId: 1,
      description: "Logo A",
      isActive: true,
    },
    {
      brandId: 2,
      description: "Logo B",
      isActive: true,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertModel>({
    resolver: zodResolver(getModelSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateModelMutation, handleUpdateModelMutation } = useModel({
    currentPage,
    searchQuery,
  });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedModel) setValue("description", selectedModel.description);
    else reset();
  }, [selectedModel, setValue, reset]);

  const onSubmit: SubmitHandler<UpsertModel> = async (data) => {
    try {
      const ModelDescriptionToCapitalize = transformToCapitalize(data?.description);
      // Update
      if (selectedModel) {
        await handleUpdateModelMutation.mutateAsync({
          model: { description: ModelDescriptionToCapitalize },
          modelId: selectedModel.modelId,
        });

        const messageToast = getMessageConfigResponse("Modelo");
        showToast({ ...messageToast.update });
        setFocus("description");
        // Create
      } else {
        await handleCreateModelMutation.mutateAsync({
          model: { description: ModelDescriptionToCapitalize },
        });

        const messageToast = getMessageConfigResponse("Modelo");
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
    clearSelectedModel();
  };

  return (
    <>
      {(handleUpdateModelMutation.isPending || handleCreateModelMutation.isPending) && <Loader />}

      <form className="form-model" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa el modelo"
          required
          autoFocus
          tabIndex={1}
          aria-label="Campo para ingresar el modelo"
          {...register("description")}
          error={errors.description?.message as string}
        />

        <SelectGroup<Brand>
          label="Marca"
          options={brands}
          selectedOption={selectedBrand}
          onChange={setSelectedBrand}
          getLabel={(brand) => brand.description}
          getKey={(brand) => brand.brandId}
        />

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedModel ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedModel ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedModel ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.description}
          >
            <span>{`${!selectedModel ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedModel ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedModel
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedModel ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedModel ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
