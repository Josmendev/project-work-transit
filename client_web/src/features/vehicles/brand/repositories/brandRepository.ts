import { ActivateBrandService } from "../services/ActivateBrandService";
import { CreateBrandService } from "../services/CreateBrandService";
import { DeleteBrandService } from "../services/DeleteBrandService";
import { ListBrandService } from "../services/ListBrandService";
import { SearchBrandService } from "../services/SearchBrandService";
import { UpdateBrandService } from "../services/UpdateBrandService";
import type { UpsertBrand } from "../types/Brand";

//Funcion para agregar
export const createBrand = async ({ brand }: { brand: UpsertBrand }) => {
  const newBrand = await CreateBrandService({ brand });
  return newBrand;
};

// Funcion para obtener y buscar
export const getBrand = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchBrandService({ limit, page, query }) : ListBrandService({ limit, page });
};

// Funcion para actualizar
export const updateBrand = async ({ brand, brandId }: { brand: UpsertBrand; brandId: number }) => {
  const updatedBrand = await UpdateBrandService({ brand, brandId });
  return updatedBrand;
};

// Funcion para eliminar
export const deleteBrand = async ({ brandId }: { brandId: number }) => {
  await DeleteBrandService({ brandId });
};

// Funcion para activar
export const activateBrand = async ({ brandId }: { brandId: number }) => {
  await ActivateBrandService({ brandId });
};
