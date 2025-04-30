export interface Zone {
  zoneId: number;
  description: string;
  isActive?: boolean;
}

export type ZoneResponse = Required<Zone>;
export type UpsertZone = Pick<Zone, "description">;

export type UpdateZoneSelected = {
  selectedZone: Zone | null;
  clearSelectedZone: () => void;
};
