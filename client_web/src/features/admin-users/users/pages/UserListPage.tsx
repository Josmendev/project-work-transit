import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import { usePagination } from "../../../../shared/hooks/usePagination";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import type { User } from "../../../auth/types/User";
import { TableUserItem } from "../components/TableUserItem";
import { useUserManagement } from "../hooks/useUserManagement";
import { useUsers } from "../hooks/useUsers";

export const UserListPage = () => {
  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { data, isLoading, isError, error } = useUsers({ currentPage, searchQuery });
  const { onEditRowSelected, handleDeleteUserInRow } = useUserManagement();
  const headersTable = ["N°", "Trabajador", "Usuario", "Rol", "Confirmado", "Estado"];
  const { modalType, selectedItem, openModal, closeModal } = useModalManager<User>();

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout title="Usuarios" subtitle="Administración de usuarios">
        <Card
          headerCard="Listado"
          footerCard={
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          }
        >
          <Search
            id="txtSearchUser"
            name="txtSearchUser"
            placeholder="Buscar usuario"
            onSearch={handleSearch}
          />

          {
            <Table headersTable={headersTable} response={data}>
              <TableUserItem
                listOfUsers={data?.data ?? []}
                currentPage={currentPage}
                editRow={onEditRowSelected}
                deleteRow={(data: User) => openModal("delete", data)}
              />
            </Table>
          }
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={closeModal}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteUserInRow(selectedItem);
            }
          }}
          entityName="Usuario"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
