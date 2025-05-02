export interface Vehicle {
  vehicleId: number;
  licensePlateNumber: string;
  modelId: number;
  capacity: number;
  isActive?: boolean;
}

export type UpsertVehicle = Pick<Vehicle, "licensePlateNumber" | "capacity" | "isActive"> & {
  vehicleId?: number;
  brand: string;
  model: string;
};

export type VehicleResponse = UpsertVehicle;
