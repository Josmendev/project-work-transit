import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate, useLocation } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import { Spinner } from "../../../../shared/components/Spinner/Spinner";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import { transformToCapitalize } from "../../../../shared/helpers/transformToCapitalize";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { getMessageConfigResponse } from "../../../../shared/utils/getMessageConfig";
import { handleApiError } from "../../../../shared/utils/handleApiError";
import { showToast } from "../../../../shared/utils/toast";
import { useStaff } from "../hooks/useStaff";
import { useStaffManagement } from "../hooks/useStaffManagement";
import { getStaffSchema } from "../schemas/StaffSchema";
import type { Staff, StaffResponse } from "../types/Staff";

export const UpsertStaffForm = () => {
  const location = useLocation();
  const selectedStaff = location.state?.staff as StaffResponse;
  const { shouldRedirect } = useStaffManagement();

  const { currentPage, searchQuery } = usePagination();
  const { handleCreateStaffMutation, handleUpdateStaffMutation, MAIN_ROUTE } = useStaff({
    currentPage,
    searchQuery,
  });

  const ROUTE_INITIAL = `${MAIN_ROUTE}?page=${currentPage}`;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<Staff>({
    resolver: zodResolver(getStaffSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  useEffect(() => {
    if (selectedStaff) {
      const { identityDocumentNumber, name, paternalSurname, maternalSurname, phone, email } =
        selectedStaff.person;
      setValue("identityDocumentNumber", identityDocumentNumber ?? "");
      setValue("name", name ?? "");
      setValue("paternalSurname", paternalSurname ?? "");
      setValue("maternalSurname", maternalSurname ?? "");
      setValue("phone", phone ?? "");
      setValue("email", email ?? "");
      setFocus("identityDocumentNumber");
    }
  }, [selectedStaff, setValue, setFocus]);

  //Validacion para redireccionar si digitan en la URL un ID pero no hay datos
  if (!selectedStaff && !shouldRedirect && !location.pathname.includes("add")) {
    showToast({
      title: "Selección de personal inválido",
      description: "Debes seleccionar un personal previamente",
      type: "error",
    });
    return <Navigate to={ROUTE_INITIAL} />;
  }

  const onReset = () => {
    reset();
    setFocus("identityDocumentNumber");
  };

  const onSubmit: SubmitHandler<Staff> = async (data) => {
    const { identityDocumentNumber, name, paternalSurname, maternalSurname, phone, email } = data;
    try {
      const upsertStaff = {
        identityDocumentNumber: identityDocumentNumber ?? "",
        name: transformToCapitalize(name ?? ""),
        paternalSurname: transformToCapitalize(paternalSurname ?? ""),
        maternalSurname: transformToCapitalize(maternalSurname ?? ""),
        phone: phone ?? "",
        email: email ?? "",
      };

      // Update
      if (selectedStaff) {
        const updateStaff = upsertStaff;
        await handleUpdateStaffMutation.mutateAsync({
          staff: updateStaff,
          staffId: selectedStaff.staffId,
        });

        const messageToast = getMessageConfigResponse("Personal");
        showToast({ ...messageToast.update });

        return;
      }

      // Create
      await handleCreateStaffMutation.mutateAsync({ staff: upsertStaff });
      const messageToast = getMessageConfigResponse("Personal");
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
            label="DNI"
            type="text"
            minLength={2}
            maxLength={100}
            ariaLabel="Documento nacional de identidad"
            placeholder="Ingrese su DNI"
            {...register("identityDocumentNumber")}
            error={errors.identityDocumentNumber?.message as string}
          />

          <TextInput
            label="Nombres"
            type="text"
            maxLength={25}
            ariaLabel="Nombres"
            placeholder="Ingrese sus nombres completos"
            {...register("name")}
            error={errors.name?.message as string}
          />

          <TextInput
            label="Número de Teléfono"
            type="text"
            maxLength={25}
            ariaLabel="N° de teléfono"
            placeholder="Ingrese su teléfono"
            {...register("phone")}
            error={errors.phone?.message as string}
          />
        </div>

        <div className="flex flex-col gap-5 mb-5 pr-8">
          <TextInput
            label="Apellido Paterno"
            type="text"
            maxLength={50}
            ariaLabel="Apellido Paterno"
            placeholder="Ingrese su Apellido Paterno"
            {...register("paternalSurname")}
            error={errors.paternalSurname?.message as string}
          />

          <TextInput
            label="Apellido Materno"
            type="text"
            maxLength={50}
            ariaLabel="Apellido Materno"
            placeholder="Ingrese su Apellido Materno"
            {...register("maternalSurname")}
            error={errors.maternalSurname?.message as string}
          />

          <TextInput
            label="Correo electrónico"
            type="text"
            maxLength={25}
            ariaLabel="Email"
            placeholder="Ingrese su correo"
            {...register("email")}
            error={errors.email?.message as string}
          />
        </div>

        <div className="user-buttons mt-5 flex gap-20 col-span-2 px-4">
          <Button
            title={selectedStaff ? "Actualizar" : "Guardar"}
            id="btnUpsertStaff"
            type="submit"
            classButton="btn-primary text-paragraph-medium"
            iconLeft={
              (
                selectedStaff
                  ? handleUpdateStaffMutation.isPending
                  : handleCreateStaffMutation.isPending
              ) ? (
                <Spinner className="mr-1" />
              ) : (
                <Icon.Save size={28} strokeWidth={1.2} />
              )
            }
            disabled={
              handleUpdateStaffMutation.isPending ||
              handleCreateStaffMutation.isPending ||
              Object.keys(errors).length > 0
            }
          >
            <span>{handleCreateStaffMutation.isPending ? "Guardando..." : "Guardar"}</span>
          </Button>

          <Button
            title="Limpiar registros"
            id="btnClearFieldsOfStaff"
            type="button"
            classButton="btn-primary text-paragraph-medium !bg-secondary-500 hover:!bg-secondary-600"
            iconLeft={<Icon.Clear size={28} strokeWidth={1.2} />}
            disabled={handleUpdateStaffMutation.isPending || handleCreateStaffMutation.isPending}
            onClick={onReset}
          >
            Limpiar campos
          </Button>
        </div>
      </form>
    </>
  );
};
