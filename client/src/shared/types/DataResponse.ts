export interface DataResponseFromAPI<T> {
  data: Array<T>;
  total?: number;
  limit?: number;
  page: number;
  totalPages: number;
}
