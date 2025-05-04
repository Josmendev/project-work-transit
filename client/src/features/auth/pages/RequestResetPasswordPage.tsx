import { AuthLayout } from "../../../shared/layouts/AuthLayout";
import { RequestResetPasswordForm } from "../components/RequestResetPasswordForm";

export const RequestResetPasswordPage = () => {
  return (
    <AuthLayout
      title="Restablecer contraseña"
      subtitle="Ingresa el correo electrónico con el que te registraste"
    >
      <RequestResetPasswordForm />
    </AuthLayout>
  );
};
