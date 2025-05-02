export interface Stop {
  stopId: number;
  direction: string;
  zoneId: number;
  isActive?: boolean;
}

export type StopResponse = Required<Stop>;
export type UpsertStop = Pick<StopResponse, "direction"> & { zone: string; stopId?: number };

export type UpdateStopSelected = {
  selectedStop: UpsertStop | null;
  clearSelectedStop: () => void;
};
