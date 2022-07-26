import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/slices/filter/slice";
import cartReducer from "../redux/slices/cart/slice";
import pizzaReducer from "../redux/slices/pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
