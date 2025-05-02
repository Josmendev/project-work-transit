import type { AuthUserResponse } from "../../features/auth/types/authTypes";
import { AUTH_TYPES } from "./authTypes";

// Defino el action con payload (only: type, payload)
interface ActionWithPayload<Type, Payload> {
  type: Type;
  payload: Payload;
}

// Defino el action sin payload (only: type)
interface ActionWithoutPayload<Type> {
  type: Type;
}

// Definir AuthAction usando las interfaces genéricas
export type AuthAction =
  | ActionWithPayload<typeof AUTH_TYPES.login, AuthUserResponse>
  | ActionWithPayload<typeof AUTH_TYPES.confirmUser, AuthUserResponse>
  | ActionWithPayload<typeof AUTH_TYPES.profile, AuthUserResponse>
  | ActionWithoutPayload<typeof AUTH_TYPES.logout>;
