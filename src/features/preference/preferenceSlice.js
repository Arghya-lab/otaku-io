import { createSlice } from "@reduxjs/toolkit";
import { themeTypes } from "../../themes";

const initialState = {
  isEnabledDub: true,
  theme: themeTypes[22],
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;
