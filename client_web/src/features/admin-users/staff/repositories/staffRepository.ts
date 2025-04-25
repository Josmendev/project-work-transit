import { ActivateStaffService } from "../services/ActivateStaffService";
import { AssignStaffService } from "../services/AssignStaffService";
import { CreateStaffService } from "../services/CreateStaffService";
import { DeleteStaffService } from "../services/DeleteStaffService";
import { ListStaffsService } from "../services/ListStaffsService";
import { SearchStaffsService } from "../services/SearchStaffsService";
import { UpdateStaffService } from "../services/UpdateStaffService";
import type { Staff, StaffAssignRequest } from "../types/Staff";

//Funcion para agregar staff
export const createStaff = async ({ staff }: { staff: Staff }) => {
  const response = await CreateStaffService({ staff });
  return response;
};

// Funcion para obtener y buscar staffs
export const getStaffs = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchStaffsService({ limit, page, query }) : ListStaffsService({ limit, page });
};

// Funcion para actualizar un staff
export const updateStaff = async ({ staff, staffId }: { staff: Staff; staffId: number }) => {
  const updatedStaff = await UpdateStaffService({ staff, staffId });
  return updatedStaff;
};

// Funcion para eliminar un staff
export const deleteStaff = async ({ staffId }: { staffId: number }) => {
  await DeleteStaffService({ staffId });
};

// Funcion para activar un staff
export const activateStaff = async ({ staffId }: { staffId: number }) => {
  await ActivateStaffService({ staffId });
};

// Funcion para asignar un staff
export const assignStaff = async ({ staff }: { staff: StaffAssignRequest }) => {
  await AssignStaffService({ staff });
};
