import { AuthLayout } from "../../../shared/layouts/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <AuthLayout title="Bienvenido" subtitle="Ingresa tus credenciales para iniciar sesión">
      <LoginForm />
    </AuthLayout>
  );
};
