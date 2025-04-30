import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableStopItem } from "../components/TableStopItem";
import { UpsertStopForm } from "../components/UpsertStopForm";
import { useStop } from "../hooks/useStop";
import { useStopManagement } from "../hooks/useStopManagement";
import type { Stop } from "../types/Stop";

export const StopListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditStop,
    handleStateStop,
    handleEditStopInRow,
    handleActivateStopInRow,
    handleDeleteStopInRow,
  } = useStopManagement();

  const { data, isLoading, isError, error } = useStop({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Stop>();
  const headersTable = ["N°", "Dirección", "Zona", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout
        title="Marca"
        subtitle="Administración de vehículos"
        classNameForChildren="flex gap-4"
      >
        <Card headerCard="Registro" className="min-w-[460px] overflow-hidden !h-[310px]">
          <UpsertStopForm onEditStop={onEditStop} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchStop"
              name="txtSearchStop"
              placeholder="Buscar ruta"
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
            <TableStopItem
              listOfStops={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditStopInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateStop(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateStop(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditStop.clearSelectedStop();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteStopInRow(selectedItem);
              if (modalType === "activate") handleActivateStopInRow(selectedItem);
              onEditStop.clearSelectedStop();
            }
          }}
          entityName="Ruta"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
