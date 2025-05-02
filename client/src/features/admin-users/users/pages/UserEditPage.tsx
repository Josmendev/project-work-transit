import { Navigate, useNavigate } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import { Card } from "../../../../shared/components/Card/Card";
import { Checkbox } from "../../../../shared/components/Checkbox/Checkbox";
import { Icon } from "../../../../shared/components/Icon";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { showToast } from "../../../../shared/utils/toast";
import { useUserManagement } from "../hooks/useUserManagement";

//📌 => Orden convencional para estructura de componentes
export const UserEditPage = () => {
  const {
    selectedUser,
    roles,
    currentPage,
    handleUpdateUser,
    handleChangeRole,
    shouldRedirect,
    MAIN_ROUTE,
  } = useUserManagement();

  const navigate = useNavigate();
  const ROUTE_INITIAL = `${MAIN_ROUTE}?page=${currentPage}`;

  if (!selectedUser || !roles) {
    showToast({
      title: "Selección de usuario inválido",
      description: "Debes seleccionar un usuario previamente",
      type: "error",
    });
    return <Navigate to={ROUTE_INITIAL} />;
  }
  if (shouldRedirect) return <Navigate to={ROUTE_INITIAL} />;

  const onSaveUser = (e: React.FormEvent) => {
    const responseUpdated = handleUpdateUser(e);
    if (responseUpdated) navigate(ROUTE_INITIAL, { replace: true });
  };

  // 📌 Retorno de JSX
  return (
    <DefaultLayout>
      <SectionLayout title="Usuarios" subtitle="Administración de usuarios">
        <Card
          headerCard="Registro"
          headerRightContentCard={
            <Button
              id="btnBack-editUser"
              title="Regresar"
              classButton="btn-primary !w-auto text-paragraph-regular py-2"
              type="button"
              iconLeft={<Icon.Back size={28} strokeWidth={1.2} />}
              onClick={() => navigate(ROUTE_INITIAL)}
            >
              Regresar
            </Button>
          }
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-28">
            <div className="flex flex-col gap-5 mb-5">
              <TextInput
                label="Personal / Trabajador"
                type="text"
                readOnly
                value={selectedUser.staff}
                minLength={2}
                maxLength={100}
                ariaLabel="Nombres completos"
              />

              <TextInput
                label="Username"
                type="text"
                readOnly
                value={selectedUser.username}
                minLength={8}
                maxLength={8}
                ariaLabel="Documento nacional de identidad"
              />
            </div>

            <div className="roles-container text-left text-shades-dark">
              <p className="mb-2.5">Roles</p>
              <div className="roles-list flex flex-col gap-1.5">
                <Checkbox
                  id="role-1"
                  labelText="Administrador"
                  checked={roles.includes("Administrador")}
                  onChange={() => handleChangeRole("Administrador")}
                />
                <Checkbox
                  id="role-2"
                  labelText="Pasajero"
                  checked={roles.includes("Pasajero")}
                  onChange={() => handleChangeRole("Pasajero")}
                />
                <Checkbox
                  id="role-3"
                  labelText="Chofer"
                  checked={roles.includes("Chofer")}
                  onChange={() => handleChangeRole("Chofer")}
                />
              </div>
            </div>

            <div className="user-buttons mt-5 flex col-span-1">
              <Button
                title="Guardar"
                id="btnSaveUser"
                type="submit"
                classButton="btn-primary text-paragraph-medium"
                iconLeft={<Icon.Save size={28} strokeWidth={1.2} />}
                onClick={onSaveUser}
              >
                Guardar
              </Button>
            </div>
          </form>
        </Card>
      </SectionLayout>
    </DefaultLayout>
  );
};
