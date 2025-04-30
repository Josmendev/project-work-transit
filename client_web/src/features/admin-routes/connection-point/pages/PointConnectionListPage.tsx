import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableConnectionPointItem } from "../components/TablePointConnectionItem";
import { UpsertConnectionPointForm } from "../components/UpsertConnectionPointForm";
import { useConnectionPoint } from "../hooks/useConnectionPoint";
import { useConnectionPointManagement } from "../hooks/useConnectionPointManagement";
import type { ConnectionPoint } from "../types/ConnectionPoint";

export const PointConnectionListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditConnectionPoint,
    handleStateConnectionPoint,
    handleEditConnectionPointInRow,
    handleActivateConnectionPointInRow,
    handleDeleteConnectionPointInRow,
  } = useConnectionPointManagement();

  const { data, isLoading, isError, error } = useConnectionPoint({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<ConnectionPoint>();
  const headersTable = ["N°", "Punto de conexión", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout
        title="Puntos de Conexión"
        subtitle="Administración de puntos de conexión"
        classNameForChildren="flex gap-4"
      >
        <Card headerCard="Registro" className="min-w-[460px] overflow-hidden !h-[310px]">
          <UpsertConnectionPointForm onEditConnectionPoint={onEditConnectionPoint} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchConnectionPoint"
              name="txtSearchConnectionPoint"
              placeholder="Buscar dirección"
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
            <TableConnectionPointItem
              listOfConnectionPoints={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditConnectionPointInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateConnectionPoint(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateConnectionPoint(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditConnectionPoint.clearSelectedConnectionPoint();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteConnectionPointInRow(selectedItem);
              if (modalType === "activate") handleActivateConnectionPointInRow(selectedItem);
              onEditConnectionPoint.clearSelectedConnectionPoint();
            }
          }}
          entityName="Punto de conexión"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
