import { configureStore } from "@reduxjs/toolkit";
import preferenceSlice from "../features/preference/preferenceSlice";
import contentSlice from "../features/content/contentSlice";
import selectedSlice from "../features/selected/selectedSlice";

const store = configureStore({
  reducer: {
    preference: preferenceSlice,
    content: contentSlice,
    selected: selectedSlice,
  },
});

export default store;
