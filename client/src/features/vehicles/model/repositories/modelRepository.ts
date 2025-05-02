import { ActivateModelService } from "../services/ActivateModelService";
import { CreateModelService } from "../services/CreateModelService";
import { DeleteModelService } from "../services/DeleteModelService";
import { ListModelService } from "../services/ListModelService";
import { SearchModelService } from "../services/SearchModelService";
import { UpdateModelService } from "../services/UpdateModelService";
import type { UpsertModel } from "../types/Model";

//Funcion para agregar
export const createModel = async ({ model }: { model: UpsertModel }) => {
  const newModel = await CreateModelService({ model });
  return newModel;
};

// Funcion para obtener y buscar
export const getModel = async ({
  limit,
  page,
  query = "",
}: {
  limit?: number;
  page: number;
  query?: string;
}) => {
  return query ? SearchModelService({ limit, page, query }) : ListModelService({ limit, page });
};

// Funcion para actualizar
export const updateModel = async ({ model, modelId }: { model: UpsertModel; modelId: number }) => {
  const updatedModel = await UpdateModelService({ model, modelId });
  return updatedModel;
};

// Funcion para eliminar
export const deleteModel = async ({ modelId }: { modelId: number }) => {
  await DeleteModelService({ modelId });
};

// Funcion para activar
export const activateModel = async ({ modelId }: { modelId: number }) => {
  await ActivateModelService({ modelId });
};
