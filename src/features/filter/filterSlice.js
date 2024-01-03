import { createSlice } from "@reduxjs/toolkit";
import {
  formatList,
  genreList,
  sortList,
  statusList,
} from "../../searchFilter";

const initialState = {
  selected: {
    format: formatList[0],
    genres: genreList[0],
    sort: sortList[0],
    status: statusList[0],
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      const { type, data } = action.payload;
      state.selected = { ...state.selected, [type]: data };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
