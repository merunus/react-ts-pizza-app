import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IFilterSliceState, SortType } from "./types";

const initialState: IFilterSliceState = {
  searchValue: "",
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "Popularity",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, { payload }: PayloadAction<number>) => {
      state.categoryId = payload;
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    setSort: (state, { payload }: PayloadAction<SortType>) => {
      state.sort = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setFilters(state, { payload }) {
      state.sort = payload.sortProperty;
      state.currentPage = Number(payload.currentPage);
      state.categoryId = Number(payload.categoryId);
    },
  },
});


export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
