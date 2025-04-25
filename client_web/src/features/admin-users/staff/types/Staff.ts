import type { Person } from "../../../../shared/types/Person";

//Types of Request
export type Staff = Omit<Person, "personId">;
export type StaffAssignRequest = Pick<Person, "identityDocumentNumber">;

//Types of Response
export interface StaffResponse {
  staffId: number;
  isActive: boolean;
  person: Person;
}
