import { z } from "zod";
import { BrandSchema, ModelSchema } from "../../../../shared/schemas/commonSchemas";

const LicensePlateNumberSchema = z
  .string()
  .nonempty("La placa del vehículo no puede ser un campo vacío")
  .regex(/^\d+$/, "La placa del vehículo solo debe contener números")
  .length(7, "La placa del vehículo debe ser menor o igual a 7 dígitos");

export const CapacitySchema = z
  .number({
    required_error: "El aforo es requerido",
    invalid_type_error: "El aforo debe ser un número entero",
  })
  .gte(1, "El aforo debe tener como mínimo 1 asiento")
  .lte(150, "El aforo debe tener como máximo 150 asientos");

export const getVehicleSchema = () =>
  z.object({
    licensePlateNumber: LicensePlateNumberSchema,
    model: ModelSchema,
    brand: BrandSchema,
    capacity: CapacitySchema,
  });
