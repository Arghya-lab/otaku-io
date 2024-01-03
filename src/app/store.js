import { configureStore } from "@reduxjs/toolkit";
import preferenceSlice from "../features/preference/preferenceSlice";
import contentSlice from "../features/content/contentSlice";
import filterSlice from "../features/filter/filterSlice";
import selectedSlice from "../features/selected/selectedSlice";

const store = configureStore({
  reducer: {
    preference: preferenceSlice,
    content: contentSlice,
    filter: filterSlice,
    selected: selectedSlice,
  },
});

export default store;
