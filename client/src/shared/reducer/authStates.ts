import type { AuthUserResponse } from "../../features/auth/types/authTypes";

// Creo el estado inicial del reducer
export const initialStateAuthUser: AuthUserResponse = {
  userId: 0,
  username: "",
  token: "",
  isConfirm: false,
  isActive: false,
  person: {
    personId: 0,
    identityDocumentNumber: "",
    name: "",
    paternalSurname: "",
    maternalSurname: "",
  },
  role: [],
};
