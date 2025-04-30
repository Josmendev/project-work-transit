import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import { LIMIT_PAGE } from "../../../../shared/utils/constants";
import type { Brand, BrandResponse } from "../types/Brand";

export interface TableBrandItemProps {
  listOfBrands: Array<BrandResponse>;
  editRow?: (data: Brand) => void;
  deleteRow?: (data: Brand) => void;
  activateRow?: (data: Brand) => void;
  currentPage: number;
}

export const TableBrandItem: React.FC<TableBrandItemProps> = ({
  listOfBrands,
  editRow,
  deleteRow,
  activateRow,
  currentPage,
}) => {
  const stateDefault = "text-paragraph-medium inline-block w-12 py-1 rounded-lg";
  const stateClassSuccess = `text-success-700 bg-success-50 ${stateDefault}`;
  const stateClassDanger = `text-error-700 bg-error-50 ${stateDefault}`;
  const rowsPerPage = LIMIT_PAGE; // Límite de registros por página
  const startIndex = (currentPage - 1) * rowsPerPage; // Índice de inicio según la página

  const textDataStatus = (textContent: string, stateClass: string) => (
    <span className={stateClass}>{textContent}</span>
  );

  const textIsActive = (rowActive?: boolean) =>
    rowActive
      ? textDataStatus("Activo", stateClassSuccess + " w-[82px]")
      : textDataStatus("Inactivo", stateClassDanger + " w-[82px]");

  return (
    <>
      {listOfBrands.map((row, rowIndex) => (
        <tr key={row?.brandId} className="border-b border-neutral-100 text-center">
          <td className="p-2">{startIndex + rowIndex + 1}</td>
          <td className="p-2">{row?.description}</td>
          <td className="p-2">{textIsActive(row?.isActive)}</td>
          <td className="p-3 w-[180px] flex gap-1.5 items-center justify-center">
            {editRow && (
              <Button
                title="Editar"
                id={`btnEditRow-${row?.brandId}`}
                aria-data={row}
                classButton="transition-all duration-200 ease-in-out hover:text-warning-500"
                onClick={() => editRow(row)}
              >
                <Icon.Edit className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            )}

            {row.isActive && deleteRow && (
              <Button
                title="Eliminar"
                id={`btnDeleteRow-${row?.brandId}`}
                aria-data={row}
                classButton="transition-all duration-200 ease-in-out hover:text-red-600"
                onClick={() => deleteRow(row)}
              >
                <Icon.Trash className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            )}

            {!row.isActive && activateRow && (
              <Button
                title="Activar"
                id={`btnactivateRow-${row?.brandId}`}
                aria-data={row}
                classButton="transition-all duration-200 ease-in-out hover:text-success-500"
                onClick={() => activateRow(row)}
              >
                <Icon.Active className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
