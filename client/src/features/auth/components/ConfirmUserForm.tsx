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
import { ConfirmUserSchema } from "../schemas/ConfirmUserSchema";
import type { AuthUserConfirm } from "../types/authTypes";

export const ConfirmUserForm = () => {
  const navigate = useNavigate();
  const { loading, user, confirmUser, profileUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserConfirm>({
    resolver: zodResolver(ConfirmUserSchema),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit: SubmitHandler<AuthUserConfirm> = async (data) => {
    const response = await confirmUser(data);

    if (response?.token) {
      await profileUser(response?.token);
      navigate("/" + BASE_ROUTES.PRIVATE.DASHBOARD, { replace: true });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form className="container-inputs flex flex-col gap-5">
        <TextInput
          label="Nombre de usuario"
          type="text"
          readOnly
          maxLength={8}
          value={user?.username || "00000000"}
          iconRight={<Icon.User size={28} strokeWidth={1} />}
          aria-label="Campo para ingresar el nombre de usuario"
        />
        <TextInput
          label="Nueva Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="Ingresa tu nueva contraseña"
          classIconRight="icon-input-password"
          tabIndex={1}
          maxLength={50}
          required
          autoFocus
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
          aria-label="Campo para ingresar la nueva contraseña"
          {...register("newPassword")}
          error={errors.newPassword?.message as string}
        />

        <TextInput
          label="Repetir Contraseña"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Repite tu contraseña"
          classIconRight="icon-input-password"
          tabIndex={2}
          maxLength={50}
          required
          iconRight={
            <Button
              onClick={handleShowConfirmPassword}
              title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              classButton="align-middle"
              iconRight={
                showConfirmPassword ? (
                  <Icon.HiddenPassword size={28} strokeWidth={1} />
                ) : (
                  <Icon.View size={28} strokeWidth={1} />
                )
              }
            />
          }
          aria-label="Campo para repetir tu contrasena nuevamente"
          {...register("repeatPassword")}
          error={errors.repeatPassword?.message as string}
        />
      </form>

      <Button
        name="btnConfirmUser"
        id="btnConfirmUser"
        title="Confirmar cuenta"
        type="submit"
        tabIndex={3}
        classButton="btn-primary mt-7"
        iconRight={
          <Icon.Check
            size={24}
            className="transition duration-300 ease-in-out group-hover:translate-x-2"
          />
        }
        onClick={handleSubmit(onSubmit)}
      >
        <span>Confirmar cuenta</span>
      </Button>
    </>
  );
};
