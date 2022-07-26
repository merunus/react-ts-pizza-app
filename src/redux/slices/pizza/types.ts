export type TFetchPizzasArgs = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export type PizzaItemsType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
  types: number[];
  sizes: number[];
};

export type ModalItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  rating: number;
  types: string[];
  sizes: number[];
};

export interface IPizzaSliceState {
  items: PizzaItemsType[];
  isLoading: boolean;
  modalItem: any;
}
