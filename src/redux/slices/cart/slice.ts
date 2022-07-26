import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { equals } from "../../../utils/equailzer";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { RootState } from "../../store";
import { CartItem, ICartSliceState, TMinus } from "./types";

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  items,
  totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      const findItem = state.items.find((item) => item.id === payload.id);
      if (findItem) {
        const { toppings } = findItem;
        if (equals(payload.toppings, toppings)) {
          findItem.count++;
        } else {
          state.items.push({
            ...payload,
            count: 1,
          });
        }
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem: (state, { payload }) => {
      const findItem = state.items.find((item) =>
        equals(item.toppings, payload.toppings)
      );
      findItem && console.log("found item");
      state.items = state.items.filter((item) => item !== findItem);

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    plusItem: (state, { payload }) => {
      const findItem = state.items.find(
        (item) =>
          item.id === payload.id &&
          item.toppings.length === payload.toppings.length
      );
      if (findItem) findItem.count++;
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItem: (state, { payload }: PayloadAction<TMinus>) => {
      const findItem = state.items.find(
        (item) =>
          item.id === payload.id &&
          item.toppings.length === payload.toppings.length
      );
      if (findItem && findItem.count === 1) return;
      if (findItem) findItem.count--;
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
  },
});

export const { addItem, removeItem, clearCart, minusItem, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
