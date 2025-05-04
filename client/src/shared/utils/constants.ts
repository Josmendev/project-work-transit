export const BASE_BACKEND_URL = "http://localhost:3000/api/v1";

export const BASE_ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    CONFIRM_ACCOUNT: "confirm-account",
    REQUEST_RESET_PASSWORD: "request-reset-password",
    VALIDATION_PIN: "validation-pin",
    CHANGE_PASSWORD: "change-password",
    HOME: "/",
  },
  PRIVATE: {
    DASHBOARD: "dashboard",
    ADMIN: "admin",
    VEHICLES: "vehicles",
    PATHS: "paths",
    TRIPS: "trips",
  },
};

export const CRUD_ROUTES = {
  LIST: "list",
  ADD: "add",
  DETAIL: ":id",
  EDIT: ":id/edit",
};

// Asiginacion del router en los modulos
export const ADMIN_USERS_ROUTES = {
  USERS: "users",
  ROLES: "roles",
  STAFF: "staff",
};

export const VEHICLES_ROUTES = {
  BRAND: "brand",
  MODEL: "model",
  VEHICLE: "vehicle",
};

export const ADMIN_ROUTE_ROUTES = {
  ROUTE: "route",
  CONNECTION_POINTS: "connection-points",
  ZONE: "zone",
  STOP: "stop",
};

export const TRIPS_ROUTES = {
  TRIP: "trip",
};

// Defino el estado inicial para todos los listados de tablas
export const initialListOfResponseAPI = {
  data: [],
  limit: 5,
  page: 1,
  total: 1,
  totalPages: 1,
};

export const INITIAL_PAGE = 1;
export const LIMIT_PAGE = 5;

// Defino un mapa de roles
export const ROLES_MAPPING: Record<string, number> = {
  Administrador: 1,
  Pasajero: 2,
  Chofer: 3,
} as const;

// Defino un tipo con las claves (Administrador, Chofer, Pasajero) y tipo con valores con 1,2 y 3
export type ROLES_KEYS = keyof typeof ROLES_MAPPING;
export type ROLES_VALUES = (typeof ROLES_MAPPING)[ROLES_KEYS];
