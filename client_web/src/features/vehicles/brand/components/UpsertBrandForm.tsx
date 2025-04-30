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
import { useBrand } from "../hooks/useBrand";
import { getBrandSchema } from "../schemas/BrandSchema";
import type { UpdateBrandSelected, UpsertBrand } from "../types/Brand";

export const UpsertBrandForm = ({ onEditBrand }: { onEditBrand: UpdateBrandSelected }) => {
  const { selectedBrand, clearSelectedBrand } = onEditBrand;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpsertBrand>({
    resolver: zodResolver(getBrandSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateBrandMutation, handleUpdateBrandMutation } = useBrand({
    currentPage,
    searchQuery,
  });

  //Asigno el valor de descripcion al campo del register
  useEffect(() => {
    if (selectedBrand) setValue("description", selectedBrand.description);
    else reset();
  }, [selectedBrand, setValue, reset]);

  const onSubmit: SubmitHandler<UpsertBrand> = async (data) => {
    try {
      const BrandDescriptionToCapitalize = transformToCapitalize(data?.description);
      // Update
      if (selectedBrand) {
        await handleUpdateBrandMutation.mutateAsync({
          brand: { description: BrandDescriptionToCapitalize },
          brandId: selectedBrand.brandId,
        });

        const messageToast = getMessageConfigResponse("Marca");
        showToast({ ...messageToast.update });
        setFocus("description");
        // Create
      } else {
        await handleCreateBrandMutation.mutateAsync({
          brand: { description: BrandDescriptionToCapitalize },
        });

        const messageToast = getMessageConfigResponse("Marca");
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
    clearSelectedBrand();
  };

  return (
    <>
      {(handleUpdateBrandMutation.isPending || handleCreateBrandMutation.isPending) && <Loader />}

      <form className="form-brand" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa la marca"
          required
          autoFocus
          tabIndex={1}
          aria-label="Campo para ingresar la marca"
          {...register("description")}
          error={errors.description?.message as string}
        />

        <div className="flex gap-4 mt-8">
          <Button
            title={`${!selectedBrand ? "Agregar" : "Actualizar"}`}
            type="submit"
            tabIndex={2}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedBrand ? "" : "!bg-warning-500 hover:!bg-warning-600"
            }`}
            iconLeft={
              !selectedBrand ? (
                <Icon.Save size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Edit size={28} strokeWidth={1.2} />
              )
            }
            disabled={isSubmitting || !!errors.description}
          >
            <span>{`${!selectedBrand ? "Agregar" : "Actualizar"}`}</span>
          </Button>

          <Button
            title={`${!selectedBrand ? "Limpiar" : "Cancelar"}`}
            type="button"
            tabIndex={3}
            classButton={`btn-primary text-paragraph-regular ${
              !selectedBrand
                ? "!bg-secondary-500 hover:!bg-secondary-600"
                : "!bg-error-500 hover:!bg-error-600"
            }`}
            iconLeft={
              !selectedBrand ? (
                <Icon.Clear size={28} strokeWidth={1.2} />
              ) : (
                <Icon.Close size={28} strokeWidth={1.2} />
              )
            }
            onClick={onReset}
            disabled={isSubmitting}
          >
            <span>
              <span>{`${!selectedBrand ? "Limpiar" : "Cancelar"}`}</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
};
