import { useMemo } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon";

interface Props {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<Props> = ({
  totalPages = 1,
  currentPage = 1,
  onPageChange = () => {},
  className = "",
}) => {
  const MAX_TOTALPAGES = 6;
  const MAX_VIEW_PAGES = 3;
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;
  const classPageActive = "bg-primary-600 text-white text-paragraph-medium";
  const classPageDisabled = "cursor-not-allowed bg-transparent hover:bg-transparent";

  const currentPagination = useMemo(() => {
    // Si el total de páginas es menor o igual a MAX_TOTALPAGES, se muestran todas las páginas
    if (totalPages <= MAX_TOTALPAGES) return Array.from({ length: totalPages }, (_, i) => i + 1);

    // Si la página actual está dentro del rango inicial, se muestran las primeras páginas y el último
    if (currentPage <= MAX_VIEW_PAGES) {
      return [...Array.from({ length: MAX_VIEW_PAGES }, (_, i) => i + 1), "ellipsis-1", totalPages];
    }

    // Si la página actual está cerca del final, se muestra el inicio y las últimas páginas
    if (currentPage >= totalPages - (MAX_VIEW_PAGES - 1)) {
      return [
        1,
        "ellipsis-2",
        ...Array.from({ length: MAX_VIEW_PAGES }, (_, i) => totalPages - (MAX_VIEW_PAGES - 1) + i),
      ];
    }

    // En caso contrario, se muestra el inicio, la página actual con sus alrededores y el final
    return [
      1,
      "ellipsis-3",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-4",
      totalPages,
    ];
  }, [totalPages, currentPage]);

  return (
    <div className={`flex items-center justify-between bg-shades-light px-6 pb-4 ${className}`}>
      <p>
        Mostrando {currentPage} de {totalPages} páginas
      </p>

      <nav className="flex items-center gap-2">
        {/* Botón Anterior */}
        <Button
          title="Anterior"
          id="btnPagination-prev"
          aria-label="Página anterior"
          classButton={`${isFirstPage ? classPageDisabled : "cursor-pointer"}`}
          onClick={() => !isFirstPage && onPageChange?.(currentPage - 1)}
          disabled={isFirstPage}
        >
          <Icon.Chevron
            className="text-shades-dark rotate-90 hover:stroke-black hover:scale-x-110"
            size={24}
          />
        </Button>

        {/* Números de Página */}
        <div className="flex gap-2 items-center justify-center">
          {currentPagination.map((page) => (
            <Button
              key={typeof page === "number" ? page : page + "-key"}
              title={typeof page === "number" ? `Página ${page}` : "..."}
              classButton={`text-shades-dark text-paragraph-medium cursor-pointer rounded-lg min-w-[36px] py-2 text-center ${
                page === currentPage ? classPageActive : ""
              }`}
              onClick={() => typeof page === "number" && onPageChange?.(page)}
              disabled={typeof page !== "number"}
            >
              {typeof page === "number" ? page : "..."}
            </Button>
          ))}
        </div>

        {/* Botón Siguiente */}
        <Button
          title="Siguiente"
          id="btnPagination-next"
          aria-label="Página siguiente"
          classButton={`${isLastPage ? classPageDisabled : "cursor-pointer"}`}
          onClick={() => !isLastPage && onPageChange?.(currentPage + 1)}
          disabled={isLastPage}
        >
          <Icon.Chevron
            className="text-shades-dark transform -rotate-90 hover:stroke-black hover:scale-x-110"
            size={24}
          />
        </Button>
      </nav>
    </div>
  );
};
