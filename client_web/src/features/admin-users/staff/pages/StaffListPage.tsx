import { Button } from "../../../../shared/components/Button/Button";
import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import { Icon } from "../../../../shared/components/Icon";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableStaffItem } from "../components/TableStaffItem";
import { useStaff } from "../hooks/useStaff";
import { useStaffManagement } from "../hooks/useStaffManagement";
import type { StaffResponse } from "../types/Staff";

export const StaffListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    handleDeleteStaffInRow,
    handleUpdateStaffInRow,
    handleActivateStaffInRow,
    handleCreateStaff,
  } = useStaffManagement();

  const { data, isLoading, isError, error } = useStaff({
    currentPage,
    searchQuery,
  });
  const { modalType, selectedItem, openModal, closeModal } = useModalManager<StaffResponse>();
  const headersTable = ["N°", "DNI", "Nombres", "Apellidos", "Teléfono", "Correo", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout title="Personal" subtitle="Administración de usuarios">
        <Card
          headerCard="Listado"
          headerRightContentCard={
            <Button
              id="btnEditStaff"
              title="Nuevo"
              classButton="btn-primary !w-auto text-paragraph-regular py-2"
              type="button"
              iconLeft={<Icon.Plus />}
              onClick={handleCreateStaff}
            >
              Nuevo
            </Button>
          }
          footerCard={
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          }
        >
          <Search
            id="txtSearchStaff"
            name="txtSearchStaff"
            placeholder="Buscar Personal"
            onSearch={handleSearch}
          />

          <Table headersTable={headersTable} response={data}>
            <TableStaffItem
              listOfStaff={data?.data ?? []}
              currentPage={currentPage}
              editRow={(data: StaffResponse) => handleUpdateStaffInRow(data)}
              deleteRow={(data: StaffResponse) => openModal("delete", data)}
              activateRow={(data: StaffResponse) => openModal("activate", data)}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={closeModal}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteStaffInRow(selectedItem);
              if (modalType === "activate") handleActivateStaffInRow(selectedItem);
            }
          }}
          entityName="Personal"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
