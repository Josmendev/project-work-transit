import type { DataCollectionType } from "../../types/DataCollectionType";
import type { DataResponseFromAPI } from "../../types/DataResponse";

type GroupHeaderType = {
  title: string;
  colSpan: number;
};

interface Props {
  headersTable: Array<string>;
  response: DataResponseFromAPI<DataCollectionType> | Array<DataCollectionType>;
  children: React.ReactNode;
  hasButtonActions?: boolean;
  groupHeadersTable?: Array<GroupHeaderType>;
}

export const Table: React.FC<Props> = ({
  headersTable,
  response,
  hasButtonActions = true,
  children,
  groupHeadersTable,
}) => {
  const hasData = Array.isArray(response) ? response.length > 0 : response?.data?.length > 0;
  const isValidGroupHeader = groupHeadersTable && groupHeadersTable.length > 0;

  if (!hasData)
    return (
      <div className="text-paragraph-semibold pt-32">
        No hay datos para mostrar{" "}
        {groupHeadersTable && "o no buscó por el campo correcto (solo código de certificado)"}
      </div>
    );

  return (
    <div className="overflow-x-auto bg-shades-light">
      <table className="w-full">
        <thead className="text-center bg-neutral-50">
          {isValidGroupHeader && (
            <tr className="border-b border-neutral-100">
              {groupHeadersTable.map((groupHead, index) => (
                <th
                  key={index}
                  colSpan={groupHead.colSpan || 1}
                  className={`p-4 text-paragraph-bold ${
                    isValidGroupHeader &&
                    groupHeadersTable.length > 1 &&
                    index === 0 &&
                    "border-r border-neutral-200"
                  }`}
                >
                  {groupHead.title}
                </th>
              ))}
            </tr>
          )}

          <tr className="border-b border-neutral-100">
            {headersTable.map((header, index) => (
              <th key={index} className="p-4 text-paragraph-semibold">
                {header}
              </th>
            ))}
            {hasButtonActions && (
              <th className="p-4 text-paragraph-semibold w-[150px]">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
