import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "auto",
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = preferenceSlice.actions;

export default preferenceSlice.reducer;
