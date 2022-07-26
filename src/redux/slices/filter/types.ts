export type SortType = {
  name: string;
  sort: string | "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

export interface IFilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: SortType;
}
