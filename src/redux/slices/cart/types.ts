export type CartItem = {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  type: string;
  size: number;
  count: number;
  toppings: object[];
};

export type TMinus = {
  id: string;
  toppings: object[];
};

export interface ICartSliceState {
  totalPrice: number;
  items: CartItem[];
}
