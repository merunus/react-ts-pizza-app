import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { CartItem } from "../cart/types";
import { IPizzaSliceState, TFetchPizzasArgs } from "./types";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: TFetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<CartItem[]>(
      `https://62d2d71f81cb1ecafa66b0a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data as CartItem[];
  }
);

const initialState: IPizzaSliceState = {
  items: [],
  isLoading: true,
  modalItem: {},
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.items = payload;
    },
    setModalItem: (state, action) => {
      state.modalItem = { ...action.payload, totalPrice: 0 };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.isLoading = true;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
    });
  },
});

export const { setItems, setModalItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
