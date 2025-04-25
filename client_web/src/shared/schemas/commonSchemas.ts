import { z } from "zod";

export const UsernameSchema = z
  .string()
  .nonempty("El username (DNI) no puede ser un campo vacío")
  .regex(/^\d+$/, "El username (DNI) solo debe contener números") // Solo números
  .length(8, "El username (DNI) debe tener exactamente 8 dígitos"); // Longitud exacta de 8

export const PasswordSchema = z
  .string()
  .nonempty("La contraseña no puede ser un campo vacío")
  .min(6, "La contraseña debe tener al menos 6 caracteres") // Longitud mínima de 6
  .max(16, "La contraseña debe tener como máximo 16 caracteres"); // Longitud máxima de 16

export const SecurePasswordSchema = PasswordSchema.regex(
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
  "La contraseña debe tener al menos una mayúscula y un número"
);

export const DNISchema = z
  .string()
  .nonempty("El DNI no puede ser un campo vacío")
  .regex(/^\d+$/, "El DNI solo debe contener números")
  .length(8, "El DNI debe tener exactamente 8 dígitos");

export const FullNameSchema = z
  .string()
  .nonempty("Los nombres no pueden ser un campo vacío")
  .min(2, "Los nombres debe tener al menos 2 caracteres") // Longitud mínima de 2
  .max(50, "El nombre debe tener como máximo 50 caracteres"); // Longitud máxima de 50

export const AgeSchema = z
  .number({
    required_error: "La edad es un campo requerido",
    invalid_type_error: "La edad debe ser un campo numérico",
  })
  .int()
  .min(0, { message: "La edad mínima permitida es 0 ('0' para bebés menores a 1 año)" })
  .max(120, { message: "La edad máxima permitida es 120" });

export const LastNameSchema = (label: string) =>
  z
    .string()
    .nonempty({ message: `El ${label} no puede ser un campo vacío` })
    .min(2, { message: `El ${label} debe tener al menos 2 caracteres` })
    .max(30, { message: `El ${label} debe tener como máximo 30 caracteres` });

export const PhoneSchema = z
  .string()
  .regex(/^\d+$/, "El teléfono solo debe contener números")
  .length(9, "El teléfono debe tener exactamente 9 dígitos")
  .optional();

export const EmailSchema = z
  .string()
  .nonempty("El correo no puede ser un campo vacío")
  .email("El correo electrónico no es válido");
