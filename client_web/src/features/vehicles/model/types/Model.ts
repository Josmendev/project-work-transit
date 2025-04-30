export interface Model {
  modelId: number;
  description: string;
  brandId: number;
  isActive?: boolean;
}

export type ModelResponse = Model;
export type UpsertModel = Pick<Model, "description">;

export type UpdateModelSelected = {
  selectedModel: Model | null;
  clearSelectedModel: () => void;
};
