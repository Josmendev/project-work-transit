import type { AuthUserResponse } from "../../features/auth/types/authTypes";
import type { User } from "../../features/auth/types/User";

export const getUserInformation = (user: AuthUserResponse | User) => {
  const name = user?.person?.name || "Nombre no disponible";
  const paternalSurname = user?.person?.paternalSurname || "";
  const maternalSurname = user?.person?.maternalSurname || "";

  const userInformation = `${name} ${paternalSurname} ${maternalSurname}`;

  return {
    name,
    paternalSurname,
    maternalSurname,
    userInformation,
  };
};
