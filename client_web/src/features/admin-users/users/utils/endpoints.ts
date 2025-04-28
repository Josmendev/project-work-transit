import { BASE_BACKEND_URL } from "../../../../shared/utils/constants";

export const ENDPOINTS_USER = {
  LIST_OF_USERS: `${BASE_BACKEND_URL}/users`,
  EDIT_USER: `${BASE_BACKEND_URL}/users`,
  DELETE_USER: `${BASE_BACKEND_URL}/users`,
  SEARCH_USERS: `${BASE_BACKEND_URL}/users`,
  RESET_PASSWORD: `${BASE_BACKEND_URL}/users/reset-password`,
} as const;
