import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../shared/components/Button/Button";
import { Icon } from "../../../shared/components/Icon";
import { TextInput } from "../../../shared/components/TextInput/TextInput";
import { NewPasswordUserSchema } from "../schemas/NewPasswordUserSchema";
import type { AuthUserNewPassword } from "../types/Auth";

export const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserNewPassword>({
    resolver: zodResolver(NewPasswordUserSchema),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit: SubmitHandler<AuthUserNewPassword> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <form className="container">
        <div className="flex flex-col gap-4">
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
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirma tu contraseña"
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
        </div>

        <Button
          name="btnChangePasswordOfUser"
          id="btnChangePasswordOfUser"
          title="Confirmar contraseña del usuario"
          type="submit"
          tabIndex={3}
          classButton="btn-primary mt-8"
          iconRight={
            <Icon.SuccessFill
              size={24}
              className="transition duration-300 ease-in-out group-hover:translate-x-2"
            />
          }
          onClick={handleSubmit(onSubmit)}
        >
          <span>Aplicar cambios</span>
        </Button>
      </form>
    </>
  );
};
