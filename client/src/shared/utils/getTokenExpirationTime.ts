import { jwtDecode } from "jwt-decode";

export const getTokenExpirationTime = (token: string): number | null => {
  try {
    if (!token) return null;

    const decoded = jwtDecode<{ exp: number }>(token);
    const decodedExpirationInMilliseconds = decoded?.exp * 1000;
    return decodedExpirationInMilliseconds;
  } catch (error) {
    console.error("Error obteniendo el tiempo de expiración del token:", error);
    return null;
  }
};
