import type { User } from "./User";

// Defino los tipos de INPUT para el modulo de Auth
export type AuthUserLogin = {
  username: string;
  password: string;
};

export type AuthUserConfirm = {
  newPassword: string;
  repeatPassword: string;
};

export type TokenUserLogout = string;

// Defino el tipo de OUTPUT para el modulo de Auth
export type AuthUserResponse = User & { token: string };
