import { useEffect } from "react";
import { Button } from "../Button/Button";
import ClickOutside from "../ClickOutside";
import { Spinner } from "../Spinner/Spinner";

interface Props {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onClickSuccess?: () => void;
  isLoadingIcon?: boolean;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  onClickSuccess,
  isLoadingIcon,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <ClickOutside onClick={onClose}>
        <div className={`modal ${children && "modal-expand"}`}>
          <header className="modal-header relative">
            <h5 className="uppercase text-h5-semibold p-2">{title}</h5>
            <hr className="text-secondary-100" />
            {subtitle && <p className="text-paragraph-medium pt-5 pb-8">{subtitle}</p>}
          </header>
          {children && children}
          <div className="modal-content py-1 flex gap-4 mx-10">
            <Button
              title="Aceptar"
              classButton="btn-primary text-paragraph-medium"
              type="button"
              onClick={onClickSuccess}
              disabled={isLoadingIcon}
              iconLeft={isLoadingIcon && <Spinner className="mr-1" />}
            >
              {isLoadingIcon ? "Procesando..." : "ACEPTAR"}
            </Button>

            <Button
              title="Cancelar"
              classButton="btn-primary !bg-red-500 hover:!bg-red-600 text-paragraph-medium"
              type="button"
              onClick={onClose}
              disabled={isLoadingIcon}
            >
              CANCELAR
            </Button>
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
