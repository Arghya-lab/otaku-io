import { configureStore } from "@reduxjs/toolkit";
import preferenceSlice from "../features/preference/preferenceSlice";
import contentSlice from "../features/content/contextSlice";

const store = configureStore({
  reducer: {
    preference: preferenceSlice,
    content: contentSlice,
  },
});

export default store;
