import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  isEnabledDub: true,
  theme: {
    id: 23,
    name: "Twilight Horizon",
    type: "dark",
    primaryColor: "#141e30",
    secondaryColor: "#ff6f61",
    bgImg: "linear-gradient(to right, #141e30, #243b55)",
  },
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
