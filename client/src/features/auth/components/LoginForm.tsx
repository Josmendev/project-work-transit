import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/Button/Button";
import { Icon } from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { TextInput } from "../../../shared/components/TextInput/TextInput";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { BASE_ROUTES } from "../../../shared/utils/constants";
import { getMessageConfigResponse } from "../../../shared/utils/getMessageConfig";
import { showToast } from "../../../shared/utils/toast";
import { getLoginSchema } from "../schemas/LoginSchema";
import type { AuthUserLogin } from "../types/authTypes";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, login, user } = useContext(AuthContext);
  const { profileUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserLogin>({
    resolver: zodResolver(getLoginSchema(user?.isConfirm ?? false)),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<AuthUserLogin> = async (data) => {
    const userData = await login(data);
    const { token, isConfirm } = userData;

    if (!isConfirm) {
      const messageToast = getMessageConfigResponse("Usuario");
      showToast({ ...messageToast.confirmAccount });

      navigate("/" + BASE_ROUTES.PUBLIC.CONFIRM_ACCOUNT);
      return;
    }

    if (token && token.length > 0 && isConfirm) {
      const messageToast = getMessageConfigResponse("Usuario");
      showToast({ ...messageToast.userInSession });

      navigate("/" + BASE_ROUTES.PRIVATE.DASHBOARD);
      await profileUser(token);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form className="container-inputs flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nombre de usuario"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          required
          autoFocus
          maxLength={8}
          tabIndex={1}
          inputMode="numeric" // En phone, se activa modo numerico
          iconRight={<Icon.User size={28} strokeWidth={1} />}
          aria-label="Campo para ingresar el nombre de usuario"
          {...register("username")}
          error={errors.username?.message as string}
        />
        <TextInput
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="Ingresa tu contraseña"
          required
          tabIndex={2}
          classIconRight="icon-input-password"
          iconRight={
            <Button
              onClick={handleShowPassword}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              classButton="align-middle"
              iconRight={
                showPassword ? (
                  <Icon.HiddenPassword size={28} strokeWidth={1} />
                ) : (
                  <Icon.View size={28} strokeWidth={1} />
                )
              }
            />
          }
          aria-label="Campo para ingresar la contraseña"
          {...register("password")}
          error={errors.password?.message as string}
        />

        <Button
          name="btnSignIn"
          title="Iniciar sesión"
          type="submit"
          tabIndex={3}
          classButton="btn-primary mt-4"
          iconRight={<Icon.ArrowRight size={28} />}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <span>Iniciar sesión</span>
        </Button>
      </form>
    </>
  );
};
