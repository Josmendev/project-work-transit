import type { Staff } from "../../admin-users/staff/types/Staff";
import type { User } from "./User";

/* Request */
export type AuthUserLogin = {
  username: string;
  password: string;
};

export type AuthUserNewPassword = {
  newPassword: string;
  repeatPassword: string;
};

export type AuthUserEmail = {
  email: string;
};

/* Response */
type UserBase = Pick<User, "userId" | "username" | "isConfirm" | "roles">;
type StaffBase = Pick<
  Staff,
  "identityDocumentNumber" | "name" | "maternalSurname" | "paternalSurname" | "isActive"
>;

export type AuthTokenResponse = { token: string };
export type AuthUserResponse = UserBase & StaffBase & AuthTokenResponse;

export type TokenUserLogout = string;
