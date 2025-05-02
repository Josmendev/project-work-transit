export interface Route {
  routeId: number;
  routeNumber: string;
  isActive?: boolean;
}

export type RouteResponse = Required<Route> & { origin: string; destination: string };
export type UpsertRoute = Pick<RouteResponse, "routeNumber" | "origin" | "destination">;

export type UpdateRouteSelected = {
  selectedRoute: RouteResponse | null;
  clearSelectedRoute: () => void;
};
