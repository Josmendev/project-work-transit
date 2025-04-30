import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableRouteItem } from "../components/TableRouteItem";
import { UpsertRouteForm } from "../components/UpsertRouteForm";
import { useRoute } from "../hooks/useRoute";
import { useRouteManagement } from "../hooks/useRouteManagement";
import type { Route } from "../types/Route";

export const RouteListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditRoute,
    handleStateRoute,
    handleEditRouteInRow,
    handleActivateRouteInRow,
    handleDeleteRouteInRow,
  } = useRouteManagement();

  const { data, isLoading, isError, error } = useRoute({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Route>();
  const headersTable = ["N°", "N° de ruta", "Origen", "Destino", "Estado"];

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
          <UpsertRouteForm onEditRoute={onEditRoute} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchRoute"
              name="txtSearchRoute"
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
            <TableRouteItem
              listOfRoutes={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditRouteInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateRoute(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateRoute(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditRoute.clearSelectedRoute();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteRouteInRow(selectedItem);
              if (modalType === "activate") handleActivateRouteInRow(selectedItem);
              onEditRoute.clearSelectedRoute();
            }
          }}
          entityName="Ruta"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
