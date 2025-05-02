import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableModelItem } from "../components/TableModelItem";
import { UpsertModelForm } from "../components/UpsertModelForm";
import { useModel } from "../hooks/useModel";
import { useModelManagement } from "../hooks/useModelManagement";
import type { Model } from "../types/Model";

export const ModelListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditModel,
    handleStateModel,
    handleEditModelInRow,
    handleActivateModelInRow,
    handleDeleteModelInRow,
  } = useModelManagement();

  const { data, isLoading, isError, error } = useModel({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Model>();
  const headersTable = ["N°", "Modelo", "Marca", "Estado"];

  if (isLoading) return <Loader />;
  if (isError) return <b>Error: {error?.message || "Error desconocido"}</b>;

  return (
    <DefaultLayout>
      <SectionLayout
        title="Modelo"
        subtitle="Administración de vehículos"
        classNameForChildren="flex gap-4"
      >
        <Card headerCard="Registro" className="min-w-[460px] overflow-hidden !h-[310px]">
          <UpsertModelForm onEditModel={onEditModel} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchModel"
              name="txtSearchModel"
              placeholder="Buscar modelo"
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
            <TableModelItem
              listOfModels={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditModelInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateModel(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateModel(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditModel.clearSelectedModel();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteModelInRow(selectedItem);
              if (modalType === "activate") handleActivateModelInRow(selectedItem);
              onEditModel.clearSelectedModel();
            }
          }}
          entityName="Marca"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
