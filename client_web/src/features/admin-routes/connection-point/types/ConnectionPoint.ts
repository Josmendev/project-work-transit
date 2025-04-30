export interface ConnectionPoint {
  connectionPointId: number;
  description: string;
  isActive?: boolean;
}

export type ConnectionPointResponse = Required<ConnectionPoint>;
export type UpsertConnectionPoint = Pick<ConnectionPoint, "description">;

export type UpdateConnectionPointSelected = {
  selectedConnectionPoint: ConnectionPoint | null;
  clearSelectedConnectionPoint: () => void;
};
