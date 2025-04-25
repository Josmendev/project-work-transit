import { getTokenExpirationTime } from "./getTokenExpirationTime";

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) return true;

    const now = Date.now() + 2000;
    return expirationTime <= now;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};
