import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableZoneItem } from "../components/TableZoneItem";
import { UpsertZoneForm } from "../components/UpsertZoneForm";
import { useZone } from "../hooks/useZone";
import { useZoneManagement } from "../hooks/useZoneManagement";
import type { Zone } from "../types/Zone";

export const ZoneListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditZone,
    handleStateZone,
    handleEditZoneInRow,
    handleActivateZoneInRow,
    handleDeleteZoneInRow,
  } = useZoneManagement();

  const { data, isLoading, isError, error } = useZone({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Zone>();
  const headersTable = ["N°", "Zona", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout
        title="Zona"
        subtitle="Administración de zonas"
        classNameForChildren="flex gap-4"
      >
        <Card headerCard="Registro" className="min-w-[460px] overflow-hidden !h-[310px]">
          <UpsertZoneForm onEditZone={onEditZone} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchZone"
              name="txtSearchZone"
              placeholder="Buscar zona"
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
            <TableZoneItem
              listOfZones={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditZoneInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateZone(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateZone(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditZone.clearSelectedZone();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteZoneInRow(selectedItem);
              if (modalType === "activate") handleActivateZoneInRow(selectedItem);
              onEditZone.clearSelectedZone();
            }
          }}
          entityName="Zona"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
