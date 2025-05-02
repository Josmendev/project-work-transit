export interface Staff {
  staffId: number;
  identityDocumentNumber: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  telephone: string;
  email: string;
  isActive: boolean;
}

export type StaffResponse = Staff;
export type CreateStaff = Pick<
  Staff,
  "identityDocumentNumber" | "name" | "paternalSurname" | "maternalSurname" | "telephone" | "email"
>;
export type UpdateStaff = CreateStaff;

export interface StaffResponseConditional {
  DNI: string;
  staffId: number;
  isStaffInactive?: boolean;
}
