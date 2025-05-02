import { useReducer, useState } from "react";
import { ConfirmUserService } from "../../features/auth/services/ConfirmUserService";
import { LoginService } from "../../features/auth/services/LoginService";
import { LogoutService } from "../../features/auth/services/LogoutService";
import { ProfileUserService } from "../../features/auth/services/ProfileUserService";
import type {
  AuthUserConfirm,
  AuthUserLogin,
  AuthUserResponse,
} from "../../features/auth/types/authTypes";
import type { User } from "../../features/auth/types/User";
import { AuthContext } from "../contexts/AuthContext";
import useTokenExpiration from "../hooks/useTokenExpiration";
import { authReducer } from "../reducer/authReducer";
import { initialStateAuthUser } from "../reducer/authStates";
import { AUTH_TYPES } from "../reducer/authTypes";
import { checkTokenExpiration } from "../utils/authCheckToken";
import { handleApiError } from "../utils/handleApiError";
import { showToast } from "../utils/toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

const init = () => {
  const userFromSessionStorage = sessionStorage.getItem("user");
  const parsedUser = userFromSessionStorage ? JSON.parse(userFromSessionStorage) : {};
  if (parsedUser.token) {
    parsedUser.isActive = true;
    parsedUser.isConfirm = true;
  }

  return {
    ...initialStateAuthUser,
    ...parsedUser,
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStateUser, dispatch] = useReducer(authReducer, initialStateAuthUser, init);
  const [loading, setLoading] = useState(false);

  // Gestiono el estado con el reducer (Consumo del servicio)
  const login = async (credentials: AuthUserLogin): Promise<AuthUserResponse> => {
    try {
      setLoading(true);
      const responseUser = await LoginService(credentials);
      const { token } = responseUser;

      dispatch({ type: AUTH_TYPES.login, payload: { ...responseUser, token } });
      sessionStorage.setItem("user", JSON.stringify(responseUser));
      return responseUser;
    } finally {
      setLoading(false);
    }
  };

  const confirmUser = async (credentials: AuthUserConfirm): Promise<AuthUserResponse> => {
    try {
      setLoading(true);
      const { userId } = authStateUser;
      if (!userId) throw new Error("User ID is missing");
      const responseUser = await ConfirmUserService(credentials, userId);

      const { token } = responseUser;
      if (!token) throw new Error("No token received after confirmation");

      const responsePrevUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      const responseUserUpdated = { ...responsePrevUser, ...responseUser, token };
      sessionStorage.setItem("user", JSON.stringify(responseUserUpdated));

      dispatch({ type: AUTH_TYPES.confirmUser, payload: responseUserUpdated });
      return responseUserUpdated;
    } catch (error) {
      handleApiError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const profileUser = async (token: string): Promise<AuthUserResponse> => {
    try {
      setLoading(true);

      const responseUser = await ProfileUserService(token);
      const responsePrevUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      const responseUserUpdated = { ...responsePrevUser, ...responseUser };
      sessionStorage.setItem("user", JSON.stringify(responseUserUpdated));

      dispatch({ type: AUTH_TYPES.profile, payload: responseUserUpdated });
      return responseUserUpdated;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!authStateUser?.token) {
        sessionStorage.removeItem("user");
        dispatch({ type: AUTH_TYPES.logout });
        return;
      }

      // Verifico si el token ya expiró
      const isExpired = checkTokenExpiration(authStateUser?.token);

      if (isExpired) {
        sessionStorage.removeItem("user");
        dispatch({ type: AUTH_TYPES.logout });
        return;
      }

      // Si el token sigue válido, hacemos logout en la API
      await LogoutService(authStateUser?.token);
      sessionStorage.removeItem("user");
      dispatch({ type: AUTH_TYPES.logout });
    } catch (error) {
      handleApiError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInSession = (updatedUser: User) => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

    // Solo actualizar si el usuario en sesión, es el mismo que se edita
    if (storedUser?.userId === updatedUser.userId) {
      const updatedSessionUser = { ...storedUser, ...updatedUser };
      sessionStorage.setItem("user", JSON.stringify(updatedSessionUser));
      dispatch({ type: AUTH_TYPES.profile, payload: updatedSessionUser });
    }
  };

  //Verifico la expiración del token
  useTokenExpiration(authStateUser?.token, async () => {
    if (!authStateUser?.token) return;
    await logout();

    showToast({
      title: "Sesión cerrada",
      description: "Su token de sesión ha expirado. Vuelve a iniciar sesión",
      type: "warning",
      permanent: true,
    });
  });

  return (
    <AuthContext.Provider
      value={{
        user: authStateUser,
        loading,
        login,
        logout,
        profileUser,
        confirmUser,
        updateUserInSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
