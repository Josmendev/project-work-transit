import { Card } from "../../../../shared/components/Card/Card";
import { GenericModal } from "../../../../shared/components/GenericModal";
import Loader from "../../../../shared/components/Loader";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { Search } from "../../../../shared/components/Search";
import { Table } from "../../../../shared/components/Table/Table";
import { useModalManager } from "../../../../shared/hooks/useModalManager";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { TableBrandItem } from "../components/TableBrandItem";
import { UpsertBrandForm } from "../components/UpsertBrandForm";
import { useBrand } from "../hooks/useBrand";
import { useBrandManagement } from "../hooks/useBrandManagement";
import type { Brand } from "../types/Brand";

export const BrandListPage = () => {
  const {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    onEditBrand,
    handleStateBrand,
    handleEditBrandInRow,
    handleActivateBrandInRow,
    handleDeleteBrandInRow,
  } = useBrandManagement();

  const { data, isLoading, isError, error } = useBrand({
    currentPage,
    searchQuery,
  });

  const { modalType, openModal, closeModal, selectedItem } = useModalManager<Brand>();
  const headersTable = ["N°", "Marca", "Estado"];

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
          <UpsertBrandForm onEditBrand={onEditBrand} />
        </Card>

        <Card
          headerCard="Listado"
          className="flex-auto items-center"
          headerRightContentCard={
            <Search
              id="txtSearchBrand"
              name="txtSearchBrand"
              placeholder="Buscar marca"
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
            <TableBrandItem
              listOfBrands={data?.data ?? []}
              currentPage={currentPage}
              editRow={handleEditBrandInRow}
              deleteRow={(data) => {
                openModal("delete", data);
                handleStateBrand(data);
              }}
              activateRow={(data) => {
                openModal("activate", data);
                handleStateBrand(data);
              }}
            />
          </Table>
        </Card>

        <GenericModal
          modalType={modalType}
          onClose={() => {
            onEditBrand.clearSelectedBrand();
            closeModal();
          }}
          onConfirm={() => {
            if (selectedItem) {
              if (modalType === "delete") handleDeleteBrandInRow(selectedItem);
              if (modalType === "activate") handleActivateBrandInRow(selectedItem);
              onEditBrand.clearSelectedBrand();
            }
          }}
          entityName="Marca"
        />
      </SectionLayout>
    </DefaultLayout>
  );
};
