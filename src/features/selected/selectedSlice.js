import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  miniMeta: {},
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setMiniMeta: (state, action) => {
      state.miniMeta = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMiniMeta } = selectedSlice.actions;

export default selectedSlice.reducer;
