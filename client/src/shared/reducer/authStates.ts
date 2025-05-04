import type { AuthUserResponse } from "../../features/auth/types/Auth";

// Creo el estado inicial del reducer
export const initialStateAuthUser: AuthUserResponse = {
  userId: 0,
  username: "",
  token: "",
  isConfirm: false,
  isActive: false,
  identityDocumentNumber: "",
  name: "",
  maternalSurname: "",
  paternalSurname: "",
  roles: [],
};
