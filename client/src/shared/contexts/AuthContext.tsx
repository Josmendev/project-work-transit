import { createContext } from "react";

import type {
  AuthUserLogin,
  AuthUserNewPassword,
  AuthUserResponse,
} from "../../features/auth/types/Auth";
import type { User } from "../../features/auth/types/User";
import { initialStateAuthUser } from "../reducer/authStates";

// Creo el contexto para almacenar valores globales de autenticacion
export interface AuthContextProps {
  user: AuthUserResponse;
  loading: boolean;
  login: (credentials: AuthUserLogin) => Promise<AuthUserResponse>;
  confirmUser: (credentials: AuthUserNewPassword) => Promise<AuthUserResponse>;
  profileUser: (token: string) => Promise<AuthUserResponse>;
  logout: () => Promise<void>;
  updateUserInSession: (updatedUser: User) => void;
}

// Creo el contexto con los valores por defecto
export const AuthContext = createContext<AuthContextProps>({
  user: initialStateAuthUser,
  loading: false,
  login: async () => {
    throw new Error("EL LOGIN NO SE ENCUENTRA IMPLEMENTADO");
  },
  confirmUser: async () => {
    throw new Error("LA CONFIRMACION DE USUARIO NO SE ENCUENTRA IMPLEMENTADA");
  },
  profileUser: async () => {
    throw new Error("EL PROFILE NO SE ENCUENTRA IMPLEMENTADO");
  },
  logout: async () => {
    throw new Error("EL LOGOUT NO SE ENCUENTRA IMPLEMENTADO");
  },
  updateUserInSession: async () => {
    throw new Error("EL LOGOUT NO SE ENCUENTRA IMPLEMENTADO");
  },
});
