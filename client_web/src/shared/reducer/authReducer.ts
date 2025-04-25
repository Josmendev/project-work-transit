import { AuthAction } from "./authActions";
import { initialStateAuthUser } from "./authStates";
import { AUTH_TYPES } from "./authTypes";

export const authReducer = (state = initialStateAuthUser, action: AuthAction) => {
  // Segun el tipo, actulizo las propiedades del estado (state)=> username, password, token, ...
  // Segun el action, defino el type y payload que se enviara al reducer (AuthResponseUser | ErrorResponse)
  switch (action.type) {
    case AUTH_TYPES.login:
    case AUTH_TYPES.confirmUser:
      return {
        ...state,
        ...action.payload,
        isActive: true,
      };

    case AUTH_TYPES.profile:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_TYPES.logout:
      return { ...initialStateAuthUser };

    default:
      return state;
  }
};
