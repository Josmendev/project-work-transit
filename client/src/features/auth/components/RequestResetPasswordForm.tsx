import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../shared/components/Button/Button";
import { Icon } from "../../../shared/components/Icon";
import { TextInput } from "../../../shared/components/TextInput/TextInput";
import { getMessageConfigResponse } from "../../../shared/utils/getMessageConfig";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { showToast } from "../../../shared/utils/toast";
import { getRequestResetPasswordSchema } from "../schemas/RequestResetPasswordSchema";
import { RequestPasswordResetUserService } from "../services/RequestPasswordResetService";
import type { AuthUserEmail } from "../types/Auth";

export const RequestResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserEmail>({
    resolver: zodResolver(getRequestResetPasswordSchema()),
    mode: "onChange", // Valido cuando el usuario escribe
  });

  const onSubmit: SubmitHandler<AuthUserEmail> = async (data) => {
    try {
      await RequestPasswordResetUserService({ email: data });
      const messageToast = getMessageConfigResponse();
      showToast({ ...messageToast.requestResetPassword, permanent: true });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      <form className="container-inputs flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Correo electrónico"
          type="text"
          placeholder="Ingresa tu correo electrónico"
          required
          autoFocus
          tabIndex={1}
          iconRight={<Icon.SuccessFill size={28} strokeWidth={1} />}
          aria-label="Campo para ingresar el correo electrónico del usuario"
          {...register("email")}
          error={errors.email?.message as string}
        />

        <Button
          name="btnRequestResetPassword"
          title="Enviar"
          type="submit"
          tabIndex={3}
          classButton="btn-primary mt-6"
          iconRight={<Icon.ArrowRight size={28} />}
          onClick={handleSubmit(onSubmit)}
        >
          <span>Enviar solicitud</span>
        </Button>
      </form>
    </>
  );
};
