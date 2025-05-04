import { AuthLayout } from "../../../shared/layouts/AuthLayout";
import { ValidationPinForm } from "../components/ValidationPinForm";

export const ValidationPinPage = () => {
  return (
    <AuthLayout
      title="Verificación por PIN"
      subtitle="Hemos enviado un PIN de verificación a tu correo electrónico"
    >
      <ValidationPinForm />
    </AuthLayout>
  );
};
