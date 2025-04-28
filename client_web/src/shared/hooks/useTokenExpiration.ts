import { useEffect, useRef } from "react";
import { checkTokenExpiration } from "../utils/authCheckToken";
import { getTokenExpirationTime } from "../utils/getTokenExpirationTime";

const useTokenExpiration = (token: string | null, onExpire: () => Promise<void>): void => {
  const timerRef = useRef<number | null>(null);
  const hasLoggedOut = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    hasLoggedOut.current = false;
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const handleExpiration = async () => {
      if (hasLoggedOut.current) return;

      const isExpired = checkTokenExpiration(token);

      if (isExpired) {
        hasLoggedOut.current = true;
        clearTimer();
        await onExpire();
      }
    };

    const setExpirationTimer = () => {
      clearTimer();
      const expirationTime = getTokenExpirationTime(token);

      if (!expirationTime) {
        handleExpiration();
        return;
      }

      const now = Date.now();
      const timeLeft = expirationTime - (now + 2000);

      if (timeLeft <= 0) handleExpiration();
      else timerRef.current = setTimeout(() => handleExpiration(), timeLeft);
    };

    setExpirationTimer();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") handleExpiration();
    };

    const handleFocus = () => handleExpiration();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [token, onExpire]);

  return;
};

export default useTokenExpiration;
