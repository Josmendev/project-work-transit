import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableRoleItem } from "../components/TableRoleItem";
import { UpsertRoleForm } from "../components/UpsertRoleForm";
import { useRoleManagement } from "../hooks/useRoleManagement";
import { useRoles } from "../hooks/useRoles";
import type { Role } from "../types/Role";

export const RoleListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditRole,
    handleStateRole,
    handleEditRoleInRow,
    handleActivateRoleInRow,
    handleDeleteRoleInRow,
  } = useRoleManagement();

  const { data, isLoading, isError, error } = useRoles({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Role>();
  const headersTable = ["N°", "Rol", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout
        title="Roles"
        subtitle="Administración de usuarios"
        classNameForChildren="flex gap-4"
      >
        <Card headerCard="Registro" className="min-w-[460px] overflow-hidden !h-[310px]">
          <UpsertRoleForm onEditRole={onEditRole} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchRole"
              name="txtSearchRole"
              placeholder="Buscar rol"
              className="!mt-0 !mb-0"
              onSearch={handleSearch}
            />
          }
          footerCard={
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages ?? 1}
              onPageChange={handlePageChange}
              className="-mt-12"
            />
          }
        >
          <Table headersTable={headersTable} response={data}>
            <TableRoleItem
              listOfRoles={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditRoleInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateRole(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateRole(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditRole.clearSelectedRole();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteRoleInRow(selectedItem);
              if (modalType === "activate") handleActivateRoleInRow(selectedItem);
              onEditRole.clearSelectedRole();
            }
          }}
          entityName="Rol"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
