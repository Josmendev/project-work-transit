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
import { TableVehicleItem } from "../components/TableVehicleItem";
import { useVehicle } from "../hooks/useVehicle";
import { useVehicleManagement } from "../hooks/useVehicleManagement";
import type { VehicleResponse } from "../types/Vehicle";

export const VehicleListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    handleDeleteVehicleInRow,
    handleUpdateVehicleInRow,
    handleActivateVehicleInRow,
    handleCreateVehicle,
  } = useVehicleManagement();

  const { data, isLoading, isError, error } = useVehicle({
    currentPage,
    searchQuery,
  });
  const { modalType, selectedItem, openModal, closeModal } = useModalManager<VehicleResponse>();
  const headersTable = ["N° de placa", "Marca", "Modelo", "Aforo", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout title="Vehículo" subtitle="Administración de vehículos">
        <Card
          headerCard="Listado"
          headerRightContentCard={
            <Button
              id="btnEditVehicle"
              title="Nuevo"
              classButton="btn-primary !w-auto text-paragraph-regular py-2"
              type="button"
              iconLeft={<Icon.Plus />}
              onClick={handleCreateVehicle}
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
            id="txtSearchVehicle"
            name="txtSearchVehicle"
            placeholder="Buscar Vehículo"
            onSearch={handleSearch}
          />

          <Table headersTable={headersTable} response={data}>
            <TableVehicleItem
              listOfVehicles={data?.data ?? []}
              currentPage={currentPage}
              editRow={(data: VehicleResponse) => handleUpdateVehicleInRow(data)}
              deleteRow={(data: VehicleResponse) => openModal("delete", data)}
              activateRow={(data: VehicleResponse) => openModal("activate", data)}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={closeModal}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteVehicleInRow(selectedItem);
              if (modalType === "activate") handleActivateVehicleInRow(selectedItem);
            }
          }}
          entityName="Vehículo"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
