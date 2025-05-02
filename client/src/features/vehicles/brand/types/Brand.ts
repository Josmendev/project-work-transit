export interface Brand {
  brandId: number;
  description: string;
  isActive?: boolean;
}

export type BrandResponse = Brand;
export type UpsertBrand = Pick<Brand, "description">;

export type UpdateBrandSelected = {
  selectedBrand: Brand | null;
  clearSelectedBrand: () => void;
};
