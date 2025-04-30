import { Card } from "../../../../shared/components/Card/Card";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { usePagination } from "../../../../shared/hooks/usePagination";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableUserItem } from "../components/TableUserItem";
import { useUserManagement } from "../hooks/useUserManagement";
import { useUsers } from "../hooks/useUsers";

export const UserListPage = () => {
  const { currentPage, searchQuery, handlePageChange, handleSearch } = usePagination();
  const { data, isLoading, isError, error } = useUsers({ currentPage, searchQuery });
  const { onEditRowSelected } = useUserManagement();

  const headersTable = ["N°", "Trabajador", "Usuario", "Rol(es)", "Confirmado", "Estado"];

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
              />
            </Table>
          }
        </Card>
      </SectionLayout>
    </DefaultLayout>
  );
};
