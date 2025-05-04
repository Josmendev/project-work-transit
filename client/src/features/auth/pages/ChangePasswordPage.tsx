import { AuthLayout } from "../../../shared/layouts/AuthLayout";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export const ChangePasswordPage = () => {
  return (
    <AuthLayout
      title="Cambiar contraseña"
      subtitle="Ahora ingresa una nueva contraseña para tu cuenta"
    >
      <ChangePasswordForm />
    </AuthLayout>
  );
};
