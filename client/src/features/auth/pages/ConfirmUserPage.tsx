import { AuthLayout } from "../../../shared/layouts/AuthLayout";
import { ConfirmUserForm } from "../components/ConfirmUserForm";

export const ConfirmUserPage = () => {
  return (
    <AuthLayout title="Confirmar usuario" subtitle="Ingresa los datos finales de confirmación">
      <ConfirmUserForm />
    </AuthLayout>
  );
};
