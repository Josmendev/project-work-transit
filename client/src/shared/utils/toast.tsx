import { toast } from "sonner";
import { Icon } from "../components/Icon";

const TOAST_ICONS = {
  SUCCESS: <Icon.SuccessFill size={32} />,
  ERROR: <Icon.ErrorFill size={32} />,
  WARNING: <Icon.WarningFill size={32} />,
  INFO: <Icon.InfoFill size={32} />,
};

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  title: string;
  description: string | Array<string> | undefined;
  type: ToastType;
  duration?: number;
  permanent?: boolean;
}

export const showToast = ({ title, description, type, duration, permanent }: ToastProps): void => {
  toast[type](title, {
    id: `toast-${type}`,
    description,
    icon: TOAST_ICONS[type.toUpperCase() as keyof typeof TOAST_ICONS],
    duration: permanent ? Infinity : duration ?? 6500,
    className: `font-[Montserrat Variable] toaster-${type}`,
    action: permanent
      ? {
          label: "Aceptar",
          onClick: () => toast.dismiss(`toast-${type}`),
        }
      : undefined,
  });
};
