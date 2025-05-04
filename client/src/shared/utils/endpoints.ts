import { BASE_BACKEND_URL } from "./constants";

export const ENDPOINTS_AUTH = {
  LOGIN: `${BASE_BACKEND_URL}/auth/login`,
  CONFIRM_ACCOUNT: `${BASE_BACKEND_URL}/auth/confirm-account`,
  PROFILE: `${BASE_BACKEND_URL}/auth/user-profile`,
  REQUEST_RESET_PASSWORD: `${BASE_BACKEND_URL}/auth/request-password-reset`,
  VALIDATION_PIN: `${BASE_BACKEND_URL}/auth/validation-pin`,
  CHANGE_PASSWORD: `${BASE_BACKEND_URL}/auth/change-password`,
  LOGOUT: `${BASE_BACKEND_URL}/auth/logout`,
} as const;
