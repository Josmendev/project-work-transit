import type { ErrorResponse } from "../types/ErrorResponse";

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number" &&
    "message" in error &&
    (typeof error.message === "string" || Array.isArray(error.message))
  );
}
