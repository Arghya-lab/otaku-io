import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {
    id: 12,
    name: "Delicate",
    type: "light",
    primaryColor: "#e9e4f0",
    secondaryColor: "#3f3d56",
    bgImg: "linear-gradient(to top, #d3cce3, #e9e4f0)",
  },
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;
