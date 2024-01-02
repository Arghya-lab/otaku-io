import { configureStore } from "@reduxjs/toolkit";
import preferenceSlice from "../features/preference/preferenceSlice";

const store = configureStore({
  reducer: {
    preference: preferenceSlice,
  },
});

export default store;
