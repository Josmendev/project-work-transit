import { Button } from "../../../../shared/components/Button/Button";
import { Icon } from "../../../../shared/components/Icon";
import { LIMIT_PAGE } from "../../../../shared/utils/constants";
import type { User } from "../../../auth/types/User";

export interface TableUserItemProps {
  listOfUsers: Array<User>;
  currentPage: number;
  editRow?: (data: User) => void;
  deleteRow?: (data: User) => void;
}

export const TableUserItem: React.FC<TableUserItemProps> = ({
  listOfUsers,
  editRow,
  deleteRow,
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

  const textIsConfirm = (rowConfirm: boolean) =>
    rowConfirm ? textDataStatus("OK", stateClassSuccess) : textDataStatus("NO", stateClassDanger);

  const textIsActive = (rowActive: boolean) =>
    rowActive
      ? textDataStatus("Activo", stateClassSuccess + " w-[82px]")
      : textDataStatus("Inactivo", stateClassDanger + " w-[82px]");

  return (
    <>
      {listOfUsers.map((row, rowIndex) => (
        <tr key={row?.userId} className="border-b border-neutral-100 text-center">
          <td className="p-2">{startIndex + rowIndex + 1}</td>
          <td className="p-2">{row.username}</td>
          <td className="p-2">
            {row.person.name} {row.person.paternalSurname} {row.person.maternalSurname}
          </td>
          <td className="p-2">{row.role.join(", ")}</td>
          <td className="p-2">{textIsConfirm(row.isConfirm)}</td>
          <td className="p-2">{textIsActive(row.isActive)}</td>

          <td className="p-3 w-[180px] flex gap-1.5 items-center justify-center">
            {editRow && (
              <Button
                title="Editar"
                id={`btnEditRow-${row.userId}`}
                aria-data={row}
                classButton="transition-all duration-200 ease-in-out hover:text-warning-500"
                onClick={() => {
                  if (editRow) {
                    editRow(row);
                  }
                }}
              >
                <Icon.Edit className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            )}

            {deleteRow && (
              <Button
                title="Editar"
                id={`btnDeleteRow-${row.userId}`}
                aria-data={row}
                classButton="transition-all duration-200 ease-in-out hover:text-danger-500"
                onClick={() => {
                  if (deleteRow) deleteRow(row);
                }}
              >
                <Icon.Trash className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
